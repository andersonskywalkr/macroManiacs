import { create } from "zustand";
import { clearSession, getStoredUser, saveSession } from "@/services/session.service";
import type { User } from "@/types/user";

type AuthStatus =
  | "loading"
  | "unauthenticated"
  | "authenticated_onboarding_incomplete"
  | "authenticated_ready";

type AuthState = {
  user: User | null;
  status: AuthStatus;
  hydrate: () => Promise<void>;
  setUser: (user: User | null, token?: string | null) => Promise<void>;
  clearUser: () => Promise<void>;
};

function statusFromUser(user: User | null): AuthStatus {
  if (!user) {
    return "unauthenticated";
  }

  return user.onboardingCompleted
    ? "authenticated_ready"
    : "authenticated_onboarding_incomplete";
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "loading",
  hydrate: async () => {
    const user = await getStoredUser();
    set({ user, status: statusFromUser(user) });
  },
  setUser: async (user, token) => {
    if (user) {
      await saveSession(user, token);
    } else {
      await clearSession();
    }

    set({
      user,
      status: statusFromUser(user),
    });
  },
  clearUser: async () => {
    await clearSession();
    set({ user: null, status: "unauthenticated" });
  },
}));
