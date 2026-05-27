import { endpoints } from "@/api/endpoints";
import { apiGet } from "@/lib/api";

export const healthService = {
  check: async () => apiGet<unknown>(endpoints.health),
};
