import type { MacroSummary } from "./macros";

export type DietMealItem = {
  id: string;
  food: string;
  quantity: string;
  macros?: MacroSummary | null;
};

export type DietMeal = {
  id: string;
  name: string;
  time?: string | null;
  items: DietMealItem[];
  macros: MacroSummary;
};

export type DietDay = {
  day: number;
  meals: DietMeal[];
  dailyTargets: MacroSummary;
};

export type DietDraft = {
  id: string;
  userId?: string;
  dailyTargets: MacroSummary;
  days: DietDay[];
  meals: DietMeal[];
  status?: "pending_review" | "confirmed";
  activePlan?: boolean;
  confidence?: number;
};

export type DietPlan = {
  id: string;
  userId?: string;
  dailyTargets: MacroSummary;
  days: DietDay[];
  meals: DietMeal[];
  status?: "pending_review" | "confirmed";
  activePlan?: boolean;
};
