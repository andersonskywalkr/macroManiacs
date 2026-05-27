import { router } from "expo-router";
import { Camera, CheckCircle2 } from "lucide-react-native";
import { StyleSheet, Text } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { usePhotoCheckIn } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function PhotoCheckInScreen() {
  const theme = useAppTheme();
  const confirmMutation = usePhotoCheckIn();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Foto"
        title="Foto do prato"
        subtitle="No MVP mockado, a IA retorna macros estimados."
      />
      <ManiacCard strong style={styles.card}>
        <Camera color={theme.colors.accent} size={48} />
        <Text style={[styles.copy, { color: theme.colors.text }]}>
          Simulacao de foto pronta para trocar por Expo Image Picker/Camera.
        </Text>
      </ManiacCard>
      <ManiacButton
        icon={<CheckCircle2 color="#FFFFFF" size={18} />}
        label="Confirmar foto"
        loading={confirmMutation.isPending}
        onPress={() =>
          confirmMutation.mutate(undefined, {
            onSuccess: () => router.push("/app/check-in-success"),
          })
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  copy: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 21,
    textAlign: "center",
  },
});
