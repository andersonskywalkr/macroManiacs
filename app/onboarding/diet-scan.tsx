import { router } from "expo-router";
import { Target } from "lucide-react-native";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { useCreateManualDiet } from "@/hooks/useBackendReadyData";

export default function DietScanScreen() {
  const [calories, setCalories] = useState("1700");
  const [protein, setProtein] = useState("125");
  const [carbs, setCarbs] = useState("140");
  const [fat, setFat] = useState("55");
  const manualDietMutation = useCreateManualDiet();

  function createMacroTargets() {
    const dailyTargets = {
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
    };

    if (
      dailyTargets.calories <= 0 ||
      dailyTargets.protein <= 0 ||
      dailyTargets.carbs <= 0 ||
      dailyTargets.fat <= 0
    ) {
      Alert.alert("Revise as metas", "Todos os macros precisam ser maiores que zero.");
      return;
    }

    manualDietMutation.mutate(
      {
        dailyTargets,
        days: [{ day: 1, dailyTargets, meals: [] }],
      },
      {
        onSuccess: () => router.push("/onboarding/diet-review"),
        onError: (error) => {
          Alert.alert(
            "Nao foi possivel salvar as metas",
            error instanceof Error ? error.message : "Revise os dados e tente novamente.",
          );
        },
      },
    );
  }

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Metas"
        title="Defina seus macros."
        subtitle="Informe suas metas diarias para liberar o contador do dia."
      />
      <View style={styles.form}>
        <ManiacInput
          keyboardType="number-pad"
          label="Kcal por dia"
          onChangeText={setCalories}
          value={calories}
        />
        <ManiacInput
          keyboardType="number-pad"
          label="Proteina (g)"
          onChangeText={setProtein}
          value={protein}
        />
        <ManiacInput
          keyboardType="number-pad"
          label="Carbo (g)"
          onChangeText={setCarbs}
          value={carbs}
        />
        <ManiacInput
          keyboardType="number-pad"
          label="Gordura (g)"
          onChangeText={setFat}
          value={fat}
        />
      </View>
      <ManiacButton
        icon={<Target color="#FFFFFF" size={18} />}
        label="Salvar metas"
        loading={manualDietMutation.isPending}
        onPress={createMacroTargets}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
    marginBottom: 18,
  },
});
