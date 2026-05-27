import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapDailyMacros, unwrap } from "@/api/mappers";
import type { ApiDailyMacros, ApiEnvelope } from "@/api/dtos";
import type { DailyMacros } from "@/types/macros";
import { api } from "@/lib/api";
import { useDemoStore } from "@/store/demo.store";

const mockHomeService = {
  getDailyMacros: async (): Promise<DailyMacros> => useDemoStore.getState().dailyMacros,
};

const apiHomeService = {
  getDailyMacros: async (): Promise<DailyMacros> => {
    const response = await api.get<ApiEnvelope<ApiDailyMacros>>(endpoints.home.macrosToday);
    return mapDailyMacros(unwrap(response.data));
  },
};

export const homeService = USE_MOCKS ? mockHomeService : apiHomeService;
