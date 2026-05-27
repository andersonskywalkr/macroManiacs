import type { Badge, Medal } from "./achievements";
import type { DailyMacros, MacroSummary } from "./macros";

export type CheckInResult = {
  checkInId: string;
  pointsEarned: number;
  macrosAdded: MacroSummary;
  dailyMacros: DailyMacros;
  rankingPosition?: number | null;
  unlockedBadges: Badge[];
  unlockedMedals: Medal[];
};
