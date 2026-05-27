import { AppError } from "./errors";
import type {
  ApiAvatar,
  ApiBadge,
  ApiChatMessage,
  ApiCheckInResult,
  ApiDailyMacros,
  ApiDietDay,
  ApiDietDraft,
  ApiDietMeal,
  ApiDietMealItem,
  ApiDietPlan,
  ApiEnvelope,
  ApiFeedPost,
  ApiGroup,
  ApiMacroSummary,
  ApiMacroValue,
  ApiMedal,
  ApiNotification,
  ApiProduct,
  ApiRanking,
  ApiRankingUser,
  ApiReaction,
  ApiUser,
} from "./dtos";
import type { Badge, Medal } from "@/types/achievements";
import type { Avatar } from "@/types/avatar";
import type { ChatMessage } from "@/types/chat";
import type { CheckInResult } from "@/types/checkin";
import type { DietDay, DietDraft, DietMeal, DietMealItem, DietPlan } from "@/types/diet";
import type { FeedPost, FeedPostType, Reaction } from "@/types/feed";
import type { Group } from "@/types/group";
import type { DailyMacros, MacroSummary, MacroValue } from "@/types/macros";
import type { Notification } from "@/types/notification";
import type { Product } from "@/types/product";
import type { Ranking, RankingUser } from "@/types/ranking";
import type { User } from "@/types/user";

export function unwrap<T>(payload: ApiEnvelope<T>): T {
  if (
    payload &&
    typeof payload === "object" &&
    "success" in payload &&
    payload.success === false
  ) {
    throw new AppError(
      payload.message ?? "Nao foi possivel concluir a acao.",
      "validation_error",
      undefined,
      payload.details,
    );
  }

  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }

  return payload as T;
}

const idOf = (value?: {
  id?: string;
  _id?: string;
  user_id?: string;
  diet_id?: string;
  group_id?: string;
  checkin_id?: string;
  notification_id?: string;
  code?: string;
}) =>
  value?.id ??
  value?._id ??
  value?.user_id ??
  value?.diet_id ??
  value?.group_id ??
  value?.checkin_id ??
  value?.notification_id ??
  value?.code ??
  "";

const badgeLabels: Record<string, { name: string; description: string; icon: string }> = {
  first_checkin: {
    name: "Primeiro check-in",
    description: "Primeira refeicao registrada no MacroManiacs.",
    icon: "check",
  },
  barcode_beast: {
    name: "Barcode Beast",
    description: "Primeiro produto escaneado por codigo de barras.",
    icon: "barcode",
  },
  protein_demon: {
    name: "Protein Demon",
    description: "Primeiro check-in com pelo menos 20g de proteina.",
    icon: "protein",
  },
  diet_uploaded: {
    name: "Dieta enviada",
    description: "Primeira dieta enviada para extracao.",
    icon: "upload",
  },
  diet_confirmed: {
    name: "Dieta confirmada",
    description: "Primeiro plano alimentar confirmado.",
    icon: "diet",
  },
  group_joiner: {
    name: "Entrou no grupo",
    description: "Primeira entrada em um grupo.",
    icon: "group",
  },
};

function makeDefaultAvatar(userId = "", avatarUrl?: string | null): Avatar {
  return {
    id: avatarUrl ?? userId,
    userId,
    skinTone: "purple",
    hairStyle: "default",
    hairColor: "dark",
    expression: "confident",
    outfit: "training",
    accessory: avatarUrl ?? null,
    background: "dark",
    equippedMedals: [],
  };
}

export function mapUser(value: ApiUser = {}): User {
  return {
    id: idOf(value),
    name: value.name ?? "",
    username: value.username ?? "",
    email: value.email,
    avatar: value.avatar ?? null,
    onboardingCompleted: value.onboardingCompleted ?? value.onboarding_completed ?? false,
  };
}

