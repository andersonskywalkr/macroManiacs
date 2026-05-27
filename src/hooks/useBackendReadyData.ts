import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { achievementsService } from "@/services/achievements.service";
import { chatService } from "@/services/chat.service";
import { checkInService } from "@/services/checkin.service";
import { dietService } from "@/services/diet.service";
import { feedService } from "@/services/feed.service";
import { groupService } from "@/services/group.service";
import { homeService } from "@/services/home.service";
import { productService } from "@/services/product.service";
import { profileService } from "@/services/profile.service";
import { rankingService } from "@/services/ranking.service";
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
  lastCheckIn: ["last-check-in"] as const,
  product: (barcode: string) => ["product", barcode] as const,
  profile: ["profile"] as const,
  ranking: ["ranking"] as const,
};

export function useDailyMacros() {
  return useQuery({
    queryKey: queryKeys.dailyMacros,
    queryFn: homeService.getDailyMacros,
  });
}

export function useGroup() {
  return useQuery({
    queryKey: queryKeys.group,
    queryFn: groupService.getCurrentGroup,
  });
}

export function useFeed() {
  return useQuery({
    queryKey: queryKeys.feed,
    queryFn: () => feedService.getGroupFeed(),
  });
}

export function useChat() {
  return useQuery({
    queryKey: queryKeys.chat,
    queryFn: () => chatService.getMessages(),
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
  return useQuery({
    queryKey: queryKeys.activeDiet,
    queryFn: dietService.getActiveDiet,
  });
}

export function useProduct(barcode: string) {
  return useQuery({
    queryKey: queryKeys.product(barcode),
    queryFn: () => productService.getByBarcode(barcode),
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
      queryClient.invalidateQueries({ queryKey: queryKeys.dailyMacros });
      queryClient.invalidateQueries({ queryKey: queryKeys.feed });
      queryClient.invalidateQueries({ queryKey: queryKeys.ranking });
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
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: profileService.getProfile,
  });
}

export function useRanking() {
  return useQuery({
    queryKey: queryKeys.ranking,
    queryFn: () => rankingService.getRanking(),
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: queryKeys.achievements,
    queryFn: achievementsService.getAchievements,
  });
}
