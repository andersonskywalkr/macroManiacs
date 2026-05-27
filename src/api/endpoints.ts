export const endpoints = {
  health: "/health",
  auth: {
    register: "/auth/register",
    login: "/auth/login",
  },
  profile: {
    user: (userId: string) => `/profile/user/${userId}`,
    avatar: (userId: string) => `/profile/user/${userId}/avatar`,
  },
  diet: {
    extract: "/diet/extract",
    create: "/diet",
    confirm: "/diet/confirm",
    active: (userId: string) => `/diet/user/${userId}/active`,
  },
  home: {
    user: (userId: string) => `/home/user/${userId}`,
    weekly: (userId: string) => `/home/user/${userId}/weekly`,
  },
  groups: {
    create: "/groups",
    join: "/groups/join",
    user: (userId: string) => `/groups/user/${userId}`,
    byId: (groupId: string) => `/groups/${groupId}`,
    challenges: (groupId: string) => `/groups/${groupId}/challenges`,
    feed: (groupId: string) => `/groups/${groupId}/feed`,
    ranking: (groupId: string) => `/groups/${groupId}/ranking`,
    chat: (groupId: string) => `/groups/${groupId}/chat`,
  },
  challenges: {
    byId: (challengeId: string) => `/challenges/${challengeId}`,
    join: (challengeId: string) => `/challenges/${challengeId}/join`,
    progress: (challengeId: string) => `/challenges/${challengeId}/progress`,
    finish: (challengeId: string) => `/challenges/${challengeId}/finish`,
    user: (userId: string) => `/users/${userId}/challenges`,
    userCompleted: (userId: string) => `/users/${userId}/challenges/completed`,
  },
  products: {
    barcode: (barcode: string) => `/products/${barcode}`,
  },
  checkins: {
    create: "/checkins",
    today: (userId: string) => `/checkins/user/${userId}/today`,
    recent: (userId: string) => `/checkins/user/${userId}/recent`,
    history: (userId: string) => `/checkins/user/${userId}`,
  },
  badges: {
    user: (userId: string) => `/badges/user/${userId}`,
  },
  achievements: {
    user: (userId: string) => `/users/${userId}/achievements`,
  },
  notifications: {
    user: (userId: string) => `/notifications/user/${userId}`,
    read: (notificationId: string) => `/notifications/${notificationId}/read`,
  },
};

export type ApiEndpoints = typeof endpoints;