export function mapMedal(value: ApiMedal): Medal {
  const code = value.code ?? idOf(value);
  const level =
    code === "rank_gold"
      ? "gold"
      : code === "rank_silver"
        ? "silver"
        : code === "rank_bronze"
          ? "bronze"
          : value.level ?? "bronze";

  return {
    id: value.group_id ? `${code}-${value.group_id}` : code || idOf(value),
    name: value.name ?? (code ? code.replace(/_/g, " ") : ""),
    category: value.category ?? (code?.startsWith("rank_") ? "ranking" : "general"),
    level,
    rarity: value.rarity ?? (level === "gold" ? "rare" : "common"),
    description:
      value.group_name && value.position
        ? `${value.name ?? "Medalha"} no grupo ${value.group_name}`
        : value.description ?? "",
    visualSlot: value.visualSlot ?? value.visual_slot ?? "none",
    unlocked: value.unlocked ?? true,
    equipped: value.equipped ?? false,
  };
}

export function mapBadge(value: ApiBadge): Badge {
  const code = value.code ?? idOf(value);
  const known = code ? badgeLabels[code] : undefined;

  return {
    id: code || idOf(value),
    name: value.name ?? known?.name ?? code.replace(/_/g, " "),
    description: value.description ?? known?.description ?? "",
    icon: value.icon ?? known?.icon ?? "badge",
    unlocked: value.unlocked ?? true,
  };
}

export function mapAvatar(value?: ApiAvatar | string | null, fallbackUserId = ""): Avatar {
  if (!value || typeof value === "string") {
    return makeDefaultAvatar(fallbackUserId, value ?? null);
  }

  return {
    id: idOf(value),
    userId: value.userId ?? value.user_id ?? fallbackUserId,
    skinTone: value.skinTone ?? value.skin_tone ?? "purple",
    hairStyle: value.hairStyle ?? value.hair_style ?? "default",
    hairColor: value.hairColor ?? value.hair_color ?? "dark",
    expression: value.expression ?? "confident",
    outfit: value.outfit ?? "training",
    accessory: value.accessory ?? null,
    background: value.background ?? "dark",
    equippedMedals: (value.equippedMedals ?? value.equipped_medals ?? []).map(mapMedal),
  };
}

export function mapMacroSummary(value: ApiMacroSummary = {}): MacroSummary {
  return {
    calories: Math.round(value.calories ?? 0),
    protein: Math.round(value.protein ?? value.protein_g ?? 0),
    carbs: Math.round(value.carbs ?? value.carbs_g ?? 0),
    fat: Math.round(value.fat ?? value.fat_g ?? 0),
  };
}

export function toApiMacros(value: Partial<MacroSummary> = {}): ApiMacroSummary {
  return {
    calories: Number(value.calories) || 0,
    protein_g: Number(value.protein) || 0,
    carbs_g: Number(value.carbs) || 0,
    fat_g: Number(value.fat) || 0,
  };
}

export function mapMacroValue(value: ApiMacroValue = {}): MacroValue {
  const consumed = Math.round(value.consumed ?? 0);
  const target = Math.round(value.target ?? 0);
  return {
    consumed,
    target,
    remaining: Math.round(value.remaining ?? Math.max(0, target - consumed)),
    percentage: Math.round(value.percentage ?? (target ? (consumed / target) * 100 : 0)),
  };
}

export function mapDailyMacros(value: ApiDailyMacros = {}): DailyMacros {
  return {
    calories: mapMacroValue(value.calories),
    protein: mapMacroValue(value.protein),
    carbs: mapMacroValue(value.carbs),
    fat: mapMacroValue(value.fat),
    status: value.status ?? "empty_day",
  };
}

export function mapDailyMacrosFromSummary({
  targets = {},
  consumed = {},
  remaining = {},
  progress = {},
}: {
  targets?: ApiMacroSummary;
  consumed?: ApiMacroSummary;
  remaining?: ApiMacroSummary;
  progress?: ApiMacroSummary;
}): DailyMacros {
  const target = mapMacroSummary(targets);
  const eaten = mapMacroSummary(consumed);
  const left = mapMacroSummary(remaining);
  const percent = mapMacroSummary(progress);
  const macroValue = (key: keyof MacroSummary): MacroValue => ({
    consumed: eaten[key],
    target: target[key],
    remaining: left[key],
    percentage: percent[key],
  });
  const caloriesStatus =
    target.calories > 0 && eaten.calories >= target.calories ? "target_hit" : "in_progress";

  return {
    calories: macroValue("calories"),
    protein: macroValue("protein"),
    carbs: macroValue("carbs"),
    fat: macroValue("fat"),
    status: target.calories > 0 ? caloriesStatus : "empty_day",
  };
}

