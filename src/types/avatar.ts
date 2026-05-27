import type { Medal } from "./achievements";

export type Avatar = {
  id: string;
  userId: string;
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  expression: string;
  outfit: string;
  accessory?: string | null;
  background: string;
  equippedMedals: Medal[];
};
