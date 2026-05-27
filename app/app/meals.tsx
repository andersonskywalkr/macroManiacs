import { router } from "expo-router";
import { ClipboardList, Plus, RefreshCcw } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import {
  ActionRow,
  DesignScaffold,
  MetricTile,
  ScaffoldCard,
} from "@/components/layout/DesignScaffold";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useActiveDiet } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

const mealPalette = {
  ink: "#280060",
  surfaceSoft: "#F8F1E2",
};

export default function MealsScreen() {
  const theme = useAppTheme();
  const { data: diet, isLoading } = useActiveDiet();
  const plannedMeals = diet?.meals ?? [];
  const totalMeals = plannedMeals.length;
  const totalItems = plannedMeals.reduce((sum, meal) => sum + meal.items.length, 0);

  return (
    <DesignScaffold
      eyebrow="Refeicoes"
      title="Controle das refeicoes"
      subtitle="Registre refeicoes e acompanhe as metas de macros do dia."
    >
      <ScaffoldCard title="Resumo do dia" subtitle="Metas de macros e quantidade de refeicoes.">
        {isLoading || !diet ? (
          <LoadingManiac />
        ) : (
          <View style={styles.metrics}>
            <MetricTile accent={theme.colors.accent} label="kcal" value={`${diet.dailyTargets.calories}`} />
            <MetricTile accent={theme.colors.success} label="refeicoes" value={`${totalMeals}`} />
            <MetricTile accent={theme.colors.danger} label="itens" value={`${totalItems}`} />
          </View>
        )}
      </ScaffoldCard>

      <ScaffoldCard title="Acoes rapidas">
        <View style={styles.stack}>
          <ActionRow
            icon={<Plus color={theme.colors.accent} size={22} />}
            label="Adicionar refeicao"
            meta="Entra pelo fluxo de check-in atual."
            onPress={() => router.push("/app/check-in")}
          />
          <ActionRow
            icon={<RefreshCcw color={theme.colors.accent} size={22} />}
            label="Editar metas"
            meta="Atualize suas metas manuais de macros."
            onPress={() => router.push("/onboarding/diet-scan")}
          />
        </View>
      </ScaffoldCard>

      {plannedMeals.length > 0 ? (
        <ScaffoldCard title="Refeicoes planejadas" subtitle="Plano atual dividido por horario.">
          {isLoading || !diet ? (
            <LoadingManiac />
          ) : (
            <View style={styles.stack}>
              {plannedMeals.map((meal) => (
                <View
                  key={meal.id}
                  style={[
                    styles.mealRow,
                    {
                      backgroundColor: theme.name === "dark" ? theme.colors.card : mealPalette.surfaceSoft,
                      borderColor: theme.name === "dark" ? theme.colors.border : mealPalette.ink,
                    },
                  ]}
                >
                  <View style={styles.mealTopline}>
                    <Text style={[styles.mealName, { color: theme.colors.text }]}>{meal.name}</Text>
                    {meal.time ? (
                      <Text style={[styles.mealTime, { color: theme.colors.mutedText }]}>{meal.time}</Text>
                    ) : null}
                  </View>
                  <Text style={[styles.mealMeta, { color: theme.colors.mutedText }]}>
                    {meal.macros.calories} kcal - {meal.macros.protein}g prot - {meal.macros.carbs}g carb -{" "}
                    {meal.macros.fat}g gord
                  </Text>
                  <Text style={[styles.mealItems, { color: theme.colors.text }]} numberOfLines={2}>
                    {meal.items.map((item) => `${item.food} (${item.quantity})`).join(", ")}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </ScaffoldCard>
      ) : null}

      <ScaffoldCard title="Historico">
        <ActionRow
          icon={<ClipboardList color={theme.colors.accent} size={22} />}
          label="Historico e filtros"
          meta="Consulte registros anteriores por periodo e tipo."
          onPress={() => router.push("/app/checkin-history" as any)}
        />
      </ScaffoldCard>
    </DesignScaffold>
  );
}

const styles = StyleSheet.create({
  metrics: {
    flexDirection: "row",
    gap: 12,
  },
  stack: {
    gap: 12,
  },
  mealRow: {
    borderRadius: 24,
    borderWidth: 2,
    padding: 16,
  },
  mealTopline: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  mealName: {
    flex: 1,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 25,
  },
  mealTime: {
    fontFamily: "Baloo2-Bold",
    fontSize: 15,
    fontWeight: "700",
  },
  mealMeta: {
    fontFamily: "Baloo2-Bold",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 8,
  },
  mealItems: {
    fontFamily: "Baloo2-Medium",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 21,
    marginTop: 8,
  },
});
