import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapBadge, mapMedal, mapRanking } from "@/api/mappers";
import type { ApiAchievementSummary, ApiBadge, ApiGroup, ApiRanking, ApiRankingUser } from "@/api/dtos";
import { AppError } from "@/api/errors";
import { apiGet } from "@/lib/api";
import { mockBadges, mockMedals } from "@/mocks/achievements.mock";
import { getCurrentUserId } from "@/services/session.service";
import type { Badge, Medal } from "@/types/achievements";

export type AchievementsSummary = {
  badges: Badge[];
  medals: Medal[];
};

const mockAchievementsService = {
  getAchievements: async (): Promise<AchievementsSummary> => ({
    badges: mockBadges,
    medals: mockMedals,
  }),
};

async function getRankingMedalsFallback(userId: string): Promise<Medal[]> {
  const groups = await apiGet<ApiGroup[]>(endpoints.groups.user(userId));
  const rankings = await Promise.all(
    groups.map(async (group) => {
      const ranking = await apiGet<ApiRanking | ApiRankingUser[]>(endpoints.groups.ranking(group.group_id ?? group.id ?? ""));
      return mapRanking(ranking, userId);
    }),
  );

  return rankings.flatMap((ranking) => {
    const currentUser = ranking.entries.find((entry) => entry.userId === userId);
    return currentUser?.medals ?? [];
  });
}

const apiAchievementsService = {
  getAchievements: async (userId?: string): Promise<AchievementsSummary> => {
    const safeUserId = userId ?? (await getCurrentUserId());
    try {
      const achievements = await apiGet<ApiAchievementSummary>(
        endpoints.achievements.user(safeUserId),
      );
      return {
        badges: (achievements.badges ?? []).map(mapBadge),
        medals: (achievements.ranking_medals ?? []).map(mapMedal),
      };
    } catch (error) {
      if (error instanceof AppError && error.status !== 404) {
        throw error;
      }

      const [badges, medals] = await Promise.all([
        apiGet<ApiBadge[]>(endpoints.badges.user(safeUserId)),
        getRankingMedalsFallback(safeUserId),
      ]);

      return {
        badges: badges.map(mapBadge),
        medals,
      };
    }
  },
};

export const achievementsService = USE_MOCKS ? mockAchievementsService : apiAchievementsService;
