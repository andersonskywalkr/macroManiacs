export type ChatMessage = {
  id: string;
  groupId: string;
  userId?: string;
  authorName: string;
  message: string;
  createdAt: string;
  type: "user" | "system";
};
