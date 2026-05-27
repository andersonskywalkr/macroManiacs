import type { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppTheme } from "@/store/theme.store";
import { ManiacCard } from "../ui/ManiacCard";

type CheckInOptionCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  onPress?: () => void;
};

export function CheckInOptionCard({
  title,
  description,
  icon,
  onPress,
}: CheckInOptionCardProps) {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      accessibilityLabel={title}
      accessibilityRole="button"
      activeOpacity={0.86}
      onPress={onPress}
    >
      <ManiacCard style={styles.card}>
        <View style={[styles.icon, { backgroundColor: theme.colors.primary }]}>
          {icon}
        </View>
        <View style={styles.copyWrap}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
          <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
            {description}
          </Text>
        </View>
      </ManiacCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
  },
  icon: {
    alignItems: "center",
    borderRadius: 18,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  copyWrap: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 4,
  },
  copy: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
});
