import { USE_MOCKS } from "@/constants/config";
import { AppError } from "@/api/errors";
import { useDemoStore } from "@/store/demo.store";
import type { ChatMessage } from "@/types/chat";

const mockChatService = {
  getMessages: async (): Promise<ChatMessage[]> => useDemoStore.getState().chatMessages,
  sendMessage: async (message: string): Promise<ChatMessage> =>
    useDemoStore.getState().addChatMessage(message),
};

const apiChatService = {
  getMessages: async (): Promise<ChatMessage[]> => [],
  sendMessage: async (_message: string): Promise<ChatMessage> => {
    throw new AppError(
      "Chat ainda nao possui endpoint no backend.",
      "not_found",
      404,
      { todo: "Adicionar endpoints de chat ou remover a tela no MVP." },
    );
  },
};

export const chatService = USE_MOCKS ? mockChatService : apiChatService;
