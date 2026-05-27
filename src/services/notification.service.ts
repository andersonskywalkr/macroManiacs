import { endpoints } from "@/api/endpoints";
import { mapNotification } from "@/api/mappers";
import type { ApiNotification, ApiNotificationsSummary } from "@/api/dtos";
import { apiGet, apiPatch } from "@/lib/api";
import { getCurrentUserId } from "@/services/session.service";
import type { Notification, NotificationsSummary } from "@/types/notification";

export const notificationService = {
  getNotifications: async (limit = 20, userId?: string): Promise<NotificationsSummary> => {
    const safeUserId = userId ?? (await getCurrentUserId());
    const data = await apiGet<ApiNotification[] | ApiNotificationsSummary>(
      `${endpoints.notifications.user(safeUserId)}?limit=${limit}`,
    );

    if (Array.isArray(data)) {
      return {
        unreadCount: data.filter((notification) => !notification.read).length,
        latest: data.map(mapNotification),
      };
    }

    const latest = data.latest ?? data.notifications ?? [];
    return {
      unreadCount:
        data.unread_count ?? latest.filter((notification) => !notification.read).length,
      latest: latest.map(mapNotification),
    };
  },
  markNotificationAsRead: async (
    notificationId: string,
    userId?: string,
  ): Promise<Notification> => {
    const safeUserId = userId ?? (await getCurrentUserId());
    const data = await apiPatch<ApiNotification>(endpoints.notifications.read(notificationId), {
      user_id: safeUserId,
    });
    return mapNotification(data);
  },
};
