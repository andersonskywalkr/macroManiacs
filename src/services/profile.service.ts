import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapAvatar, mapBadge, mapMedal, mapUser, unwrap } from "@/api/mappers";
import type { ApiAvatar, ApiBadge, ApiEnvelope, ApiMedal, ApiUser } from "@/api/dtos";
import { api } from "@/lib/api";
import { mockBadges, mockMedals } from "@/mocks/achievements.mock";
import { mockAvatar, mockUser } from "@/mocks/user.mock";
import type { Badge, Medal } from "@/types/achievements";
import type { Avatar } from "@/types/avatar";
import type { User } from "@/types/user";

export type ProfileSummary = {
  user: User;
  avatar: Avatar;
  badges: Badge[];
  medals: Medal[];
};

const mockProfileService = {
  getProfile: async (): Promise<ProfileSummary> => ({
    user: mockUser,
    avatar: mockAvatar,
    badges: mockBadges,
    medals: mockMedals,
  }),
};

const apiProfileService = {
  getProfile: async (): Promise<ProfileSummary> => {
    const response = await api.get<
      ApiEnvelope<{
        user?: ApiUser;
        avatar?: ApiAvatar;
        badges?: ApiBadge[];
        medals?: ApiMedal[];
      }>
    >(endpoints.profile.profile);
    const data = unwrap(response.data);
    return {
      user: mapUser(data.user ?? {}),
      avatar: mapAvatar(data.avatar ?? {}),
      badges: (data.badges ?? []).map(mapBadge),
      medals: (data.medals ?? []).map(mapMedal),
    };
  },
};

export const profileService = USE_MOCKS
  ? mockProfileService
  : apiProfileService;
