export type ApiId = string;

export type ApiEnvelope<T> =
  | T
  | {
      success?: boolean;
      message?: string;
      data: T;
      details?: unknown;
    };

export type ApiTokenResponse<TUser> = {
  user?: TUser;
  accessToken?: string;
  access_token?: string;
  token?: string;
};

export type ApiUser = {
  id?: ApiId;
  _id?: ApiId;
  user_id?: ApiId;
  name?: string;
  username?: string;
  email?: string;
  avatar?: string | null;
  created_at?: string;
  onboardingCompleted?: boolean;
  onboarding_completed?: boolean;
};

export type ApiMedal = {
  id?: ApiId;
  _id?: ApiId;
  code?: string;
  name?: string;
  emoji?: string;
  position?: number;
  group_id?: ApiId;
  group_name?: string;
  category?: string;
  level?: "bronze" | "silver" | "gold" | "diamond";
  rarity?: "common" | "rare" | "epic" | "legendary" | "maniac";
  description?: string;
  visualSlot?: string;
  visual_slot?: string;
  unlocked?: boolean;
  equipped?: boolean;
};

export type ApiBadge = {
  id?: ApiId;
  _id?: ApiId;
  code?: string;
  name?: string;
  description?: string;
  icon?: string;
  unlocked?: boolean;
  created_at?: string;
};

export type ApiAvatar = {
  id?: ApiId;
  _id?: ApiId;
  userId?: ApiId;
  user_id?: ApiId;
  skinTone?: string;
  skin_tone?: string;
  hairStyle?: string;
  hair_style?: string;
  hairColor?: string;
  hair_color?: string;
  expression?: string;
  outfit?: string;
  accessory?: string | null;
  background?: string;
  equippedMedals?: ApiMedal[];
  equipped_medals?: ApiMedal[];
};

export type ApiMacroSummary = {
  calories?: number;
  protein?: number;
  protein_g?: number;
  carbs?: number;
  carbs_g?: number;
  fat?: number;
  fat_g?: number;
};

export type ApiMacroValue = {
  consumed?: number;
  target?: number;
  remaining?: number;
  percentage?: number;
};

export type ApiDailyMacros = {
  calories?: ApiMacroValue;
  protein?: ApiMacroValue;
  carbs?: ApiMacroValue;
  fat?: ApiMacroValue;
  status?: "empty_day" | "in_progress" | "target_hit" | "over_target" | "all_complete";
};

export type ApiDietMealItem = {
  id?: ApiId;
  _id?: ApiId;
  food?: string;
  quantity?: string;
  macros?: ApiMacroSummary | null;
  estimated_macros?: ApiMacroSummary | null;
};

export type ApiDietMeal = {
  id?: ApiId;
  _id?: ApiId;
  name?: string;
  time?: string | null;
  items?: ApiDietMealItem[];
  macros?: ApiMacroSummary;
  meal_totals?: ApiMacroSummary;
};

export type ApiDietDay = {
  day?: number;
  meals?: ApiDietMeal[];
  daily_targets?: ApiMacroSummary;
  dailyTargets?: ApiMacroSummary;
};

export type ApiDietDraft = {
  id?: ApiId;
  _id?: ApiId;
  diet_id?: ApiId;
  user_id?: ApiId;
  status?: "pending_review" | "confirmed";
  active_plan?: boolean;
  dailyTargets?: ApiMacroSummary;
  daily_targets?: ApiMacroSummary;
  average_daily_targets?: ApiMacroSummary;
  days?: ApiDietDay[];
  meals?: ApiDietMeal[];
  confidence?: number;
};

export type ApiDietPlan = ApiDietDraft;

export type ApiProduct = {
  barcode?: string;
  name?: string;
  brand?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
  servingSize?: string | null;
  serving_size?: string | null;
  caloriesPer100g?: number | null;
  proteinPer100g?: number | null;
  carbsPer100g?: number | null;
  fatPer100g?: number | null;
  nutrition_per_100g?: {
    calories?: number | null;
    protein?: number | null;
    protein_g?: number | null;
    carbs?: number | null;
    carbs_g?: number | null;
    fat?: number | null;
    fat_g?: number | null;
  };
  source?: "open_food_facts" | "manual";
  status?: "found" | "not_found" | "incomplete";
};

