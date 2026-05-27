import { create } from "zustand";
import { mockCheckInResult } from "@/mocks/checkin.mock";
import { mockChatMessages } from "@/mocks/chat.mock";
import { mockFeedPosts } from "@/mocks/feed.mock";
import { mockDailyMacros } from "@/mocks/macros.mock";
import type { CheckInResult } from "@/types/checkin";
import type { ChatMessage } from "@/types/chat";
import type { FeedPost } from "@/types/feed";
import type { DailyMacros, MacroSummary, MacroValue } from "@/types/macros";

type CheckInKind = "barcode" | "planned_meal" | "photo" | "manual";

type DemoState = {
  dailyMacros: DailyMacros;
  feedPosts: FeedPost[];
  chatMessages: ChatMessage[];
  lastCheckIn: CheckInResult;
  addCheckIn: (kind: CheckInKind, title: string, macros: MacroSummary) => CheckInResult;
  addChatMessage: (message: string) => ChatMessage;
};

const clampPercentage = (value: number) => Math.min(100, Math.round(value));

const addMacro = (current: MacroValue, added: number): MacroValue => {
  const consumed = current.consumed + added;
  const remaining = Math.max(0, current.target - consumed);
  return {
    consumed,
    target: current.target,
    remaining,
    percentage: clampPercentage((consumed / current.target) * 100),
  };
};

export const useDemoStore = create<DemoState>((set, get) => ({
  dailyMacros: mockDailyMacros,
  feedPosts: mockFeedPosts,
  chatMessages: mockChatMessages,
  lastCheckIn: mockCheckInResult,
  addCheckIn: (kind, title, macros) => {
    const state = get();
    const dailyMacros: DailyMacros = {
      calories: addMacro(state.dailyMacros.calories, macros.calories),
      protein: addMacro(state.dailyMacros.protein, macros.protein),
      carbs: addMacro(state.dailyMacros.carbs, macros.carbs),
      fat: addMacro(state.dailyMacros.fat, macros.fat),
      status: "in_progress",
    };
    const pointsEarned = Math.max(10, Math.round(macros.protein / 2));
    const result: CheckInResult = {
      ...mockCheckInResult,
      checkInId: `checkin_${kind}_${Date.now()}`,
      pointsEarned,
      macrosAdded: macros,
      dailyMacros,
      rankingPosition: 2,
    };
    const post: FeedPost = {
      id: `feed_${Date.now()}`,
      type: kind === "barcode" ? "product_scan" : "check_in",
      user: {
        id: "user_rafael",
        name: "Rafael",
        username: "rafael",
      },
      title,
      description: `Check-in registrado. +${pointsEarned} pontos para o ranking.`,
      macros,
      points: pointsEarned,
      createdAt: new Date().toISOString(),
      reactions: [{ type: "Brabo", count: 0, reactedByMe: false }],
      commentsCount: 0,
    };

    set({
      dailyMacros,
      lastCheckIn: result,
      feedPosts: [post, ...state.feedPosts],
    });

    return result;
  },
  addChatMessage: (message) => {
    const newMessage: ChatMessage = {
      id: `chat_${Date.now()}`,
      groupId: "group_maniacs",
      userId: "user_rafael",
      authorName: "Rafael",
      message,
      createdAt: new Date().toISOString(),
      type: "user",
    };
    set((state) => ({
      chatMessages: [...state.chatMessages, newMessage],
    }));
    return newMessage;
  },
}));
