import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/store/theme.store";

type MacroProgressBarProps = {
  label: string;
  consumed: number;
  target: number;
  percentage: number;
  unit: "g" | "kcal";
  color?: string;
};

export function MacroProgressBar({
  label,
  consumed,
  target,
  percentage,
  unit,
  color,
}: MacroProgressBarProps) {
  const theme = useAppTheme();
  const cappedPercentage = Math.min(percentage, 100);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
        <Text style={[styles.value, { color: theme.colors.mutedText }]}>
          {consumed}
          {unit} / {target}
          {unit}
        </Text>
      </View>
      <View style={[styles.track, { backgroundColor: theme.colors.backgroundAlt }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${cappedPercentage}%`,
              backgroundColor: color ?? theme.colors.primary,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  value: {
    fontSize: 12,
    fontWeight: "800",
  },
  track: {
    borderRadius: 999,
    height: 12,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 999,
    height: "100%",
  },
});
