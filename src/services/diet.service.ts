import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapDietDraft, mapDietPlan, unwrap } from "@/api/mappers";
import type { ApiDietDraft, ApiDietPlan, ApiEnvelope } from "@/api/dtos";
import { api } from "@/lib/api";
import { mockDietDraft, mockDietPlan } from "@/mocks/diet.mock";
import type { DietDraft, DietPlan } from "@/types/diet";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type DietScanPayload = {
  sourceType: "pdf" | "image" | "text" | "manual";
  text?: string;
  fileUri?: string;
  fileName?: string;
  mimeType?: string;
};

const mockDietService = {
  scanDiet: async (_payload?: DietScanPayload): Promise<DietDraft> => {
    await wait(700);
    return mockDietDraft;
  },
  getDraft: async (): Promise<DietDraft> => mockDietDraft,
  getActiveDiet: async (): Promise<DietPlan> => mockDietPlan,
  confirmDiet: async (): Promise<DietPlan> => mockDietPlan,
};

const apiDietService = {
  scanDiet: async (payload?: DietScanPayload): Promise<DietDraft> => {
    if (payload?.fileUri) {
      const formData = new FormData();
      formData.append("source_type", payload.sourceType);
      formData.append("file", {
        uri: payload.fileUri,
        name: payload.fileName ?? "diet-upload",
        type: payload.mimeType ?? "application/octet-stream",
      } as unknown as Blob);
      if (payload.text) {
        formData.append("text", payload.text);
      }
      const response = await api.post<ApiEnvelope<ApiDietDraft>>(endpoints.diet.scan, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return mapDietDraft(unwrap(response.data));
    }

    const response = await api.post<ApiEnvelope<ApiDietDraft>>(endpoints.diet.scan, {
      sourceType: payload?.sourceType ?? "text",
      source_type: payload?.sourceType ?? "text",
      text: payload?.text,
    });
    return mapDietDraft(unwrap(response.data));
  },
  getDraft: async (): Promise<DietDraft> => {
    const response = await api.get<ApiEnvelope<ApiDietDraft>>(endpoints.diet.active);
    return mapDietDraft(unwrap(response.data));
  },
  getActiveDiet: async (): Promise<DietPlan> => {
    const response = await api.get<ApiEnvelope<ApiDietPlan>>(endpoints.diet.active);
    return mapDietPlan(unwrap(response.data));
  },
  confirmDiet: async (): Promise<DietPlan> => {
    const response = await api.post<ApiEnvelope<ApiDietPlan>>(endpoints.diet.confirm);
    return mapDietPlan(unwrap(response.data));
  },
};

export const dietService = USE_MOCKS ? mockDietService : apiDietService;
