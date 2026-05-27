import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapAvatar, mapUser, unwrap } from "@/api/mappers";
import type { ApiAvatar, ApiEnvelope, ApiUser } from "@/api/dtos";
import { api } from "@/lib/api";
import { mockAvatar, mockUser } from "@/mocks/user.mock";
import type { Avatar } from "@/types/avatar";
import type { User } from "@/types/user";

type BodyDataPayload = {
  age: string;
  height: string;
  weight: string;
  goal: string;
};

const mockOnboardingService = {
  saveAvatar: async (): Promise<Avatar> => mockAvatar,
  saveBodyData: async (_payload: BodyDataPayload): Promise<User> => mockUser,
};

const apiOnboardingService = {
  saveAvatar: async (): Promise<Avatar> => {
    const response = await api.post<ApiEnvelope<ApiAvatar>>(endpoints.avatar.create);
    return mapAvatar(unwrap(response.data));
  },
  saveBodyData: async (payload: BodyDataPayload): Promise<User> => {
    const response = await api.post<ApiEnvelope<ApiUser>>(endpoints.profile.bodyData, payload);
    return mapUser(unwrap(response.data));
  },
};

export const onboardingService = USE_MOCKS
  ? mockOnboardingService
  : apiOnboardingService;
