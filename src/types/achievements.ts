export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
};

export type Medal = {
  id: string;
  name: string;
  category: string;
  level: "bronze" | "silver" | "gold" | "diamond";
  rarity: "common" | "rare" | "epic" | "legendary" | "maniac";
  description: string;
  visualSlot: string;
  unlocked: boolean;
  equipped: boolean;
};
