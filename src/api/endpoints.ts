export const endpoints = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    me: "/auth/me",
    logout: "/auth/logout",
  },
  profile: {
    bodyData: "/profile/body-data",
    profile: "/profile",
    badges: "/profile/badges",
    medals: "/profile/medals",
    equipMedal: "/profile/medals/equip",
  },
  avatar: {
    create: "/avatar",
    update: "/avatar",
  },
  diet: {
    scan: "/diet/scan",
    confirm: "/diet/confirm",
    active: "/diet/active",
    targets: "/diet/targets",
    rescan: "/diet/rescan",
  },
  home: {
    home: "/home",
    macrosToday: "/macros/today",
    checkinsToday: "/checkins/today",
  },
  groups: {
    create: "/groups",
    join: "/groups/join",
    current: "/groups/current",
    byId: (groupId: string) => `/groups/${groupId}`,
    feed: (groupId: string) => `/groups/${groupId}/feed`,
    ranking: (groupId: string) => `/groups/${groupId}/ranking`,
    chat: (groupId: string) => `/groups/${groupId}/chat`,
    invite: (groupId: string) => `/groups/${groupId}/invite`,
  },
  products: {
    barcode: (barcode: string) => `/products/barcode/${barcode}`,
    manual: "/products/manual",
  },
  checkins: {
    barcode: "/checkins/barcode",
    plannedMeal: "/checkins/planned-meal",
    photo: "/checkins/photo",
    manual: "/checkins/manual",
    byId: (checkInId: string) => `/checkins/${checkInId}`,
  },
  feed: {
    reaction: (postId: string) => `/feed/${postId}/reactions`,
    comments: (postId: string) => `/feed/${postId}/comments`,
  },
  achievements: {
    list: "/achievements",
  },
};

export type ApiEndpoints = typeof endpoints;
