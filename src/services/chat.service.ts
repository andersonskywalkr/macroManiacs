import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapChatMessage } from "@/api/mappers";
import type { ApiChatMessage } from "@/api/dtos";
import { apiGet, apiPost } from "@/lib/api";
import { getCurrentUserId } from "@/services/session.service";
import { groupService } from "@/services/group.service";
import { useDemoStore } from "@/store/demo.store";
import type { ChatMessage } from "@/types/chat";

const mockChatService = {
  getMessages: async (): Promise<ChatMessage[]> => useDemoStore.getState().chatMessages,
  sendMessage: async (message: string): Promise<ChatMessage> =>
    useDemoStore.getState().addChatMessage(message),
};

async function resolveGroupId(groupId?: string) {
  if (groupId) {
    return groupId;
  }

  const group = await groupService.getCurrentGroup();
  return group.id;
}

const apiChatService = {
  getMessages: async (groupId?: string, limit = 50): Promise<ChatMessage[]> => {
    const [safeGroupId, userId] = await Promise.all([
      resolveGroupId(groupId),
      getCurrentUserId(),
    ]);
    const searchParams = new URLSearchParams({
      user_id: userId,
      limit: String(limit),
    });
    const response = await apiGet<ApiChatMessage[]>(
      `${endpoints.groups.chat(safeGroupId)}?${searchParams.toString()}`,
    );
    return response.map(mapChatMessage);
  },
  sendMessage: async (message: string, groupId?: string): Promise<ChatMessage> => {
    const [safeGroupId, userId] = await Promise.all([
      resolveGroupId(groupId),
      getCurrentUserId(),
    ]);
    const response = await apiPost<ApiChatMessage>(endpoints.groups.chat(safeGroupId), {
      user_id: userId,
      message,
    });
    return mapChatMessage(response);
  },
};

export const chatService = USE_MOCKS ? mockChatService : apiChatService;
