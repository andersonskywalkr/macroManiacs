import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import {
  mapDailyMacrosFromSummary,
  mapFeedPost,
  mapGroup,
  mapNotification,
  mapRanking,
  mapUser,
} from "@/api/mappers";
import type { ApiFeedPost, ApiHomeResponse } from "@/api/dtos";
import type { DailyMacros } from "@/types/macros";
import { apiGet } from "@/lib/api";
import { useDemoStore } from "@/store/demo.store";
import { getCurrentUserId } from "@/services/session.service";
import type { FeedPost } from "@/types/feed";
import type { Group } from "@/types/group";
import type { NotificationsSummary } from "@/types/notification";
import type { Ranking } from "@/types/ranking";
import type { User } from "@/types/user";

export type HomeDashboard = {
  date: string;
  macros: DailyMacros;
  profile: User;
  weeklyPerformance: unknown;
  groups: Group[];
  selectedGroupId: string | null;
  ranking: Ranking;
  notifications: NotificationsSummary;
  feedPreview: FeedPost[];
};

const mockHomeService = {
  getDailyMacros: async (): Promise<DailyMacros> => useDemoStore.getState().dailyMacros,
  getHome: async (): Promise<HomeDashboard> => ({
    date: new Date().toISOString().slice(0, 10),
    macros: useDemoStore.getState().dailyMacros,
    profile: {
      id: "mock",
      name: "Rafael",
      username: "rafael",
      onboardingCompleted: true,
    },
    weeklyPerformance: null,
    groups: [],
    selectedGroupId: null,
    ranking: { groupId: "", period: "week", entries: [] },
    notifications: { unreadCount: 0, latest: [] },
    feedPreview: useDemoStore.getState().feedPosts,
  }),
  getWeekly: async (): Promise<unknown> => ({ days: [] }),
};

function mapHome(data: ApiHomeResponse, currentUserId?: string): HomeDashboard {
  const selectedGroupId = data.selected_group_id ?? data.groups?.[0]?.group_id ?? null;

  return {
    date: data.date ?? new Date().toISOString().slice(0, 10),
    macros: mapDailyMacrosFromSummary({
      targets: data.targets,
      consumed: data.consumed,
      remaining: data.remaining,
      progress: data.progress_percent,
    }),
    profile: mapUser(data.profile ?? {}),
    weeklyPerformance: data.weekly_performance ?? null,
    groups: (data.groups ?? []).map(mapGroup),
    selectedGroupId,
    ranking: {
      ...mapRanking(data.group_ranking ?? [], currentUserId),
      groupId: selectedGroupId ?? "",
    },
    notifications: {
      unreadCount: data.notifications?.unread_count ?? 0,
      latest: (data.notifications?.latest ?? []).map(mapNotification),
    },
    feedPreview: [],
  };
}

const apiHomeService = {
  getHome: async (params?: {
    userId?: string;
    date?: string;
    groupId?: string | null;
  }): Promise<HomeDashboard> => {
    const userId = params?.userId ?? (await getCurrentUserId());
    const searchParams = new URLSearchParams();
    if (params?.date) {
      searchParams.set("date", params.date);
    }
    if (params?.groupId) {
      searchParams.set("group_id", params.groupId);
    }
    const query = searchParams.toString();
    const data = await apiGet<ApiHomeResponse>(
      `${endpoints.home.user(userId)}${query ? `?${query}` : ""}`,
    );

    return mapHome(data, userId);
  },
  getDailyMacros: async (): Promise<DailyMacros> => {
    const home = await apiHomeService.getHome();
    return home.macros;
  },
  getWeekly: async (userId?: string, endDate?: string): Promise<unknown> => {
    const safeUserId = userId ?? (await getCurrentUserId());
    const query = endDate ? `?end_date=${encodeURIComponent(endDate)}` : "";
    return apiGet<unknown>(`${endpoints.home.weekly(safeUserId)}${query}`);
  },
  getGroupFeedPreview: async (groupId: string, limit = 5): Promise<FeedPost[]> => {
    const posts = await apiGet<ApiFeedPost[]>(
      `${endpoints.groups.feed(groupId)}?limit=${limit}`,
    );
    return posts.map(mapFeedPost);
  },
};

export const homeService = USE_MOCKS ? mockHomeService : apiHomeService;
