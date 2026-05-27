import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapFeedPost, unwrap } from "@/api/mappers";
import type { ApiEnvelope, ApiFeedPost } from "@/api/dtos";
import { api } from "@/lib/api";
import { useDemoStore } from "@/store/demo.store";
import type { FeedPost } from "@/types/feed";

const mockFeedService = {
  getGroupFeed: async (): Promise<FeedPost[]> => useDemoStore.getState().feedPosts,
};

const apiFeedService = {
  getGroupFeed: async (groupId = "current"): Promise<FeedPost[]> => {
    const response = await api.get<ApiEnvelope<ApiFeedPost[]>>(endpoints.groups.feed(groupId));
    return unwrap(response.data).map(mapFeedPost);
  },
};

export const feedService = USE_MOCKS ? mockFeedService : apiFeedService;