export function mapDietMealItem(value: ApiDietMealItem): DietMealItem {
  return {
    id: idOf(value) || value.food || value.quantity || "",
    food: value.food ?? "",
    quantity: value.quantity ?? "",
    macros: value.estimated_macros
      ? mapMacroSummary(value.estimated_macros)
      : value.macros
        ? mapMacroSummary(value.macros)
        : null,
  };
}

export function mapDietMeal(value: ApiDietMeal): DietMeal {
  return {
    id: idOf(value) || `${value.name ?? "meal"}-${value.time ?? ""}`,
    name: value.name ?? "",
    time: value.time ?? null,
    items: (value.items ?? []).map(mapDietMealItem),
    macros: mapMacroSummary(value.meal_totals ?? value.macros),
  };
}

export function mapDietDay(value: ApiDietDay): DietDay {
  return {
    day: value.day ?? 1,
    meals: (value.meals ?? []).map(mapDietMeal),
    dailyTargets: mapMacroSummary(value.daily_targets ?? value.dailyTargets),
  };
}

export function mapDietDraft(value: ApiDietDraft): DietDraft {
  const days = (value.days ?? []).map(mapDietDay);
  const firstDay = days[0];
  const meals = value.meals ? value.meals.map(mapDietMeal) : firstDay?.meals ?? [];
  const dailyTargets = mapMacroSummary(
    value.average_daily_targets ??
      value.dailyTargets ??
      value.daily_targets ??
      firstDay?.dailyTargets,
  );

  return {
    id: idOf(value),
    userId: value.user_id,
    dailyTargets,
    days,
    meals,
    status: value.status,
    activePlan: value.active_plan,
    confidence: value.confidence,
  };
}

export function mapDietPlan(value: ApiDietPlan): DietPlan {
  const draft = mapDietDraft(value);
  return {
    id: draft.id,
    userId: draft.userId,
    dailyTargets: draft.dailyTargets,
    days: draft.days,
    meals: draft.meals,
    status: draft.status,
    activePlan: draft.activePlan,
  };
}

export function mapProduct(value: ApiProduct): Product {
  const nutrition = value.nutrition_per_100g;
  return {
    barcode: value.barcode ?? "",
    name: value.name ?? "",
    brand: value.brand ?? null,
    imageUrl: value.imageUrl ?? value.image_url ?? null,
    servingSize: value.servingSize ?? value.serving_size ?? "100g",
    caloriesPer100g: value.caloriesPer100g ?? nutrition?.calories ?? null,
    proteinPer100g: value.proteinPer100g ?? nutrition?.protein ?? nutrition?.protein_g ?? null,
    carbsPer100g: value.carbsPer100g ?? nutrition?.carbs ?? nutrition?.carbs_g ?? null,
    fatPer100g: value.fatPer100g ?? nutrition?.fat ?? nutrition?.fat_g ?? null,
    source: value.source ?? "open_food_facts",
    status: value.status,
  };
}

const emptyDailyMacros = (): DailyMacros =>
  mapDailyMacrosFromSummary({
    targets: {},
    consumed: {},
    remaining: {},
    progress: {},
  });

export function mapCheckInResult(value: ApiCheckInResult): CheckInResult {
  return {
    checkInId: value.checkInId ?? value.checkin_id ?? value.check_in_id ?? "",
    pointsEarned: value.pointsEarned ?? value.points_earned ?? value.points ?? 0,
    macrosAdded: mapMacroSummary(value.macrosAdded ?? value.macros_added ?? value.macros),
    dailyMacros: value.dailyMacros
      ? mapDailyMacros(value.dailyMacros)
      : value.daily_macros
        ? mapDailyMacros(value.daily_macros)
        : emptyDailyMacros(),
    rankingPosition: value.rankingPosition ?? value.ranking_position ?? null,
    unlockedBadges: (
      value.unlockedBadges ??
      value.unlocked_badges ??
      value.badges_unlocked ??
      []
    ).map(mapBadge),
    unlockedMedals: (value.unlockedMedals ?? value.unlocked_medals ?? []).map(mapMedal),
  };
}

