import { router } from "expo-router";
import { Clock3, Plus } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { MacroCounterCard } from "@/components/macros/MacroCounterCard";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useActiveDiet, useDailyMacros } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function MacrosScreen() {
  const theme = useAppTheme();
  const { data: macros, isLoading } = useDailyMacros();
  const { data: diet } = useActiveDiet();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Diário"
        title="O placar do prato."
        subtitle="Consumo, metas e refeições pendentes no mesmo tabuleiro."
      />
      {isLoading || !macros ? <LoadingManiac /> : <MacroCounterCard macros={macros} />}

      <View style={styles.meals}>
        {(diet?.meals ?? []).map((meal, index) => {
          const done = index === 0;
          return (
            <ManiacCard key={meal.id} strong={done}>
              <View style={styles.mealHeader}>
                <View style={styles.mealNameWrap}>
                  <Clock3
                    color={done ? theme.colors.accent : theme.colors.primarySoft}
                    size={18}
                  />
                  <Text style={[styles.mealName, { color: theme.colors.text }]}>
                    {meal.name}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.status,
                    { color: done ? theme.colors.success : theme.colors.mutedText },
                  ]}
                >
                  {done ? "Feita" : "Pendente"}
                </Text>
              </View>
              <Text style={[styles.mealMacros, { color: theme.colors.mutedText }]}>
                {meal.macros.calories} kcal · {meal.macros.protein}g proteína ·{" "}
                {meal.macros.carbs}g carbo · {meal.macros.fat}g gordura
              </Text>
            </ManiacCard>
          );
        })}
      </View>

      <ManiacButton
        icon={<Plus color="#FFFFFF" size={18} />}
        label="Adicionar check-in"
        onPress={() => router.push("/app/check-in")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  meals: {
    gap: 12,
    marginVertical: 16,
  },
  mealHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mealNameWrap: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  mealName: {
    fontSize: 18,
    fontWeight: "900",
  },
  status: {
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  mealMacros: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 19,
    marginTop: 10,
  },
});
