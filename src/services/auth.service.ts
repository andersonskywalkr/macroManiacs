import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapUser, unwrap } from "@/api/mappers";
import type { ApiEnvelope, ApiTokenResponse, ApiUser } from "@/api/dtos";
import { api } from "@/lib/api";
import { mockUser } from "@/mocks/user.mock";
import type { User } from "@/types/user";
import * as SecureStore from "expo-secure-store";

type AuthPayload = {
  email: string;
  password: string;
};

const mockAuthService = {
  login: async (_payload: AuthPayload): Promise<User> => mockUser,
  register: async (_payload: AuthPayload & { name: string; username: string }): Promise<User> =>
    ({ ...mockUser, onboardingCompleted: false }),
  me: async (): Promise<User> => mockUser,
  logout: async (): Promise<void> => undefined,
};

const apiAuthService = {
  login: async (payload: AuthPayload): Promise<User> => {
    const response = await api.post<ApiEnvelope<ApiTokenResponse<ApiUser> | ApiUser>>(
      endpoints.auth.login,
      payload,
    );
    const data = unwrap(response.data);
    const tokenResponse = data as ApiTokenResponse<ApiUser>;
    const token = tokenResponse.accessToken ?? tokenResponse.access_token ?? tokenResponse.token;
    if (token) {
      await SecureStore.setItemAsync("access_token", token);
    }
    return mapUser(tokenResponse.user ?? (data as ApiUser));
  },
  register: async (
    payload: AuthPayload & { name: string; username: string },
  ): Promise<User> => {
    const response = await api.post<ApiEnvelope<ApiTokenResponse<ApiUser> | ApiUser>>(
      endpoints.auth.register,
      payload,
    );
    const data = unwrap(response.data);
    const tokenResponse = data as ApiTokenResponse<ApiUser>;
    const token = tokenResponse.accessToken ?? tokenResponse.access_token ?? tokenResponse.token;
    if (token) {
      await SecureStore.setItemAsync("access_token", token);
    }
    return mapUser(tokenResponse.user ?? (data as ApiUser));
  },
  me: async (): Promise<User> => {
    const response = await api.get<ApiEnvelope<ApiUser>>(endpoints.auth.me);
    return mapUser(unwrap(response.data));
  },
  logout: async (): Promise<void> => {
    try {
      await api.post(endpoints.auth.logout);
    } finally {
      await SecureStore.deleteItemAsync("access_token");
    }
  },
};

export const authService = USE_MOCKS ? mockAuthService : apiAuthService;
