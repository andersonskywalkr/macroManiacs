import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapChallenge, mapChallengeProgress } from "@/api/mappers";
import type { ApiChallenge, ApiChallengeProgress } from "@/api/dtos";
import { apiGet, apiPatch, apiPost } from "@/lib/api";
import { mockChallenges } from "@/mocks/challenge.mock";
import { getCurrentUserId } from "@/services/session.service";
import type {
  Challenge,
  ChallengeProgress,
  CreateChallengePayload,
} from "@/types/challenge";

function withQuery(url: string, params: Record<string, string | number | undefined>) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.set(key, String(value));
    }
  });
  const query = searchParams.toString();
  return query ? `${url}?${query}` : url;
}

const mockChallengeService = {
  getGroupChallenges: async (groupId: string): Promise<Challenge[]> =>
    mockChallenges.filter((challenge) => challenge.groupId === groupId),
  getMyChallenges: async (): Promise<Challenge[]> =>
    mockChallenges.filter((challenge) => !challenge.completed),
  getCompletedChallenges: async (): Promise<Challenge[]> =>
    mockChallenges.filter((challenge) => challenge.completed),
  getChallenge: async (challengeId: string): Promise<Challenge> =>
    mockChallenges.find((challenge) => challenge.id === challengeId) ?? mockChallenges[0],
  createChallenge: async (payload: CreateChallengePayload): Promise<Challenge> => ({
    id: `challenge_${Date.now()}`,
    groupId: payload.groupId,
    title: payload.title,
    description: payload.description,
    type: payload.type,
    goal: payload.goal,
    rewardPoints: payload.rewardPoints,
    participantsCount: 0,
    status: "active",
    endDate: payload.endDate,
    currentProgress: 0,
    completed: false,
    participants: [],
    ranking: [],
  }),
  joinChallenge: async (challengeId: string): Promise<ChallengeProgress> => {
    const challenge =
      mockChallenges.find((item) => item.id === challengeId) ?? mockChallenges[0];
    return {
      challengeId,
      groupId: challenge.groupId ?? "",
      userId: "mock",
      currentProgress: 0,
      goal: challenge.goal,
      completed: false,
      rewardClaimed: false,
    };
  },
  updateProgress: async ({
    challengeId,
    increment,
  }: {
    challengeId: string;
    increment: number;
  }): Promise<ChallengeProgress> => {
    const challenge =
      mockChallenges.find((item) => item.id === challengeId) ?? mockChallenges[0];
    const currentProgress = Math.min(
      challenge.goal,
      (challenge.currentProgress ?? 0) + increment,
    );
    return {
      challengeId,
      groupId: challenge.groupId ?? "",
      userId: "mock",
      currentProgress,
      goal: challenge.goal,
      completed: currentProgress >= challenge.goal,
      rewardClaimed: currentProgress >= challenge.goal,
    };
  },
  finishChallenge: async (challengeId: string): Promise<Challenge> => ({
    ...(mockChallenges.find((item) => item.id === challengeId) ?? mockChallenges[0]),
    status: "finished",
  }),
};

const apiChallengeService = {
  getGroupChallenges: async (groupId: string): Promise<Challenge[]> => {
    const response = await apiGet<ApiChallenge[]>(endpoints.groups.challenges(groupId));
    return response.map(mapChallenge);
  },
  getMyChallenges: async (userId?: string): Promise<Challenge[]> => {
    const safeUserId = userId ?? (await getCurrentUserId());
    const response = await apiGet<ApiChallenge[]>(endpoints.challenges.user(safeUserId));
    return response.map(mapChallenge);
  },
  getCompletedChallenges: async (userId?: string): Promise<Challenge[]> => {
    const safeUserId = userId ?? (await getCurrentUserId());
    const response = await apiGet<ApiChallenge[]>(
      endpoints.challenges.userCompleted(safeUserId),
    );
    return response.map(mapChallenge);
  },
  getChallenge: async (challengeId: string, userId?: string): Promise<Challenge> => {
    const safeUserId = userId ?? (await getCurrentUserId());
    const response = await apiGet<ApiChallenge>(
      withQuery(endpoints.challenges.byId(challengeId), { user_id: safeUserId }),
    );
    return mapChallenge(response);
  },
  createChallenge: async (payload: CreateChallengePayload): Promise<Challenge> => {
    const userId = await getCurrentUserId();
    const response = await apiPost<ApiChallenge>(
      endpoints.groups.challenges(payload.groupId),
      {
        created_by: userId,
        title: payload.title,
        description: payload.description,
        type: payload.type,
        goal: payload.goal,
        reward_points: payload.rewardPoints,
        end_date: payload.endDate,
      },
    );
    return mapChallenge(response);
  },
  joinChallenge: async (challengeId: string): Promise<ChallengeProgress> => {
    const userId = await getCurrentUserId();
    const response = await apiPost<ApiChallengeProgress>(
      endpoints.challenges.join(challengeId),
      { user_id: userId },
    );
    return mapChallengeProgress(response);
  },
  updateProgress: async ({
    challengeId,
    increment,
  }: {
    challengeId: string;
    increment: number;
  }): Promise<ChallengeProgress> => {
    const userId = await getCurrentUserId();
    const response = await apiPatch<ApiChallengeProgress>(
      endpoints.challenges.progress(challengeId),
      { user_id: userId, increment },
    );
    return mapChallengeProgress(response);
  },
  finishChallenge: async (challengeId: string): Promise<Challenge> => {
    const userId = await getCurrentUserId();
    const response = await apiPatch<ApiChallenge>(
      endpoints.challenges.finish(challengeId),
      { user_id: userId },
    );
    return mapChallenge(response);
  },
};

export const challengeService = USE_MOCKS ? mockChallengeService : apiChallengeService;
