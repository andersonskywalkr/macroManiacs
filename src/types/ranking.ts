import type { Avatar } from "./avatar";
import type { Medal } from "./achievements";

export type RankingUser = {
  position: number;
  userId: string;
  name: string;
  username: string;
  avatar?: Avatar | null;
  points: number;
  totalCheckins: number;
  streak: number;
  medals: Medal[];
  isCurrentUser: boolean;
};

export type Ranking = {
  groupId: string;
  period: string;
  entries: RankingUser[];
};
