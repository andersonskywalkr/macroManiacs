import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapFeedPost } from "@/api/mappers";
import type { ApiFeedPost } from "@/api/dtos";
import { apiGet } from "@/lib/api";
import { groupService } from "@/services/group.service";
import { useDemoStore } from "@/store/demo.store";
import type { FeedPost } from "@/types/feed";

const mockFeedService = {
  getGroupFeed: async (): Promise<FeedPost[]> => useDemoStore.getState().feedPosts,
};

const apiFeedService = {
  getGroupFeed: async (groupId?: string, limit = 20): Promise<FeedPost[]> => {
    const currentGroup = groupId ? null : await groupService.getCurrentGroup().catch(() => null);
    const safeGroupId = groupId ?? currentGroup?.id ?? "";
    if (!safeGroupId) {
      return [];
    }

    const response = await apiGet<ApiFeedPost[]>(
      `${endpoints.groups.feed(safeGroupId)}?limit=${limit}`,
    );
    return response.map(mapFeedPost);
  },
};

export const feedService = USE_MOCKS ? mockFeedService : apiFeedService;
