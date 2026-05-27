import { create } from "zustand";
import type { User } from "@/types/user";
import { mockUser } from "@/mocks/user.mock";

type AuthState = {
  user: User | null;
  status:
    | "unauthenticated"
    | "authenticated_onboarding_incomplete"
    | "authenticated_ready";
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: mockUser,
  status: "authenticated_ready",
  setUser: (user) =>
    set({
      user,
      status: user
        ? user.onboardingCompleted
          ? "authenticated_ready"
          : "authenticated_onboarding_incomplete"
        : "unauthenticated",
    }),
}));
