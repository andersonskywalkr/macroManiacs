import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapRanking, unwrap } from "@/api/mappers";
import type { ApiEnvelope, ApiRanking } from "@/api/dtos";
import { api } from "@/lib/api";
import { mockRanking } from "@/mocks/ranking.mock";
import type { Ranking } from "@/types/ranking";

const mockRankingService = {
  getRanking: async (): Promise<Ranking> => mockRanking,
};

const apiRankingService = {
  getRanking: async (groupId = "current"): Promise<Ranking> => {
    const response = await api.get<ApiEnvelope<ApiRanking>>(endpoints.groups.ranking(groupId));
    return mapRanking(unwrap(response.data));
  },
};

export const rankingService = USE_MOCKS
  ? mockRankingService
  : apiRankingService;
