export type Product = {
  barcode: string;
  name: string;
  brand?: string | null;
  imageUrl?: string | null;
  servingSize?: string | null;
  caloriesPer100g?: number | null;
  proteinPer100g?: number | null;
  carbsPer100g?: number | null;
  fatPer100g?: number | null;
  source: "open_food_facts" | "manual";
  status?: "found" | "not_found" | "incomplete";
};
