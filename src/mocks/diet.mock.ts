import type { DietDraft, DietPlan } from "@/types/diet";

export const mockDietDraft: DietDraft = {
  id: "draft_maniac_cut",
  confidence: 0.88,
  dailyTargets: {
    calories: 2300,
    protein: 180,
    carbs: 250,
    fat: 70,
  },
  meals: [
    {
      id: "meal_breakfast",
      name: "Cafe da manha",
      time: "08:00",
      macros: { calories: 430, protein: 32, carbs: 52, fat: 10 },
      items: [
        { id: "item_1", food: "Ovos", quantity: "3 unidades" },
        { id: "item_2", food: "Aveia", quantity: "60g" },
      ],
    },
    {
      id: "meal_lunch",
      name: "Almoco",
      time: "12:30",
      macros: { calories: 680, protein: 48, carbs: 82, fat: 16 },
      items: [
        { id: "item_3", food: "Frango grelhado", quantity: "180g" },
        { id: "item_4", food: "Arroz e feijao", quantity: "1 prato" },
      ],
    },
    {
      id: "meal_dinner",
      name: "Jantar",
      time: "20:00",
      macros: { calories: 610, protein: 46, carbs: 68, fat: 18 },
      items: [
        { id: "item_5", food: "Patinho moido", quantity: "160g" },
        { id: "item_6", food: "Batata doce", quantity: "220g" },
      ],
    },
  ],
  days: [],
};

mockDietDraft.days = [
  {
    day: 1,
    dailyTargets: mockDietDraft.dailyTargets,
    meals: mockDietDraft.meals,
  },
];

export const mockDietPlan: DietPlan = {
  id: "plan_active",
  dailyTargets: mockDietDraft.dailyTargets,
  meals: mockDietDraft.meals,
  days: mockDietDraft.days,
};
