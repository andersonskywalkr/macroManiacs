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

export type DietDraft = {
  id: string;
  dailyTargets: MacroSummary;
  meals: DietMeal[];
  confidence?: number;
};

export type DietPlan = {
  id: string;
  dailyTargets: MacroSummary;
  meals: DietMeal[];
};
