import { router } from "expo-router";
import { RefreshCcw, Save } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { MacroProgressBar } from "@/components/macros/MacroProgressBar";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useActiveDiet } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function DietScreen() {
  const theme = useAppTheme();
  const { data: diet, isLoading } = useActiveDiet();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Dieta"
        title="Plano ativo"
        subtitle="Metas e refeicoes extraidas no onboarding."
      />
      {isLoading || !diet ? (
        <LoadingManiac />
      ) : (
        <>
          <ManiacCard strong style={styles.targets}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Metas do dia
            </Text>
            <MacroProgressBar
              consumed={diet.dailyTargets.calories}
              label="Kcal"
              percentage={100}
              target={diet.dailyTargets.calories}
              unit="kcal"
              color={theme.colors.accent}
            />
            <MacroProgressBar
              consumed={diet.dailyTargets.protein}
              label="Proteina"
              percentage={100}
              target={diet.dailyTargets.protein}
              unit="g"
            />
            <MacroProgressBar
              consumed={diet.dailyTargets.carbs}
              label="Carbo"
              percentage={100}
              target={diet.dailyTargets.carbs}
              unit="g"
            />
            <MacroProgressBar
              consumed={diet.dailyTargets.fat}
              label="Gordura"
              percentage={100}
              target={diet.dailyTargets.fat}
              unit="g"
              color={theme.colors.danger}
            />
          </ManiacCard>

          <View style={styles.list}>
            {diet.meals.map((meal) => (
              <ManiacCard key={meal.id}>
                <Text style={[styles.mealName, { color: theme.colors.text }]}>
                  {meal.name} {meal.time ? `· ${meal.time}` : ""}
                </Text>
                <Text style={[styles.mealMeta, { color: theme.colors.mutedText }]}>
                  {meal.macros.calories} kcal · {meal.macros.protein}g prot ·{" "}
                  {meal.macros.carbs}g carb · {meal.macros.fat}g fat
                </Text>
                {meal.items.map((item) => (
                  <Text
                    key={item.id}
                    style={[styles.item, { color: theme.colors.mutedText }]}
                  >
                    {item.food} - {item.quantity}
                  </Text>
                ))}
              </ManiacCard>
            ))}
          </View>
        </>
      )}
      <View style={styles.actions}>
        <ManiacButton
          icon={<RefreshCcw color="#FFFFFF" size={18} />}
          label="Reescanear dieta"
          onPress={() => router.push("/onboarding/diet-scan")}
        />
        <ManiacButton
          icon={<Save color={theme.colors.text} size={18} />}
          label="Editar depois"
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  targets: {
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
  },
  list: {
    gap: 12,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "900",
  },
  mealMeta: {
    fontSize: 13,
    fontWeight: "800",
    marginTop: 8,
  },
  item: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 6,
  },
  actions: {
    gap: 10,
    marginTop: 18,
  },
});
