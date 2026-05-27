import type {
  ApiAvatar,
  ApiBadge,
  ApiChatMessage,
  ApiCheckInResult,
  ApiDailyMacros,
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
import type { DietDraft, DietMeal, DietMealItem, DietPlan } from "@/types/diet";
import type { FeedPost, FeedPostType, Reaction } from "@/types/feed";
import type { Group } from "@/types/group";
import type { DailyMacros, MacroSummary, MacroValue } from "@/types/macros";
import type { Product } from "@/types/product";
import type { Ranking, RankingUser } from "@/types/ranking";
import type { User } from "@/types/user";

export function unwrap<T>(payload: ApiEnvelope<T>): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }
  return payload;
}

const idOf = (value?: { id?: string; _id?: string }) => value?.id ?? value?._id ?? "";

export function mapUser(value: ApiUser): User {
  return {
    id: idOf(value),
    name: value.name ?? "",
    username: value.username ?? "",
    email: value.email,
    onboardingCompleted: value.onboardingCompleted ?? value.onboarding_completed ?? false,
  };
}

export function mapMedal(value: ApiMedal): Medal {
  return {
    id: idOf(value),
    name: value.name ?? "",
    category: value.category ?? "general",
    level: value.level ?? "bronze",
    rarity: value.rarity ?? "common",
    description: value.description ?? "",
    visualSlot: value.visualSlot ?? value.visual_slot ?? "none",
    unlocked: value.unlocked ?? false,
    equipped: value.equipped ?? false,
  };
}

export function mapBadge(value: ApiBadge): Badge {
  return {
    id: idOf(value),
    name: value.name ?? "",
    description: value.description ?? "",
    icon: value.icon ?? "badge",
    unlocked: value.unlocked ?? false,
  };
}

export function mapAvatar(value: ApiAvatar): Avatar {
  return {
    id: idOf(value),
    userId: value.userId ?? value.user_id ?? "",
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
    calories: value.calories ?? 0,
    protein: value.protein ?? 0,
    carbs: value.carbs ?? 0,
    fat: value.fat ?? 0,
  };
}

export function mapMacroValue(value: ApiMacroValue = {}): MacroValue {
  const consumed = value.consumed ?? 0;
  const target = value.target ?? 0;
  return {
    consumed,
    target,
    remaining: value.remaining ?? Math.max(0, target - consumed),
    percentage: value.percentage ?? (target ? Math.round((consumed / target) * 100) : 0),
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

export function mapDietMealItem(value: ApiDietMealItem): DietMealItem {
  return {
    id: idOf(value),
    food: value.food ?? "",
    quantity: value.quantity ?? "",
    macros: value.macros ? mapMacroSummary(value.macros) : null,
  };
}

export function mapDietMeal(value: ApiDietMeal): DietMeal {
  return {
    id: idOf(value),
    name: value.name ?? "",
    time: value.time ?? null,
    items: (value.items ?? []).map(mapDietMealItem),
    macros: mapMacroSummary(value.macros),
  };
}

export function mapDietDraft(value: ApiDietDraft): DietDraft {
  return {
    id: idOf(value),
    dailyTargets: mapMacroSummary(value.dailyTargets ?? value.daily_targets),
    meals: (value.meals ?? []).map(mapDietMeal),
    confidence: value.confidence,
  };
}

export function mapDietPlan(value: ApiDietPlan): DietPlan {
  return {
    id: idOf(value),
    dailyTargets: mapMacroSummary(value.dailyTargets ?? value.daily_targets),
    meals: (value.meals ?? []).map(mapDietMeal),
  };
}

export function mapProduct(value: ApiProduct): Product {
  const nutrition = value.nutrition_per_100g;
  return {
    barcode: value.barcode ?? "",
    name: value.name ?? "",
    brand: value.brand ?? null,
    imageUrl: value.imageUrl ?? value.image_url ?? null,
    servingSize: value.servingSize ?? value.serving_size ?? null,
    caloriesPer100g: value.caloriesPer100g ?? nutrition?.calories ?? null,
    proteinPer100g: value.proteinPer100g ?? nutrition?.protein ?? null,
    carbsPer100g: value.carbsPer100g ?? nutrition?.carbs ?? null,
    fatPer100g: value.fatPer100g ?? nutrition?.fat ?? null,
    source: value.source ?? "manual",
    status: value.status,
  };
}

export function mapCheckInResult(value: ApiCheckInResult): CheckInResult {
  return {
    checkInId: value.checkInId ?? value.checkin_id ?? value.check_in_id ?? "",
    pointsEarned: value.pointsEarned ?? value.points_earned ?? 0,
    macrosAdded: mapMacroSummary(value.macrosAdded ?? value.macros_added),
    dailyMacros: mapDailyMacros(value.dailyMacros ?? value.daily_macros),
    rankingPosition: value.rankingPosition ?? value.ranking_position ?? null,
    unlockedBadges: (value.unlockedBadges ?? value.unlocked_badges ?? []).map(mapBadge),
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
  return {
    id: idOf(value),
    type,
    user: value.user
      ? {
          ...mapUser(value.user),
          avatar: value.user.avatar ? mapAvatar(value.user.avatar) : null,
        }
      : { id: "", name: "", username: "", avatar: null },
    title: value.title ?? "",
    description: value.description ?? "",
    macros: value.macros ? mapMacroSummary(value.macros) : null,
    points: value.points ?? null,
    createdAt: value.createdAt ?? value.created_at ?? "",
    reactions: (value.reactions ?? []).map(mapReaction),
    commentsCount: value.commentsCount ?? value.comments_count ?? 0,
  };
}

export function mapRankingUser(value: ApiRankingUser): RankingUser {
  return {
    position: value.position ?? 0,
    userId: value.userId ?? value.user_id ?? "",
    name: value.name ?? "",
    username: value.username ?? "",
    avatar: value.avatar ? mapAvatar(value.avatar) : null,
    points: value.points ?? 0,
    streak: value.streak ?? 0,
    medals: (value.medals ?? []).map(mapMedal),
    isCurrentUser: value.isCurrentUser ?? value.is_current_user ?? false,
  };
}

export function mapRanking(value: ApiRanking): Ranking {
  return {
    groupId: value.groupId ?? value.group_id ?? "",
    period: value.period ?? "week",
    entries: (value.entries ?? []).map(mapRankingUser),
  };
}

export function mapGroup(value: ApiGroup): Group {
  return {
    id: idOf(value),
    name: value.name ?? "",
    inviteCode: value.inviteCode ?? value.invite_code ?? "",
    membersCount: value.membersCount ?? value.members_count ?? 0,
    currentChallenge: value.currentChallenge ?? value.current_challenge ?? "",
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
