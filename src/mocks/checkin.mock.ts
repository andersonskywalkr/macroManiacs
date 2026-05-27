import type { CheckInResult } from "@/types/checkin";
import { mockBadges, mockMedals } from "./achievements.mock";
import { mockDailyMacros } from "./macros.mock";

export const mockCheckInResult: CheckInResult = {
  checkInId: "checkin_lunch_001",
  pointsEarned: 18,
  macrosAdded: {
    calories: 146,
    protein: 18,
    carbs: 9,
    fat: 3,
  },
  dailyMacros: {
    ...mockDailyMacros,
    calories: { consumed: 1596, target: 2300, remaining: 704, percentage: 69 },
    protein: { consumed: 160, target: 180, remaining: 20, percentage: 89 },
    carbs: { consumed: 189, target: 250, remaining: 61, percentage: 76 },
    fat: { consumed: 47, target: 70, remaining: 23, percentage: 67 },
  },
  rankingPosition: 2,
  unlockedBadges: [mockBadges[1]],
  unlockedMedals: [mockMedals[1]],
};
