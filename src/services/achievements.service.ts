import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapBadge, mapMedal, unwrap } from "@/api/mappers";
import type { ApiBadge, ApiEnvelope, ApiMedal } from "@/api/dtos";
import { api } from "@/lib/api";
import { mockBadges, mockMedals } from "@/mocks/achievements.mock";
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

const apiAchievementsService = {
  getAchievements: async (): Promise<AchievementsSummary> => {
    const [badges, medals] = await Promise.all([
      api.get<ApiEnvelope<ApiBadge[]>>(endpoints.profile.badges),
      api.get<ApiEnvelope<ApiMedal[]>>(endpoints.profile.medals),
    ]);
    return {
      badges: unwrap(badges.data).map(mapBadge),
      medals: unwrap(medals.data).map(mapMedal),
    };
  },
};

export const achievementsService = USE_MOCKS
  ? mockAchievementsService
  : apiAchievementsService;
