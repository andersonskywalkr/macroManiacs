import { USE_MOCKS } from "@/constants/config";
import { endpoints } from "@/api/endpoints";
import { mapGroup } from "@/api/mappers";
import type { ApiGroup } from "@/api/dtos";
import { AppError } from "@/api/errors";
import { apiGet, apiPost } from "@/lib/api";
import { mockGroup, mockGroups } from "@/mocks/group.mock";
import { getCurrentUserId } from "@/services/session.service";
import type { Group } from "@/types/group";

export type CreateGroupPayload = {
  name: string;
  description?: string;
  ownerId?: string;
};

const mockGroupService = {
  getGroups: async (): Promise<Group[]> => mockGroups,
  getCurrentGroup: async (): Promise<Group> => mockGroup,
  getById: async (groupId: string): Promise<Group> =>
    mockGroups.find((group) => group.id === groupId) ?? mockGroup,
  createGroup: async (_payload?: CreateGroupPayload): Promise<Group> => mockGroup,
  joinGroup: async (_inviteCode: string): Promise<Group> => mockGroup,
};

const apiGroupService = {
  getGroups: async (userId?: string): Promise<Group[]> => {
    const safeUserId = userId ?? (await getCurrentUserId());
    const response = await apiGet<ApiGroup[]>(endpoints.groups.user(safeUserId));
    return response.map(mapGroup);
  },
  getCurrentGroup: async (): Promise<Group> => {
    const groups = await apiGroupService.getGroups();
    const current = groups[0];
    if (!current) {
      throw new AppError("Voce ainda nao participa de grupos.", "not_found", 404);
    }
    return current;
  },
  getById: async (groupId: string): Promise<Group> => {
    const response = await apiGet<ApiGroup>(endpoints.groups.byId(groupId));
    return mapGroup(response);
  },
  createGroup: async (payload?: CreateGroupPayload): Promise<Group> => {
    const ownerId = payload?.ownerId ?? (await getCurrentUserId());
    const response = await apiPost<ApiGroup>(endpoints.groups.create, {
      name: payload?.name ?? "Macro Maniacs",
      description: payload?.description ?? "Grupo MacroManiacs",
      owner_id: ownerId,
    });
    return mapGroup(response);
  },
  joinGroup: async (inviteCode: string, userId?: string): Promise<Group> => {
    const safeUserId = userId ?? (await getCurrentUserId());
    const response = await apiPost<ApiGroup>(endpoints.groups.join, {
      user_id: safeUserId,
      invite_code: inviteCode,
    });
    return mapGroup(response);
  },
};

export const groupService = USE_MOCKS ? mockGroupService : apiGroupService;
