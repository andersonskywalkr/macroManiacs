import { colors } from "./colors";
import { radius, spacing } from "./spacing";

export type AppThemeName = "dark" | "light";

export type AppTheme = {
  name: AppThemeName;
  colors: {
    background: string;
    backgroundAlt: string;
    card: string;
    cardStrong: string;
    text: string;
    mutedText: string;
    border: string;
    primary: string;
    primarySoft: string;
    accent: string;
    danger: string;
    success: string;
    tabBar: string;
  };
  spacing: typeof spacing;
  radius: typeof radius;
};

export const darkTheme: AppTheme = {
  name: "dark",
  colors: {
    background: colors.primary,
    backgroundAlt: colors.primarySoft,
    card: colors.primarySoft,
    cardStrong: colors.surface,
    text: colors.offWhite,
    mutedText: colors.mutedTextDark,
    border: colors.accentSoft,
    primary: colors.accent,
    primarySoft: colors.accentSoft,
    accent: colors.chartYellow,
    danger: colors.chartRed,
    success: colors.chartGreen,
    tabBar: colors.background,
  },
  spacing,
  radius,
};

export const lightTheme: AppTheme = {
  name: "light",
  colors: {
    background: colors.background,
    backgroundAlt: colors.background,
    card: colors.surface,
    cardStrong: colors.surface,
    text: colors.primary,
    mutedText: colors.mutedTextLight,
    border: colors.primary,
    primary: colors.primary,
    primarySoft: colors.primarySoft,
    accent: colors.accent,
    danger: colors.chartRed,
    success: colors.chartGreen,
    tabBar: colors.background,
  },
  spacing,
  radius,
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
};
