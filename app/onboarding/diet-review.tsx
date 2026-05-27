import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { CheckCircle2 } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { MacroProgressBar } from "@/components/macros/MacroProgressBar";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { dietService } from "@/services/diet.service";
import { useAppTheme } from "@/store/theme.store";

export default function DietReviewScreen() {
  const theme = useAppTheme();
  const { data: draft, isLoading } = useQuery({
    queryKey: ["diet-draft"],
    queryFn: dietService.getDraft,
  });

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Revisão"
        title="A IA montou o mapa."
        subtitle="Confere os macros e confirma para entrar no jogo."
      />
      {isLoading || !draft ? (
        <LoadingManiac />
      ) : (
        <>
          <ManiacCard strong style={styles.targets}>
            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
              Metas diárias
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

          <View style={styles.meals}>
            {draft.meals.map((meal) => (
              <ManiacCard key={meal.id}>
                <View style={styles.mealHeader}>
                  <Text style={[styles.mealName, { color: theme.colors.text }]}>
                    {meal.name}
                  </Text>
                  <Text style={[styles.mealTime, { color: theme.colors.primarySoft }]}>
                    {meal.time}
                  </Text>
                </View>
                <Text style={[styles.mealMacros, { color: theme.colors.mutedText }]}>
                  {meal.macros.protein}g proteína · {meal.macros.carbs}g carbo ·{" "}
                  {meal.macros.fat}g gordura
                </Text>
                {meal.items.map((item) => (
                  <Text
                    key={item.id}
                    style={[styles.item, { color: theme.colors.mutedText }]}
                  >
                    • {item.food} · {item.quantity}
                  </Text>
                ))}
              </ManiacCard>
            ))}
          </View>

          <ManiacButton
            icon={<CheckCircle2 color="#FFFFFF" size={18} />}
            label="Confirmar dieta"
            onPress={() => router.push("/onboarding/group-entry")}
          />
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
  meals: {
    gap: 12,
    marginBottom: 18,
  },
  mealHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mealName: {
    fontSize: 18,
    fontWeight: "900",
  },
  mealTime: {
    fontSize: 12,
    fontWeight: "900",
  },
  mealMacros: {
    fontSize: 13,
    fontWeight: "800",
    marginTop: 8,
  },
  item: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 6,
  },
});
