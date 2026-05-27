import { Moon, Sun } from "lucide-react-native";
import { StyleSheet, Text } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { USE_MOCKS, API_BASE_URL } from "@/constants/config";
import { useAppTheme, useThemeStore } from "@/store/theme.store";

export default function SettingsScreen() {
  const theme = useAppTheme();
  const themeName = useThemeStore((state) => state.themeName);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Settings"
        title="Configuracoes"
        subtitle="Ajustes minimos para demo e integracao."
      />
      <ManiacCard style={styles.card}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Tema atual</Text>
        <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
          {themeName}
        </Text>
        <ManiacButton
          icon={
            themeName === "dark" ? (
              <Sun color="#FFFFFF" size={18} />
            ) : (
              <Moon color="#FFFFFF" size={18} />
            )
          }
          label="Alternar tema"
          onPress={toggleTheme}
        />
      </ManiacCard>
      <ManiacCard style={styles.card}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Integracao
        </Text>
        <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
          USE_MOCKS: {String(USE_MOCKS)}
        </Text>
        <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
          API: {API_BASE_URL}
        </Text>
      </ManiacCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  copy: {
    fontSize: 14,
    fontWeight: "700",
  },
});
