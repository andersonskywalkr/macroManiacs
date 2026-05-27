import type { DailyMacros } from "@/types/macros";

export const mockDailyMacros: DailyMacros = {
  calories: { consumed: 0, target: 2300, remaining: 2300, percentage: 0 },
  protein: { consumed: 0, target: 180, remaining: 180, percentage: 0 },
  carbs: { consumed: 0, target: 250, remaining: 250, percentage: 0 },
  fat: { consumed: 0, target: 70, remaining: 70, percentage: 0 },
  status: "empty_day",
};
