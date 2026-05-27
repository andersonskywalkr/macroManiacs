import type { Avatar } from "@/types/avatar";
import type { User } from "@/types/user";
import { mockMedals } from "./achievements.mock";

export const mockUser: User = {
  id: "user_rafael",
  name: "Rafael",
  username: "rafael",
  email: "rafael@macromanics.app",
  onboardingCompleted: true,
};

export const mockAvatar: Avatar = {
  id: "avatar_rafael",
  userId: mockUser.id,
  skinTone: "warm",
  hairStyle: "messy",
  hairColor: "black",
  expression: "confident",
  outfit: "gym-purple",
  accessory: "headband",
  background: "arena",
  equippedMedals: mockMedals.filter((medal) => medal.equipped),
};
