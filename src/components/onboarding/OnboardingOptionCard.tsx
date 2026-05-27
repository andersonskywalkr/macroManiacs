import type { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckCircle2 } from "lucide-react-native";
import { useAppTheme } from "@/store/theme.store";
import { ManiacCard } from "../ui/ManiacCard";

type OnboardingOptionCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  selected?: boolean;
  onPress?: () => void;
};

export function OnboardingOptionCard({
  title,
  description,
  icon,
  selected,
  onPress,
}: OnboardingOptionCardProps) {
  const theme = useAppTheme();

  return (
    <TouchableOpacity activeOpacity={0.86} onPress={onPress}>
      <ManiacCard strong={selected} style={styles.card}>
        <View style={[styles.icon, { backgroundColor: theme.colors.primary }]}>
          {icon}
        </View>
        <View style={styles.copy}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
          <Text style={[styles.description, { color: theme.colors.mutedText }]}>
            {description}
          </Text>
        </View>
        {selected ? <CheckCircle2 color={theme.colors.accent} size={24} /> : null}
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
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  copy: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
});
