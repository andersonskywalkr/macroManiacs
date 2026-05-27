import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapCheckInResult, unwrap } from "@/api/mappers";
import type { ApiCheckInResult, ApiEnvelope } from "@/api/dtos";
import { api } from "@/lib/api";
import { mockCheckInResult } from "@/mocks/checkin.mock";
import { useDemoStore } from "@/store/demo.store";
import type { CheckInResult } from "@/types/checkin";
import type { MacroSummary } from "@/types/macros";

export type ManualCheckInPayload = {
  title: string;
  macros: MacroSummary;
};

export type PhotoCheckInPayload = {
  fileUri?: string;
  fileName?: string;
  mimeType?: string;
};

export type PlannedMealCheckInPayload = {
  mealId?: string;
};

export type BarcodeCheckInPayload = {
  barcode?: string;
  servingSize?: number;
};

const mockCheckInService = {
  getLastResult: async (): Promise<CheckInResult> => useDemoStore.getState().lastCheckIn,
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
    useDemoStore.getState().addCheckIn("photo", "Rafael registrou foto do prato.", {
      calories: 520,
      protein: 35,
      carbs: 58,
      fat: 14,
    }),
  confirmManual: async (payload?: ManualCheckInPayload): Promise<CheckInResult> =>
    useDemoStore.getState().addCheckIn(
      "manual",
      payload?.title ?? "Rafael registrou check-in manual.",
      payload?.macros ?? {
        calories: 600,
        protein: 40,
        carbs: 70,
        fat: 15,
      },
    ),
};

const apiCheckInService = {
  getLastResult: async (): Promise<CheckInResult> => mockCheckInResult,
  confirmBarcode: async (payload?: BarcodeCheckInPayload): Promise<CheckInResult> => {
    const response = await api.post<ApiEnvelope<ApiCheckInResult>>(
      endpoints.checkins.barcode,
      payload,
    );
    return mapCheckInResult(unwrap(response.data));
  },
  confirmPlannedMeal: async (payload?: PlannedMealCheckInPayload): Promise<CheckInResult> => {
    const response = await api.post<ApiEnvelope<ApiCheckInResult>>(
      endpoints.checkins.plannedMeal,
      payload,
    );
    return mapCheckInResult(unwrap(response.data));
  },
  confirmPhoto: async (payload?: PhotoCheckInPayload): Promise<CheckInResult> => {
    if (payload?.fileUri) {
      const formData = new FormData();
      formData.append("file", {
        uri: payload.fileUri,
        name: payload.fileName ?? "plate-photo.jpg",
        type: payload.mimeType ?? "image/jpeg",
      } as unknown as Blob);
      const response = await api.post<ApiEnvelope<ApiCheckInResult>>(
        endpoints.checkins.photo,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      return mapCheckInResult(unwrap(response.data));
    }

    const response = await api.post<ApiEnvelope<ApiCheckInResult>>(endpoints.checkins.photo);
    return mapCheckInResult(unwrap(response.data));
  },
  confirmManual: async (payload?: ManualCheckInPayload): Promise<CheckInResult> => {
    const response = await api.post<ApiEnvelope<ApiCheckInResult>>(
      endpoints.checkins.manual,
      payload,
    );
    return mapCheckInResult(unwrap(response.data));
  },
};

export const checkInService = USE_MOCKS ? mockCheckInService : apiCheckInService;