export function mapReaction(value: ApiReaction): Reaction {
  return {
    type: value.type ?? "",
    count: value.count ?? 0,
    reactedByMe: value.reactedByMe ?? value.reacted_by_me ?? false,
  };
}

const feedPostTypes: FeedPostType[] = [
  "check_in",
  "product_scan",
  "streak",
  "ranking_change",
  "medal_unlocked",
  "macro_complete",
  "alert",
];

export function mapFeedPost(value: ApiFeedPost): FeedPost {
  const type = feedPostTypes.includes(value.type as FeedPostType)
    ? (value.type as FeedPostType)
    : "alert";
  const user = value.user ? mapUser(value.user) : mapUser(value);
  const description = value.description ?? value.message ?? "";

  return {
    id: idOf(value) || value.activity_id || `${value.created_at ?? ""}-${description}`,
    type,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      avatar: value.user?.avatar ? mapAvatar(value.user.avatar, user.id) : mapAvatar(value.avatar, user.id),
    },
    title: value.title ?? user.name ?? "Atividade",
    description,
    macros: value.macros ? mapMacroSummary(value.macros) : null,
    points: value.points ?? null,
    createdAt: value.createdAt ?? value.created_at ?? "",
    reactions: (value.reactions ?? []).map(mapReaction),
    commentsCount: value.commentsCount ?? value.comments_count ?? 0,
  };
}

export function mapRankingUser(value: ApiRankingUser, currentUserId?: string): RankingUser {
  const userId = value.userId ?? value.user_id ?? "";
  const medals = value.medal ? [mapMedal(value.medal)] : (value.medals ?? []).map(mapMedal);

  return {
    position: value.position ?? 0,
    userId,
    name: value.name ?? "",
    username: value.username ?? "",
    avatar: mapAvatar(value.avatar, userId),
    points: value.points ?? 0,
    totalCheckins: value.total_checkins ?? 0,
    streak: value.streak ?? value.total_checkins ?? 0,
    medals,
    isCurrentUser: value.isCurrentUser ?? value.is_current_user ?? userId === currentUserId,
  };
}

export function mapRanking(value: ApiRanking | ApiRankingUser[], currentUserId?: string): Ranking {
  if (Array.isArray(value)) {
    return {
      groupId: "",
      period: "week",
      entries: value.map((entry) => mapRankingUser(entry, currentUserId)),
    };
  }

  const entries = value.entries ?? value.ranking ?? [];
  return {
    groupId: value.groupId ?? value.group_id ?? "",
    period: value.period ?? "week",
    entries: entries.map((entry) => mapRankingUser(entry, currentUserId)),
  };
}

export function mapGroup(value: ApiGroup): Group {
  return {
    id: idOf(value),
    name: value.name ?? "",
    inviteCode: value.inviteCode ?? value.invite_code ?? "",
    membersCount: value.membersCount ?? value.members_count ?? 0,
    currentChallenge: value.currentChallenge ?? value.current_challenge ?? value.description ?? "",
    startsAt: value.startsAt ?? value.starts_at,
    endsAt: value.endsAt ?? value.ends_at,
    rankingPosition: value.rankingPosition ?? value.ranking_position,
    points: value.points,
    streak: value.streak,
    weeklyGoal: value.weeklyGoal ?? value.weekly_goal,
    lastActivity: value.lastActivity ?? value.last_activity,
    role: value.role,
  };
}

export function mapChatMessage(value: ApiChatMessage): ChatMessage {
  return {
    id: idOf(value),
    groupId: value.groupId ?? value.group_id ?? "",
    userId: value.userId ?? value.user_id,
    authorName: value.authorName ?? value.author_name ?? "MacroBot",
    message: value.message ?? value.text ?? "",
    createdAt: value.createdAt ?? value.created_at ?? "",
    type: value.type ?? (value.sender_type === "bot" ? "system" : "user"),
  };
}

export function mapNotification(value: ApiNotification): Notification {
  return {
    id: idOf(value),
    type: value.type ?? "badge",
    title: value.title ?? "",
    message: value.message ?? "",
    read: value.read ?? false,
    createdAt: value.created_at ?? "",
    readAt: value.read_at ?? null,
  };
}
