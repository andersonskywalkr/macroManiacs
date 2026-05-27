import type { Badge, Medal } from "@/types/achievements";

export const mockMedals: Medal[] = [
  {
    id: "medal_protein_gold",
    name: "Proteína Braba",
    category: "macros",
    level: "gold",
    rarity: "epic",
    description: "Bateu proteína por 5 dias seguidos.",
    visualSlot: "chest",
    unlocked: true,
    equipped: true,
  },
  {
    id: "medal_streak_bronze",
    name: "Streak Pegando Fogo",
    category: "streak",
    level: "bronze",
    rarity: "rare",
    description: "Manteve check-in por 3 dias.",
    visualSlot: "head",
    unlocked: true,
    equipped: false,
  },
];

export const mockBadges: Badge[] = [
  {
    id: "badge_clean_lunch",
    name: "Almoço Limpo",
    description: "Registrou um almoço dentro da meta.",
    icon: "flame",
    unlocked: true,
  },
  {
    id: "badge_first_scan",
    name: "Scanner Maniac",
    description: "Escaneou o primeiro produto.",
    icon: "scan-barcode",
    unlocked: true,
  },
];
