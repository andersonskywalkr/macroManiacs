import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/store/theme.store";
import { ManiacCard } from "./ManiacCard";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  const theme = useAppTheme();

  return (
    <ManiacCard>
      <View style={styles.icon}>{icon}</View>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: theme.colors.mutedText }]}>
        {description}
      </Text>
    </ManiacCard>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 0,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
});
