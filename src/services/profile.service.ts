import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapAvatar, mapBadge, mapMedal, mapUser } from "@/api/mappers";
import type { ApiAchievementSummary, ApiBadge, ApiUser } from "@/api/dtos";
import { AppError } from "@/api/errors";
import { apiGet, apiPatch, apiPost } from "@/lib/api";
import { mockBadges, mockMedals } from "@/mocks/achievements.mock";
import { mockAvatar, mockUser } from "@/mocks/user.mock";
import { getCurrentUserId } from "@/services/session.service";
import { Platform } from "react-native";
import type { Badge, Medal } from "@/types/achievements";
import type { Avatar } from "@/types/avatar";
import type { User } from "@/types/user";

export type ProfileSummary = {
  user: User;
  avatar: Avatar;
  badges: Badge[];
  medals: Medal[];
};

export type AvatarUploadPayload = {
  uri: string;
  name?: string;
  mimeType?: string;
  userId?: string;
};

const mockProfileService = {
  getProfile: async (): Promise<ProfileSummary> => ({
    user: mockUser,
    avatar: mockAvatar,
    badges: mockBadges,
    medals: mockMedals,
  }),
  updateAvatar: async (_avatar: string | null): Promise<User> => mockUser,
  uploadAvatar: async (_payload: AvatarUploadPayload): Promise<User> => mockUser,
};

async function getAchievementsForProfile(userId: string) {
  try {
    const achievements = await apiGet<ApiAchievementSummary>(endpoints.achievements.user(userId));
    return {
      badges: (achievements.badges ?? []).map(mapBadge),
      medals: (achievements.ranking_medals ?? []).map(mapMedal),
    };
  } catch (error) {
    if (error instanceof AppError && error.status !== 404) {
      throw error;
    }

    const badges = await apiGet<ApiBadge[]>(endpoints.badges.user(userId));
    return { badges: badges.map(mapBadge), medals: [] };
  }
}

async function appendAvatarFile(formData: FormData, payload: AvatarUploadPayload) {
  const name = payload.name ?? "avatar.jpg";
  const mimeType = payload.mimeType ?? "image/jpeg";

  if (Platform.OS === "web") {
    const response = await fetch(payload.uri);
    const blob = await response.blob();
    formData.append("file", new File([blob], name, { type: mimeType }));
    return;
  }

  formData.append("file", {
    uri: payload.uri,
    name,
    type: mimeType,
  } as unknown as Blob);
}

const apiProfileService = {
  getProfile: async (userId?: string): Promise<ProfileSummary> => {
    const safeUserId = userId ?? (await getCurrentUserId());
    const [profile, achievements] = await Promise.all([
      apiGet<ApiUser>(endpoints.profile.user(safeUserId)),
      getAchievementsForProfile(safeUserId),
    ]);
    const user = mapUser(profile);

    return {
      user,
      avatar: mapAvatar(profile.avatar, user.id),
      badges: achievements.badges,
      medals: achievements.medals,
    };
  },
  updateAvatar: async (avatar: string | null, userId?: string): Promise<User> => {
    const safeUserId = userId ?? (await getCurrentUserId());
    const profile = await apiPatch<ApiUser>(endpoints.profile.user(safeUserId), { avatar });
    return mapUser(profile);
  },
  uploadAvatar: async (payload: AvatarUploadPayload): Promise<User> => {
    const safeUserId = payload.userId ?? (await getCurrentUserId());
    const formData = new FormData();
    await appendAvatarFile(formData, payload);
    const profile = await apiPost<ApiUser>(endpoints.profile.avatar(safeUserId), formData);
    return mapUser(profile);
  },
};

export const profileService = USE_MOCKS ? mockProfileService : apiProfileService;
