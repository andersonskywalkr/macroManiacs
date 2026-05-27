import type { ChatMessage } from "@/types/chat";
import { mockGroup } from "./group.mock";
import { mockUser } from "./user.mock";

export const mockChatMessages: ChatMessage[] = [
  {
    id: "chat_1",
    groupId: mockGroup.id,
    userId: "system",
    authorName: "MacroBot",
    message: "Ranking atualizado. Ana segue em primeiro.",
    createdAt: "2026-05-26T12:00:00.000Z",
    type: "system",
  },
  {
    id: "chat_2",
    groupId: mockGroup.id,
    userId: mockUser.id,
    authorName: mockUser.name,
    message: "Almoco registrado. +22 pontos.",
    createdAt: "2026-05-26T12:30:00.000Z",
    type: "user",
  },
  {
    id: "chat_3",
    groupId: mockGroup.id,
    userId: "user_ana",
    authorName: "Ana",
    message: "Quero ver manter esse streak ate sexta.",
    createdAt: "2026-05-26T13:00:00.000Z",
    type: "user",
  },
];
