import { router } from "expo-router";
import { Camera, ClipboardList, Plus, RefreshCcw } from "lucide-react-native";
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
  lavender: "#DCCAF6",
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
      eyebrow="Refeições"
      title="Controle das refeições"
      subtitle="Registre, revise e ajuste seu plano alimentar do dia."
    >
      <ScaffoldCard title="Resumo do dia" subtitle="Metas planejadas e quantidade de refeições.">
        {isLoading || !diet ? (
          <LoadingManiac />
        ) : (
          <View style={styles.metrics}>
            <MetricTile accent={theme.colors.accent} label="kcal planejadas" value={`${diet.dailyTargets.calories}`} />
            <MetricTile accent={theme.colors.success} label="refeições" value={`${totalMeals}`} />
            <MetricTile accent={theme.colors.danger} label="itens" value={`${totalItems}`} />
          </View>
        )}
      </ScaffoldCard>

      <ScaffoldCard title="Ações rápidas">
        <View style={styles.stack}>
          <ActionRow
            icon={<Plus color={theme.colors.accent} size={22} />}
            label="Adicionar refeição"
            meta="Entra pelo fluxo de check-in atual."
            onPress={() => router.push("/app/check-in")}
          />
          <ActionRow
            icon={<Camera color={theme.colors.accent} size={22} />}
            label="Registrar por foto"
            meta="Use a câmera para registrar uma nova refeição."
            onPress={() => router.push("/app/photo-check-in")}
          />
          <ActionRow
            icon={<RefreshCcw color={theme.colors.accent} size={22} />}
            label="Reescanear dieta"
            meta="Atualize as metas a partir de um novo plano."
            onPress={() => router.push("/onboarding/diet-scan")}
          />
        </View>
      </ScaffoldCard>

      <ScaffoldCard title="Refeições planejadas" subtitle="Plano atual dividido por horário.">
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
                  {meal.macros.calories} kcal · {meal.macros.protein}g prot · {meal.macros.carbs}g carb ·{" "}
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

      <ScaffoldCard title="Histórico">
        <ActionRow
          icon={<ClipboardList color={theme.colors.accent} size={22} />}
          label="Histórico e filtros"
          meta="Consulte registros anteriores por período e tipo."
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
    justifyContent: "space-between",
    gap: 12,
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
