import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { achievementsService } from "@/services/achievements.service";
import { chatService } from "@/services/chat.service";
import { checkInService } from "@/services/checkin.service";
import { dietService } from "@/services/diet.service";
import { feedService } from "@/services/feed.service";
import { groupService } from "@/services/group.service";
import { healthService } from "@/services/health.service";
import { homeService } from "@/services/home.service";
import { notificationService } from "@/services/notification.service";
import { productService } from "@/services/product.service";
import { profileService } from "@/services/profile.service";
import { rankingService } from "@/services/ranking.service";
import { useAuthStore } from "@/store/auth.store";
import type {
  BarcodeCheckInPayload,
  ManualCheckInPayload,
  PhotoCheckInPayload,
  PlannedMealCheckInPayload,
} from "@/services/checkin.service";
import type { CheckInResult } from "@/types/checkin";
import type { Product } from "@/types/product";

export const queryKeys = {
  achievements: ["achievements"] as const,
  activeDiet: ["active-diet"] as const,
  chat: ["chat"] as const,
  dailyMacros: ["daily-macros"] as const,
  feed: ["feed"] as const,
  group: ["group", "current"] as const,
  groupById: (groupId: string) => ["group", groupId] as const,
  groups: ["groups"] as const,
  health: ["health"] as const,
  home: ["home"] as const,
  lastCheckIn: ["last-check-in"] as const,
  notifications: ["notifications"] as const,
  product: (barcode: string) => ["product", barcode] as const,
  profile: ["profile"] as const,
  ranking: ["ranking"] as const,
};

function useAuthenticatedQueryEnabled() {
  return Boolean(useAuthStore((state) => state.user?.id));
}

export function useHealthCheck() {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: healthService.check,
  });
}

export function useHome() {
  const enabled = useAuthenticatedQueryEnabled();
  return useQuery({
    queryKey: queryKeys.home,
    queryFn: () => homeService.getHome(),
    enabled,
  });
}

export function useDailyMacros() {
  const enabled = useAuthenticatedQueryEnabled();
  return useQuery({
    queryKey: queryKeys.dailyMacros,
    queryFn: homeService.getDailyMacros,
    enabled,
  });
}

export function useGroup() {
  const enabled = useAuthenticatedQueryEnabled();
  return useQuery({
    queryKey: queryKeys.group,
    queryFn: groupService.getCurrentGroup,
    enabled,
  });
}

export function useGroups() {
  const enabled = useAuthenticatedQueryEnabled();
  return useQuery({
    queryKey: queryKeys.groups,
    queryFn: () => groupService.getGroups(),
    enabled,
  });
}

export function useGroupById(groupId: string) {
  return useQuery({
    queryKey: queryKeys.groupById(groupId),
    queryFn: () => groupService.getById(groupId),
    enabled: Boolean(groupId),
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: groupService.createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups });
      queryClient.invalidateQueries({ queryKey: queryKeys.home });
    },
  });
}

export function useJoinGroup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inviteCode: string) => groupService.joinGroup(inviteCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups });
      queryClient.invalidateQueries({ queryKey: queryKeys.home });
    },
  });
}

export function useFeed(groupId?: string) {
  const enabled = useAuthenticatedQueryEnabled();
  return useQuery({
    queryKey: [...queryKeys.feed, groupId] as const,
    queryFn: () => feedService.getGroupFeed(groupId),
    enabled,
  });
}

export function useChat() {
  const enabled = useAuthenticatedQueryEnabled();
  return useQuery({
    queryKey: queryKeys.chat,
    queryFn: () => chatService.getMessages(),
    enabled,
  });
}

export function useSendChatMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message: string) => chatService.sendMessage(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat });
    },
  });
}

export function useActiveDiet() {
  const enabled = useAuthenticatedQueryEnabled();
  return useQuery({
    queryKey: queryKeys.activeDiet,
    queryFn: () => dietService.getActiveDiet(),
    enabled,
  });
}

export function useExtractDiet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dietService.extractDiet,
    onSuccess: (draft) => {
      queryClient.setQueryData(["diet-draft"], draft);
    },
  });
}

export function useConfirmDiet() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: dietService.confirmDiet,
    onSuccess: (plan) => {
      queryClient.setQueryData(queryKeys.activeDiet, plan);
      queryClient.invalidateQueries({ queryKey: queryKeys.home });
      queryClient.invalidateQueries({ queryKey: queryKeys.dailyMacros });
    },
  });
}

export function useProduct(barcode: string) {
  return useQuery({
    queryKey: queryKeys.product(barcode),
    queryFn: () => productService.getByBarcode(barcode),
    enabled: Boolean(barcode),
  });
}

export function useCreateManualProduct() {
  return useMutation({
    mutationFn: (product: Product) => productService.createManual(product),
  });
}

export function useLastCheckIn() {
  return useQuery({
    queryKey: queryKeys.lastCheckIn,
    queryFn: checkInService.getLastResult,
  });
}

function useCheckInMutation<TPayload>(
  mutationFn: (payload?: TPayload) => Promise<CheckInResult>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: (result) => {
      queryClient.setQueryData(queryKeys.lastCheckIn, result);
      queryClient.invalidateQueries({ queryKey: queryKeys.home });
      queryClient.invalidateQueries({ queryKey: queryKeys.dailyMacros });
      queryClient.invalidateQueries({ queryKey: queryKeys.feed });
      queryClient.invalidateQueries({ queryKey: queryKeys.ranking });
      queryClient.invalidateQueries({ queryKey: queryKeys.achievements });
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
    },
  });
}

export function useBarcodeCheckIn() {
  return useCheckInMutation<BarcodeCheckInPayload>(checkInService.confirmBarcode);
}

export function usePlannedMealCheckIn() {
  return useCheckInMutation<PlannedMealCheckInPayload>(checkInService.confirmPlannedMeal);
}

export function usePhotoCheckIn() {
  return useCheckInMutation<PhotoCheckInPayload>(checkInService.confirmPhoto);
}

export function useManualCheckIn() {
  return useCheckInMutation<ManualCheckInPayload>(checkInService.confirmManual);
}

export function useProfile() {
  const enabled = useAuthenticatedQueryEnabled();
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => profileService.getProfile(),
    enabled,
  });
}

export function useRanking(groupId?: string) {
  const enabled = useAuthenticatedQueryEnabled();
  return useQuery({
    queryKey: [...queryKeys.ranking, groupId] as const,
    queryFn: () => rankingService.getRanking(groupId),
    enabled,
  });
}

export function useAchievements() {
  const enabled = useAuthenticatedQueryEnabled();
  return useQuery({
    queryKey: queryKeys.achievements,
    queryFn: () => achievementsService.getAchievements(),
    enabled,
  });
}

export function useNotifications() {
  const enabled = useAuthenticatedQueryEnabled();
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => notificationService.getNotifications(),
    enabled,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) =>
      notificationService.markNotificationAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
      queryClient.invalidateQueries({ queryKey: queryKeys.home });
    },
  });
}
