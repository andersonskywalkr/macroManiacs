import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Moon, Sun } from "lucide-react-native";
import { useAppTheme, useThemeStore } from "@/store/theme.store";

type ScreenHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function ScreenHeader({ eyebrow, title, subtitle }: ScreenHeaderProps) {
  const theme = useAppTheme();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDark = theme.name === "dark";

  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        {eyebrow ? (
          <Text style={[styles.eyebrow, { color: theme.colors.primarySoft }]}>
            {eyebrow}
          </Text>
        ) : null}
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: theme.colors.mutedText }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Alternar tema"
        onPress={toggleTheme}
        style={[
          styles.themeButton,
          { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
        ]}
      >
        {isDark ? (
          <Sun color={theme.colors.accent} size={20} />
        ) : (
          <Moon color={theme.colors.primary} size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  copy: {
    flex: 1,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 21,
    marginTop: 10,
  },
  themeButton: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
});
