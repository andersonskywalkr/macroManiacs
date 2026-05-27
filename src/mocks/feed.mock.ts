import type { FeedPost } from "@/types/feed";
import { mockAvatar, mockUser } from "./user.mock";

const baseUser = {
  id: mockUser.id,
  name: mockUser.name,
  username: mockUser.username,
  avatar: mockAvatar,
};

export const mockFeedPosts: FeedPost[] = [
  {
    id: "feed_1",
    type: "check_in",
    user: baseUser,
    title: "Rafael registrou o almoço.",
    description: "Frango, arroz, feijão e salada. Proteína batida, sem drama.",
    macros: { calories: 620, protein: 42, carbs: 78, fat: 11 },
    points: 18,
    createdAt: "2026-05-26T15:20:00.000Z",
    reactions: [
      { type: "Brabo", count: 7, reactedByMe: true },
      { type: "Limpo", count: 4, reactedByMe: false },
    ],
    commentsCount: 3,
  },
  {
    id: "feed_2",
    type: "product_scan",
    user: { id: "user_ana", name: "Ana", username: "ana" },
    title: "Ana escaneou um produto.",
    description: "Iogurte proteico aprovado. Vai deixar ela abrir vantagem?",
    macros: { calories: 146, protein: 18, carbs: 9, fat: 3 },
    points: 12,
    createdAt: "2026-05-26T14:10:00.000Z",
    reactions: [{ type: "Monstro", count: 5, reactedByMe: false }],
    commentsCount: 1,
  },
  {
    id: "feed_3",
    type: "streak",
    user: { id: "user_bia", name: "Bia", username: "bia" },
    title: "Bia chegou em 7 dias de streak.",
    description: "Streak pegando fogo. O clube sentiu a pressão.",
    points: 30,
    createdAt: "2026-05-26T12:00:00.000Z",
    reactions: [{ type: "Respeita", count: 11, reactedByMe: false }],
    commentsCount: 6,
  },
];
