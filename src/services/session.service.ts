import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/services/api";
import type { User } from "@/types/user";

async function setItem(key: string, value: string) {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    window.localStorage.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
}

async function getItem(key: string) {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }

  return SecureStore.getItemAsync(key);
}

async function deleteItem(key: string) {
  if (Platform.OS === "web" && typeof window !== "undefined") {
    window.localStorage.removeItem(key);
    return;
  }

  await SecureStore.deleteItemAsync(key);
}

export async function saveSession(user: User, token?: string | null) {
  await setItem(AUTH_USER_KEY, JSON.stringify(user));
  if (token) {
    await setItem(AUTH_TOKEN_KEY, token);
    await setItem("access_token", token);
  }
}

export async function getStoredUser(): Promise<User | null> {
  const rawUser = await getItem(AUTH_USER_KEY);
  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    await deleteItem(AUTH_USER_KEY);
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
  await deleteItem(AUTH_USER_KEY);
  await deleteItem(AUTH_TOKEN_KEY);
  await deleteItem("access_token");
}
