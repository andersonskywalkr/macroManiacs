import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapRanking } from "@/api/mappers";
import type { ApiRanking, ApiRankingUser } from "@/api/dtos";
import { apiGet } from "@/lib/api";
import { mockRanking } from "@/mocks/ranking.mock";
import { groupService } from "@/services/group.service";
import { getCurrentUserId } from "@/services/session.service";
import type { Ranking } from "@/types/ranking";

const mockRankingService = {
  getRanking: async (): Promise<Ranking> => mockRanking,
};

const apiRankingService = {
  getRanking: async (groupId?: string): Promise<Ranking> => {
    const [userId, currentGroup] = await Promise.all([
      getCurrentUserId(),
      groupId ? Promise.resolve(null) : groupService.getCurrentGroup().catch(() => null),
    ]);
    const safeGroupId = groupId ?? currentGroup?.id ?? "";
    const response = await apiGet<ApiRanking | ApiRankingUser[]>(
      endpoints.groups.ranking(safeGroupId),
    );
    const ranking = mapRanking(response, userId);
    return { ...ranking, groupId: ranking.groupId || safeGroupId };
  },
};

export const rankingService = USE_MOCKS ? mockRankingService : apiRankingService;
