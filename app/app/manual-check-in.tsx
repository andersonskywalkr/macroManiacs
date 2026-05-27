import { router } from "expo-router";
import { CheckCircle2 } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { useManualCheckIn } from "@/hooks/useBackendReadyData";

export default function ManualCheckInScreen() {
  const [mealName, setMealName] = useState("Almoco manual");
  const [calories, setCalories] = useState("600");
  const [protein, setProtein] = useState("40");
  const [carbs, setCarbs] = useState("70");
  const [fat, setFat] = useState("15");
  const confirmMutation = useManualCheckIn();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Manual"
        title="Registra na mao"
        subtitle="Fluxo simples para produto ou refeicao fora do plano."
      />
      <View style={styles.form}>
        <ManiacInput label="Nome" onChangeText={setMealName} value={mealName} />
        <ManiacInput
          keyboardType="number-pad"
          label="Kcal"
          onChangeText={setCalories}
          value={calories}
        />
        <ManiacInput
          keyboardType="number-pad"
          label="Proteina"
          onChangeText={setProtein}
          value={protein}
        />
        <ManiacInput
          keyboardType="number-pad"
          label="Carbo"
          onChangeText={setCarbs}
          value={carbs}
        />
        <ManiacInput
          keyboardType="number-pad"
          label="Gordura"
          onChangeText={setFat}
          value={fat}
        />
      </View>
      <ManiacButton
        icon={<CheckCircle2 color="#FFFFFF" size={18} />}
        label="Confirmar check-in"
        loading={confirmMutation.isPending}
        onPress={() =>
          confirmMutation.mutate(
            {
              title: mealName,
              macros: {
                calories: Number(calories) || 0,
                protein: Number(protein) || 0,
                carbs: Number(carbs) || 0,
                fat: Number(fat) || 0,
              },
            },
            {
            onSuccess: () => router.push("/app/check-in-success"),
            },
          )
        }
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
