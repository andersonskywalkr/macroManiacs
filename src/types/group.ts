export type Group = {
  id: string;
  name: string;
  inviteCode: string;
  membersCount: number;
  currentChallenge: string;
  startsAt?: string;
  endsAt?: string;
  rankingPosition?: number;
  points?: number;
  streak?: number;
  weeklyGoal?: string;
  lastActivity?: string;
  role?: "owner" | "admin" | "member";
};
