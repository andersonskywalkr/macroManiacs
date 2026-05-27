import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { CheckCircle2 } from "lucide-react-native";
import { useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { MacroProgressBar } from "@/components/macros/MacroProgressBar";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useConfirmDiet } from "@/hooks/useBackendReadyData";
import { dietService } from "@/services/diet.service";
import { useAppTheme } from "@/store/theme.store";

export default function DietReviewScreen() {
  const theme = useAppTheme();
  const confirmMutation = useConfirmDiet();
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const { data: draft, isLoading } = useQuery({
    queryKey: ["diet-draft"],
    queryFn: dietService.getDraft,
  });

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Revisao"
        title="Confirme suas metas."
        subtitle="Confira os macros cadastrados antes de ativar o plano."
      />
      {isLoading || !draft ? (
        <LoadingManiac />
      ) : (
        <>
          <ManiacCard strong style={styles.targets}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Metas diarias
            </Text>
            <MacroProgressBar
              consumed={draft.dailyTargets.calories}
              label="Kcal"
              percentage={100}
              target={draft.dailyTargets.calories}
              unit="kcal"
              color={theme.colors.accent}
            />
            <MacroProgressBar
              consumed={draft.dailyTargets.protein}
              label="Proteina"
              percentage={100}
              target={draft.dailyTargets.protein}
              unit="g"
            />
            <MacroProgressBar
              consumed={draft.dailyTargets.carbs}
              label="Carbo"
              percentage={100}
              target={draft.dailyTargets.carbs}
              unit="g"
            />
            <MacroProgressBar
              consumed={draft.dailyTargets.fat}
              label="Gordura"
              percentage={100}
              target={draft.dailyTargets.fat}
              unit="g"
              color={theme.colors.danger}
            />
          </ManiacCard>

          <ManiacButton
            icon={<CheckCircle2 color="#FFFFFF" size={18} />}
            label="Confirmar metas"
            loading={confirmMutation.isPending}
            onPress={() =>
              confirmMutation.mutate(draft, {
                onSuccess: () => {
                  setConfirmError(null);
                  router.replace("/app/home");
                },
                onError: (error) => {
                  const message =
                    error instanceof Error ? error.message : "Revise as metas e tente novamente.";
                  setConfirmError(message);
                  Alert.alert("Nao foi possivel confirmar", message);
                },
              })
            }
          />
          {confirmError ? (
            <ManiacCard>
              <Text style={[styles.errorTitle, { color: theme.colors.danger }]}>
                Nao foi possivel confirmar
              </Text>
              <Text style={[styles.errorCopy, { color: theme.colors.mutedText }]}>
                {confirmError}
              </Text>
              <ManiacButton
                label="Editar metas"
                onPress={() => router.replace("/onboarding/diet-scan")}
                variant="secondary"
              />
            </ManiacCard>
          ) : null}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  targets: {
    gap: 14,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "900",
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 6,
    textAlign: "center",
  },
  errorCopy: {
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18,
    marginBottom: 12,
    textAlign: "center",
  },
});
