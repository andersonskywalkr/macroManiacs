import { create } from "zustand";
import { type AppThemeName, themes } from "@/constants/theme";

type ThemeState = {
  themeName: AppThemeName;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  themeName: "light",
  toggleTheme: () =>
    set((state) => ({
      themeName: state.themeName === "dark" ? "light" : "dark",
    })),
}));

export const useAppTheme = () => {
  const themeName = useThemeStore((state) => state.themeName);
  return themes[themeName];
};
