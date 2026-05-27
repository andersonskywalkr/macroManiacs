import { StyleSheet, Text, View } from "react-native";
import { Trophy } from "lucide-react-native";
import { colors } from "@/constants/colors";
import type { DailyMacros } from "@/types/macros";
import { useAppTheme } from "@/store/theme.store";
import { ManiacCard } from "../ui/ManiacCard";
import { MacroProgressBar } from "./MacroProgressBar";

type MacroCounterCardProps = {
  macros: DailyMacros;
};

export function MacroCounterCard({ macros }: MacroCounterCardProps) {
  const theme = useAppTheme();

  return (
    <ManiacCard strong>
      <View style={styles.header}>
        <View>
          <Text style={[styles.eyebrow, { color: theme.colors.primarySoft }]}>
            CONTADOR DO DIA
          </Text>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Faltam {macros.protein.remaining}g de proteína.
          </Text>
        </View>
        <View style={[styles.points, { backgroundColor: theme.colors.accent }]}>
          <Trophy color={colors.darkInk} size={18} />
        </View>
      </View>
      <View style={styles.bars}>
        <MacroProgressBar
          label="Kcal"
          consumed={macros.calories.consumed}
          target={macros.calories.target}
          percentage={macros.calories.percentage}
          unit="kcal"
          color={theme.colors.accent}
        />
        <MacroProgressBar
          label="Proteina"
          consumed={macros.protein.consumed}
          target={macros.protein.target}
          percentage={macros.protein.percentage}
          unit="g"
        />
        <MacroProgressBar
          label="Carbo"
          consumed={macros.carbs.consumed}
          target={macros.carbs.target}
          percentage={macros.carbs.percentage}
          unit="g"
          color={colors.electricCyan}
        />
        <MacroProgressBar
          label="Gordura"
          consumed={macros.fat.consumed}
          target={macros.fat.target}
          percentage={macros.fat.percentage}
          unit="g"
          color={theme.colors.danger}
        />
      </View>
    </ManiacCard>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0,
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 26,
    maxWidth: 240,
  },
  points: {
    alignItems: "center",
    borderRadius: 999,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  bars: {
    gap: 14,
  },
});
