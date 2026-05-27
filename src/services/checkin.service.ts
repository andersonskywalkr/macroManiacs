import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapCheckInResult, mapDailyMacrosFromSummary, toApiMacros } from "@/api/mappers";
import type { ApiCheckInResult, ApiHomeResponse } from "@/api/dtos";
import { apiGet, apiPost } from "@/lib/api";
import { mockCheckInResult } from "@/mocks/checkin.mock";
import { getCurrentUserId } from "@/services/session.service";
import { useDemoStore } from "@/store/demo.store";
import type { CheckInResult } from "@/types/checkin";
import type { MacroSummary } from "@/types/macros";

export type ManualCheckInPayload = {
  title: string;
  macros: MacroSummary;
  consumedOn?: string;
};

export type PhotoCheckInPayload = {
  description?: string;
  consumedOn?: string;
};

export type PlannedMealCheckInPayload = {
  dietId?: string;
  day?: number;
  mealName?: string;
};

export type BarcodeCheckInPayload = {
  barcode?: string;
  servingSize?: number;
  quantityG?: number;
};

export type RepeatCheckInPayload = {
  checkinId: string;
};

let latestCheckInResult: CheckInResult | null = null;

const mockCheckInService = {
  getLastResult: async (): Promise<CheckInResult> =>
    latestCheckInResult ?? useDemoStore.getState().lastCheckIn,
  getTodayCheckins: async (): Promise<ApiHomeResponse> => ({
    targets: {},
    consumed: {},
    remaining: {},
    progress_percent: {},
    checkins: [],
  }),
  getRecentCheckins: async (): Promise<ApiCheckInResult[]> => [],
  getCheckinHistory: async (): Promise<ApiCheckInResult[]> => [],
  confirmBarcode: async (_payload?: BarcodeCheckInPayload): Promise<CheckInResult> =>
    useDemoStore.getState().addCheckIn("barcode", "Rafael escaneou um produto.", {
      calories: 146,
      protein: 18,
      carbs: 9,
      fat: 3,
    }),
  confirmPlannedMeal: async (_payload?: PlannedMealCheckInPayload): Promise<CheckInResult> =>
    useDemoStore.getState().addCheckIn("planned_meal", "Rafael registrou o almoco.", {
      calories: 680,
      protein: 48,
      carbs: 82,
      fat: 16,
    }),
  confirmPhoto: async (_payload?: PhotoCheckInPayload): Promise<CheckInResult> =>
    useDemoStore.getState().addCheckIn("manual_text", "Rafael descreveu uma refeicao.", {
      calories: 520,
      protein: 35,
      carbs: 58,
      fat: 14,
    }),
  confirmManual: async (payload?: ManualCheckInPayload): Promise<CheckInResult> =>
    useDemoStore.getState().addCheckIn(
      "manual_macros",
      payload?.title ?? "Rafael registrou check-in manual.",
      payload?.macros ?? {
        calories: 600,
        protein: 40,
        carbs: 70,
        fat: 15,
      },
    ),
  repeatCheckin: async (_payload?: RepeatCheckInPayload): Promise<CheckInResult> =>
    useDemoStore.getState().addCheckIn("manual_macros", "Rafael repetiu uma refeicao.", {
      calories: 520,
      protein: 35,
      carbs: 58,
      fat: 14,
    }),
};

async function hydrateDailyMacros(result: CheckInResult, userId: string): Promise<CheckInResult> {
  try {
    const summary = await apiGet<ApiHomeResponse>(endpoints.checkins.today(userId));
    return {
      ...result,
      dailyMacros: mapDailyMacrosFromSummary({
        targets: summary.targets,
        consumed: summary.consumed,
        remaining: summary.remaining,
        progress: summary.progress_percent,
      }),
    };
  } catch {
    return result;
  }
}

async function createCheckIn(body: Record<string, unknown>): Promise<CheckInResult> {
  const userId = (body.user_id as string | undefined) ?? (await getCurrentUserId());
  const data = await apiPost<ApiCheckInResult>(endpoints.checkins.create, {
    ...body,
    user_id: userId,
  });
  latestCheckInResult = await hydrateDailyMacros(mapCheckInResult(data), userId);
  return latestCheckInResult;
}

const apiCheckInService = {
  getLastResult: async (): Promise<CheckInResult> => latestCheckInResult ?? mockCheckInResult,
  createCheckin: createCheckIn,
  getTodayCheckins: async (date?: string): Promise<ApiHomeResponse> => {
    const userId = await getCurrentUserId();
    const query = date ? `?date=${encodeURIComponent(date)}` : "";
    return apiGet<ApiHomeResponse>(`${endpoints.checkins.today(userId)}${query}`);
  },
  getRecentCheckins: async (limit = 10): Promise<ApiCheckInResult[]> => {
    const userId = await getCurrentUserId();
    return apiGet<ApiCheckInResult[]>(
      `${endpoints.checkins.recent(userId)}?limit=${limit}`,
    );
  },
  getCheckinHistory: async (date?: string): Promise<ApiCheckInResult[]> => {
    const userId = await getCurrentUserId();
    const query = date ? `?date=${encodeURIComponent(date)}` : "";
    return apiGet<ApiCheckInResult[]>(`${endpoints.checkins.history(userId)}${query}`);
  },
  confirmBarcode: async (payload?: BarcodeCheckInPayload): Promise<CheckInResult> =>
    createCheckIn({
      type: "barcode",
      barcode: payload?.barcode,
      quantity_g: payload?.quantityG ?? payload?.servingSize ?? 100,
    }),
  confirmPlannedMeal: async (payload?: PlannedMealCheckInPayload): Promise<CheckInResult> =>
    createCheckIn({
      type: "planned_meal",
      diet_id: payload?.dietId,
      day: payload?.day ?? 1,
      meal_name: payload?.mealName,
    }),
  confirmPhoto: async (payload?: PhotoCheckInPayload): Promise<CheckInResult> =>
    createCheckIn({
      type: "manual_text",
      description: payload?.description ?? "Refeicao descrita pelo usuario.",
      consumed_on: payload?.consumedOn,
    }),
  confirmManual: async (payload?: ManualCheckInPayload): Promise<CheckInResult> =>
    createCheckIn({
      type: "manual_macros",
      name: payload?.title,
      macros: toApiMacros(payload?.macros),
      consumed_on: payload?.consumedOn,
    }),
  repeatCheckin: async (payload: RepeatCheckInPayload): Promise<CheckInResult> =>
    createCheckIn({
      type: "repeat_checkin",
      checkin_id: payload.checkinId,
    }),
};

export const checkInService = USE_MOCKS ? mockCheckInService : apiCheckInService;
