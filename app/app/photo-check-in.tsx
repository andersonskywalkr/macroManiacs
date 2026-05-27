import { router } from "expo-router";
import { CheckCircle2, MessageSquareText } from "lucide-react-native";
import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { usePhotoCheckIn } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function PhotoCheckInScreen() {
  const theme = useAppTheme();
  const confirmMutation = usePhotoCheckIn();
  const [description, setDescription] = useState("");

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Texto livre"
        title="Descreve o prato"
        subtitle="A IA estima macros pelo texto e o backend registra o check-in."
      />
      <ManiacCard strong style={styles.card}>
        <MessageSquareText color={theme.colors.accent} size={48} />
        <Text style={[styles.copy, { color: theme.colors.text }]}>
          Exemplo: 150g de frango, 100g de arroz e salada.
        </Text>
      </ManiacCard>
      <ManiacInput
        label="Descrição"
        onChangeText={setDescription}
        placeholder="O que voce comeu?"
        value={description}
      />
      <ManiacButton
        icon={<CheckCircle2 color="#FFFFFF" size={18} />}
        label="Confirmar texto"
        loading={confirmMutation.isPending}
        onPress={() =>
          confirmMutation.mutate({ description }, {
            onSuccess: () => router.push("/app/check-in-success"),
            onError: (error) => {
              Alert.alert(
                "Nao foi possivel estimar",
                error instanceof Error ? error.message : "Tente novamente em alguns minutos.",
              );
            },
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
