export type ChallengeType =
  | "daily_checkin"
  | "water_goal"
  | "protein_goal"
  | "calorie_goal"
  | "no_ultra_processed"
  | "breakfast_checkin"
  | "manual";

export type ChallengeStatus = "active" | "finished" | "expired";

export type ChallengeProgress = {
  challengeId: string;
  groupId: string;
  userId: string;
  currentProgress: number;
  goal: number;
  completed: boolean;
  rewardClaimed: boolean;
};

export type ChallengeParticipant = {
  userId: string;
  name: string;
  username?: string;
  avatar?: string | null;
  currentProgress: number;
  completed: boolean;
};

export type Challenge = {
  id: string;
  groupId?: string;
  groupName?: string;
  createdBy?: string;
  title: string;
  description: string;
  type: ChallengeType;
  goal: number;
  rewardPoints: number;
  participantsCount: number;
  status: ChallengeStatus;
  endDate?: string;
  daysRemaining?: number;
  currentProgress?: number;
  completed?: boolean;
  userProgress?: ChallengeProgress | null;
  participants?: ChallengeParticipant[];
  ranking?: ChallengeParticipant[];
};

export type CreateChallengePayload = {
  groupId: string;
  title: string;
  description: string;
  type: ChallengeType;
  goal: number;
  rewardPoints: number;
  endDate: string;
};
