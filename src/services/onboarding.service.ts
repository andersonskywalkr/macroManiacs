import { USE_MOCKS } from "@/constants/config";
import { mapAvatar } from "@/api/mappers";
import { mockAvatar, mockUser } from "@/mocks/user.mock";
import { profileService } from "@/services/profile.service";
import { getStoredUser } from "@/services/session.service";
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
    const user = await profileService.updateAvatar(null);
    return mapAvatar(user.avatar, user.id);
  },
  saveBodyData: async (_payload: BodyDataPayload): Promise<User> => {
    const user = await getStoredUser();
    if (!user) {
      throw new Error("Usuario nao autenticado.");
    }

    return user;
  },
};

export const onboardingService = USE_MOCKS ? mockOnboardingService : apiOnboardingService;
