import * as SecureStore from "expo-secure-store";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/services/api";
import type { User } from "@/types/user";

export async function saveSession(user: User, token?: string | null) {
  await SecureStore.setItemAsync(AUTH_USER_KEY, JSON.stringify(user));
  if (token) {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    await SecureStore.setItemAsync("access_token", token);
  }
}

export async function getStoredUser(): Promise<User | null> {
  const rawUser = await SecureStore.getItemAsync(AUTH_USER_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    await SecureStore.deleteItemAsync(AUTH_USER_KEY);
    return null;
  }
}

export async function getCurrentUserId(): Promise<string> {
  const user = await getStoredUser();
  if (!user?.id) {
    throw new Error("Usuario nao autenticado.");
  }
  return user.id;
}

export async function clearSession() {
  await SecureStore.deleteItemAsync(AUTH_USER_KEY);
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  await SecureStore.deleteItemAsync("access_token");
}
