import type { Avatar } from "./avatar";
import type { MacroSummary } from "./macros";

export type FeedPostType =
  | "check_in"
  | "product_scan"
  | "streak"
  | "ranking_change"
  | "medal_unlocked"
  | "macro_complete"
  | "alert";

export type FeedUser = {
  id: string;
  name: string;
  username: string;
  avatar?: Avatar | null;
};

export type Reaction = {
  type: string;
  count: number;
  reactedByMe: boolean;
};

export type FeedPost = {
  id: string;
  type: FeedPostType;
  user: FeedUser;
  title: string;
  description: string;
  macros?: MacroSummary | null;
  points?: number | null;
  createdAt: string;
  reactions: Reaction[];
  commentsCount: number;
};
