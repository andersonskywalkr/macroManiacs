import { router, type Href } from "expo-router";
import { CheckCircle2, Utensils } from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useActiveDiet, usePlannedMealCheckIn } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function PlannedMealScreen() {
  const theme = useAppTheme();
  const confirmMutation = usePlannedMealCheckIn();
  const { data: diet, isLoading } = useActiveDiet();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedDay = diet?.days[0]?.day ?? 1;
  const selectedMeal = diet?.meals[selectedIndex];

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Refeição planejada"
        title="Escolhe a marmita."
        subtitle="Cumpriu o plano? O ranking precisa saber."
      />
      {isLoading || !diet ? (
        <LoadingManiac />
      ) : (
        <View style={styles.list}>
          {diet.meals.map((meal, index) => (
            <Pressable key={meal.id} onPress={() => setSelectedIndex(index)}>
              <ManiacCard strong={index === selectedIndex}>
                <View style={styles.row}>
                  <View style={[styles.icon, { backgroundColor: theme.colors.primary }]}>
                    <Utensils color="#FFFFFF" size={22} />
                  </View>
                  <View style={styles.copy}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>
                      {meal.name}
                    </Text>
                    <Text style={[styles.meta, { color: theme.colors.mutedText }]}>
                      {meal.time} · {meal.macros.protein}g proteína ·{" "}
                      {meal.macros.calories} kcal
                    </Text>
                  </View>
                </View>
              </ManiacCard>
            </Pressable>
          ))}
        </View>
      )}
      <ManiacButton
        icon={<CheckCircle2 color="#FFFFFF" size={18} />}
        label="Confirmar refeição"
        loading={confirmMutation.isPending}
        onPress={() => {
          if (!diet || !selectedMeal) {
            Alert.alert("Escolha uma refeicao", "Selecione uma refeicao planejada para registrar.");
            return;
          }

          confirmMutation.mutate(
            {
              dietId: diet.id,
              day: selectedDay,
              mealName: selectedMeal.name,
            },
            {
              onSuccess: () => router.push("/app/check-in-success" as Href),
              onError: (error) => {
                Alert.alert(
                  "Nao foi possivel registrar",
                  error instanceof Error ? error.message : "Tente novamente.",
                );
              },
            },
          );
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
    marginBottom: 18,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
  },
  icon: {
    alignItems: "center",
    borderRadius: 18,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  copy: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  meta: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 4,
  },
});