export type ApiCheckInResult = {
  checkInId?: ApiId;
  checkin_id?: ApiId;
  check_in_id?: ApiId;
  group_ids?: ApiId[];
  type?: string;
  name?: string;
  macros?: ApiMacroSummary;
  points?: number;
  points_breakdown?: unknown[];
  source?: string;
  requires_review?: boolean;
  created_at?: string;
  badges_unlocked?: ApiBadge[];
  pointsEarned?: number;
  points_earned?: number;
  macrosAdded?: ApiMacroSummary;
  macros_added?: ApiMacroSummary;
  dailyMacros?: ApiDailyMacros;
  daily_macros?: ApiDailyMacros;
  rankingPosition?: number | null;
  ranking_position?: number | null;
  unlockedBadges?: ApiBadge[];
  unlocked_badges?: ApiBadge[];
  unlockedMedals?: ApiMedal[];
  unlocked_medals?: ApiMedal[];
};

export type ApiFeedUser = ApiUser & {
  avatar?: ApiAvatar | null;
};

export type ApiReaction = {
  type?: string;
  count?: number;
  reactedByMe?: boolean;
  reacted_by_me?: boolean;
};

export type ApiFeedPost = {
  id?: ApiId;
  _id?: ApiId;
  activity_id?: ApiId;
  type?: string;
  user?: ApiFeedUser;
  user_id?: ApiId;
  username?: string;
  name?: string;
  avatar?: string | null;
  title?: string;
  message?: string;
  description?: string;
  macros?: ApiMacroSummary | null;
  points?: number | null;
  createdAt?: string;
  created_at?: string;
  reactions?: ApiReaction[];
  commentsCount?: number;
  comments_count?: number;
};

export type ApiRankingUser = {
  position?: number;
  userId?: ApiId;
  user_id?: ApiId;
  name?: string;
  username?: string;
  avatar?: ApiAvatar | string | null;
  points?: number;
  total_checkins?: number;
  streak?: number;
  medals?: ApiMedal[];
  medal?: ApiMedal | null;
  isCurrentUser?: boolean;
  is_current_user?: boolean;
};

export type ApiRanking = {
  groupId?: ApiId;
  group_id?: ApiId;
  period?: string;
  entries?: ApiRankingUser[];
  ranking?: ApiRankingUser[];
};

export type ApiGroup = {
  id?: ApiId;
  _id?: ApiId;
  group_id?: ApiId;
  name?: string;
  description?: string;
  inviteCode?: string;
  invite_code?: string;
  membersCount?: number;
  members_count?: number;
  currentChallenge?: string;
  current_challenge?: string;
  startsAt?: string;
  starts_at?: string;
  endsAt?: string;
  ends_at?: string;
  rankingPosition?: number;
  ranking_position?: number;
  points?: number;
  streak?: number;
  weeklyGoal?: string;
  weekly_goal?: string;
  lastActivity?: string;
  last_activity?: string;
  role?: "owner" | "admin" | "member";
  badges_unlocked?: ApiBadge[];
};

export type ApiChatMessage = {
  id?: ApiId;
  _id?: ApiId;
  groupId?: ApiId;
  group_id?: ApiId;
  userId?: ApiId;
  user_id?: ApiId;
  authorName?: string;
  author_name?: string;
  message?: string;
  text?: string;
  createdAt?: string;
  created_at?: string;
  type?: "user" | "system";
  sender_type?: "user" | "bot";
};

export type ApiHomeResponse = {
  date?: string;
  targets?: ApiMacroSummary;
  consumed?: ApiMacroSummary;
  remaining?: ApiMacroSummary;
  progress_percent?: ApiMacroSummary;
  checkins?: ApiCheckInResult[];
  profile?: ApiUser;
  weekly_performance?: unknown;
  groups?: ApiGroup[];
  selected_group_id?: ApiId | null;
  group_ranking?: ApiRankingUser[];
  achievements?: {
    badges?: ApiBadge[];
    ranking_medals?: ApiMedal[];
  };
  notifications?: ApiNotificationsSummary;
};

export type ApiAchievementSummary = {
  user_id?: ApiId;
  badges?: ApiBadge[];
  ranking_medals?: ApiMedal[];
};

export type ApiNotification = {
  id?: ApiId;
  _id?: ApiId;
  notification_id?: ApiId;
  type?: string;
  title?: string;
  message?: string;
  read?: boolean;
  created_at?: string;
  read_at?: string | null;
};

export type ApiNotificationsSummary = {
  unread_count?: number;
  latest?: ApiNotification[];
  notifications?: ApiNotification[];
};
