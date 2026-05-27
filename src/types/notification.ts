export type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  readAt?: string | null;
};

export type NotificationsSummary = {
  unreadCount: number;
  latest: Notification[];
};
