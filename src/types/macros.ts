export type MacroValue = {
  consumed: number;
  target: number;
  remaining: number;
  percentage: number;
};

export type DailyMacros = {
  calories: MacroValue;
  protein: MacroValue;
  carbs: MacroValue;
  fat: MacroValue;
  status:
    | "empty_day"
    | "in_progress"
    | "target_hit"
    | "over_target"
    | "all_complete";
};

export type MacroSummary = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};
