import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapUser } from "@/api/mappers";
import type { ApiTokenResponse, ApiUser } from "@/api/dtos";
import { apiPost } from "@/lib/api";
import { mockUser } from "@/mocks/user.mock";
import { clearSession, getStoredUser, saveSession } from "@/services/session.service";
import type { User } from "@/types/user";

type AuthPayload = {
  email: string;
  password: string;
};

type RegisterPayload = AuthPayload & {
  name: string;
  username: string;
  password_confirmation?: string;
};

const mockAuthService = {
  login: async (_payload: AuthPayload): Promise<User> => mockUser,
  register: async (_payload: RegisterPayload): Promise<User> => ({
    ...mockUser,
    onboardingCompleted: false,
  }),
  me: async (): Promise<User | null> => mockUser,
  logout: async (): Promise<void> => undefined,
};

function extractToken(data: ApiTokenResponse<ApiUser> | ApiUser) {
  const tokenResponse = data as ApiTokenResponse<ApiUser>;
  return tokenResponse.accessToken ?? tokenResponse.access_token ?? tokenResponse.token ?? null;
}

function extractUser(data: ApiTokenResponse<ApiUser> | ApiUser) {
  const tokenResponse = data as ApiTokenResponse<ApiUser>;
  return mapUser(tokenResponse.user ?? (data as ApiUser));
}

const apiAuthService = {
  login: async (payload: AuthPayload): Promise<User> => {
    const data = await apiPost<ApiTokenResponse<ApiUser> | ApiUser>(
      endpoints.auth.login,
      payload,
    );
    const user = extractUser(data);
    await saveSession(user, extractToken(data));
    return user;
  },
  register: async (payload: RegisterPayload): Promise<User> => {
    const data = await apiPost<ApiTokenResponse<ApiUser> | ApiUser>(endpoints.auth.register, {
      ...payload,
      password_confirmation: payload.password_confirmation ?? payload.password,
    });
    const user = extractUser(data);
    await saveSession(user, extractToken(data));
    return user;
  },
  me: async (): Promise<User | null> => getStoredUser(),
  logout: async (): Promise<void> => {
    await clearSession();
  },
};

export const authService = USE_MOCKS ? mockAuthService : apiAuthService;
