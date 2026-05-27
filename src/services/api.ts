import { AxiosError, create, type AxiosRequestConfig, type AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { API_BASE_URL } from "@/constants/config";
import { AppError, normalizeApiError } from "@/api/errors";

export const AUTH_USER_KEY = "@macromaniacs:user";
export const AUTH_TOKEN_KEY = "@macromaniacs:token";

export type ApiEnvelope<T> =
  | T
  | {
      success?: boolean;
      message?: string;
      data: T;
      details?: unknown;
    };

export const api = create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

async function getStoredToken() {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return window.localStorage.getItem(AUTH_TOKEN_KEY) ?? window.localStorage.getItem("access_token");
  }

  return (
    (await SecureStore.getItemAsync(AUTH_TOKEN_KEY)) ??
    (await SecureStore.getItemAsync("access_token"))
  );
}

async function clearStoredSession() {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
    window.localStorage.removeItem("access_token");
    window.localStorage.removeItem(AUTH_USER_KEY);
    return;
  }

  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  await SecureStore.deleteItemAsync("access_token");
  await SecureStore.deleteItemAsync(AUTH_USER_KEY);
}

api.interceptors.request.use(async (config) => {
  const token = await getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error?.response?.status === 401) {
      await clearStoredSession();
    }

    return Promise.reject(normalizeApiError(error));
  },
);

export function unwrapEnvelope<T>(payload: ApiEnvelope<T>): T {
  if (
    payload &&
    typeof payload === "object" &&
    "success" in payload &&
    payload.success === false
  ) {
    throw new AppError(
      payload.message ?? "Nao foi possivel concluir a acao.",
      "validation_error",
      undefined,
      payload.details,
    );
  }

  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }

  return payload as T;
}

export async function request<T>(
  promise: Promise<AxiosResponse<ApiEnvelope<T>>>,
): Promise<T> {
  const response = await promise;
  return unwrapEnvelope(response.data);
}

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return request<T>(api.get<ApiEnvelope<T>>(url, config));
}

export async function apiPost<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  return request<T>(api.post<ApiEnvelope<T>>(url, data, config));
}

export async function apiPatch<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  return request<T>(api.patch<ApiEnvelope<T>>(url, data, config));
}
