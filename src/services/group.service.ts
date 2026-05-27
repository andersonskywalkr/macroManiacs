import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapGroup, unwrap } from "@/api/mappers";
import type { ApiEnvelope, ApiGroup } from "@/api/dtos";
import { api } from "@/lib/api";
import { mockGroup } from "@/mocks/group.mock";
import type { Group } from "@/types/group";

const mockGroupService = {
  getCurrentGroup: async (): Promise<Group> => mockGroup,
  createGroup: async (): Promise<Group> => mockGroup,
  joinGroup: async (_inviteCode: string): Promise<Group> => mockGroup,
};

const apiGroupService = {
  getCurrentGroup: async (): Promise<Group> => {
    const response = await api.get<ApiEnvelope<ApiGroup>>(endpoints.groups.current);
    return mapGroup(unwrap(response.data));
  },
  createGroup: async (): Promise<Group> => {
    const response = await api.post<ApiEnvelope<ApiGroup>>(endpoints.groups.create);
    return mapGroup(unwrap(response.data));
  },
  joinGroup: async (inviteCode: string): Promise<Group> => {
    const response = await api.post<ApiEnvelope<ApiGroup>>(endpoints.groups.join, {
      inviteCode,
    });
    return mapGroup(unwrap(response.data));
  },
};

export const groupService = USE_MOCKS ? mockGroupService : apiGroupService;
