import type { Ranking } from "@/types/ranking";
import { mockMedals } from "./achievements.mock";
import { mockAvatar, mockUser } from "./user.mock";

export const mockRanking: Ranking = {
  groupId: "group_maniacs",
  period: "week",
  entries: [
    {
      position: 1,
      userId: "user_ana",
      name: "Ana",
      username: "ana",
      points: 920,
      totalCheckins: 18,
      streak: 8,
      medals: [mockMedals[0]],
      isCurrentUser: false,
    },
    {
      position: 2,
      userId: mockUser.id,
      name: mockUser.name,
      username: mockUser.username,
      avatar: mockAvatar,
      points: 880,
      totalCheckins: 16,
      streak: 6,
      medals: mockMedals,
      isCurrentUser: true,
    },
    {
      position: 3,
      userId: "user_joao",
      name: "Joao",
      username: "joao",
      points: 760,
      totalCheckins: 12,
      streak: 4,
      medals: [],
      isCurrentUser: false,
    },
  ],
};
