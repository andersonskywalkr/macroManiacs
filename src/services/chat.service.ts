import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapChatMessage, unwrap } from "@/api/mappers";
import type { ApiChatMessage, ApiEnvelope } from "@/api/dtos";
import { api } from "@/lib/api";
import { useDemoStore } from "@/store/demo.store";
import type { ChatMessage } from "@/types/chat";

const mockChatService = {
  getMessages: async (): Promise<ChatMessage[]> => useDemoStore.getState().chatMessages,
  sendMessage: async (message: string): Promise<ChatMessage> =>
    useDemoStore.getState().addChatMessage(message),
};

const apiChatService = {
  getMessages: async (groupId = "current"): Promise<ChatMessage[]> => {
    const response = await api.get<ApiEnvelope<ApiChatMessage[]>>(endpoints.groups.chat(groupId));
    return unwrap(response.data).map(mapChatMessage);
  },
  sendMessage: async (
    message: string,
    groupId = "current",
  ): Promise<ChatMessage> => {
    const response = await api.post<ApiEnvelope<ApiChatMessage>>(endpoints.groups.chat(groupId), {
      message,
    });
    return mapChatMessage(unwrap(response.data));
  },
};

export const chatService = USE_MOCKS ? mockChatService : apiChatService;
