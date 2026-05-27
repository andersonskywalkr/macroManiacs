import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapDietDraft, mapDietPlan, toApiMacros } from "@/api/mappers";
import type { ApiDietDraft, ApiDietPlan } from "@/api/dtos";
import { AppError } from "@/api/errors";
import { apiGet, apiPost } from "@/lib/api";
import { mockDietDraft, mockDietPlan } from "@/mocks/diet.mock";
import { getCurrentUserId } from "@/services/session.service";
import type { DietDraft, DietPlan } from "@/types/diet";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let latestDraft: DietDraft | null = null;

export type DietScanPayload = {
  sourceType: "pdf" | "image" | "text" | "manual";
  text?: string;
  fileUri?: string;
  fileName?: string;
  mimeType?: string;
  userId?: string;
};

export type ManualDietPayload = {
  userId?: string;
  dailyTargets: DietDraft["dailyTargets"];
  days: DietDraft["days"];
};

function dietDayToApi(day: DietDraft["days"][number]) {
  return {
    day: day.day,
    daily_targets: toApiMacros(day.dailyTargets),
    meals: day.meals.map((meal) => ({
      name: meal.name,
      time: meal.time,
      meal_totals: toApiMacros(meal.macros),
      items: meal.items.map((item) => ({
        food: item.food,
        quantity: item.quantity,
        estimated_macros: item.macros ? toApiMacros(item.macros) : null,
      })),
    })),
  };
}

function buildConfirmPayload(draft: DietDraft, userId: string) {
  const days =
    draft.days.length > 0
      ? draft.days
      : [{ day: 1, dailyTargets: draft.dailyTargets, meals: draft.meals }];

  return {
    diet_id: draft.id,
    user_id: userId,
    daily_targets: toApiMacros(draft.dailyTargets),
    days: days.map(dietDayToApi),
  };
}

const mockDietService = {
  scanDiet: async (_payload?: DietScanPayload): Promise<DietDraft> => {
    await wait(700);
    latestDraft = mockDietDraft;
    return mockDietDraft;
  },
  extractDiet: async (_payload?: DietScanPayload): Promise<DietDraft> => {
    latestDraft = mockDietDraft;
    return mockDietDraft;
  },
  createManualDiet: async (_payload: ManualDietPayload): Promise<DietDraft> => {
    latestDraft = mockDietDraft;
    return mockDietDraft;
  },
  getDraft: async (): Promise<DietDraft> => latestDraft ?? mockDietDraft,
  getActiveDiet: async (): Promise<DietPlan> => mockDietPlan,
  confirmDiet: async (): Promise<DietPlan> => mockDietPlan,
};

const apiDietService = {
  scanDiet: async (payload?: DietScanPayload): Promise<DietDraft> =>
    apiDietService.extractDiet(payload),
  extractDiet: async (payload?: DietScanPayload): Promise<DietDraft> => {
    const userId = payload?.userId ?? (await getCurrentUserId());
    if (!payload?.fileUri) {
      throw new AppError(
        "Selecione um arquivo de dieta para enviar.",
        "validation_error",
        400,
        { todo: "Texto livre de dieta pode usar POST /diet com formulario manual." },
      );
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("file", {
      uri: payload.fileUri,
      name: payload.fileName ?? "diet-upload",
      type: payload.mimeType ?? "application/octet-stream",
    } as unknown as Blob);

    const data = await apiPost<ApiDietDraft>(endpoints.diet.extract, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 90000,
    });
    latestDraft = mapDietDraft(data);
    return latestDraft;
  },
  createManualDiet: async (payload: ManualDietPayload): Promise<DietDraft> => {
    const userId = payload.userId ?? (await getCurrentUserId());
    const data = await apiPost<ApiDietDraft>(endpoints.diet.create, {
      user_id: userId,
      daily_targets: toApiMacros(payload.dailyTargets),
      days: payload.days.map(dietDayToApi),
    });
    latestDraft = mapDietDraft(data);
    return latestDraft;
  },
  getDraft: async (): Promise<DietDraft> => {
    if (!latestDraft) {
      throw new AppError(
        "Nenhuma dieta pendente para revisar.",
        "not_found",
        404,
        { todo: "O backend nao possui GET de rascunho pendente; o app guarda o ultimo upload em memoria." },
      );
    }

    return latestDraft;
  },
  getActiveDiet: async (userId?: string): Promise<DietPlan> => {
    const safeUserId = userId ?? (await getCurrentUserId());
    const data = await apiGet<ApiDietPlan>(endpoints.diet.active(safeUserId));
    return mapDietPlan(data);
  },
  confirmDiet: async (draft?: DietDraft): Promise<DietPlan> => {
    const currentDraft = draft ?? latestDraft;
    if (!currentDraft) {
      throw new AppError("Nenhuma dieta pendente para confirmar.", "not_found", 404);
    }
    const userId = currentDraft.userId ?? (await getCurrentUserId());
    const data = await apiPost<ApiDietPlan>(
      endpoints.diet.confirm,
      buildConfirmPayload(currentDraft, userId),
    );
    const plan = mapDietPlan(data);
    latestDraft = plan;
    return plan;
  },
};

export const dietService = USE_MOCKS ? mockDietService : apiDietService;
