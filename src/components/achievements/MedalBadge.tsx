import { StyleSheet, Text, View } from "react-native";
import { Medal as MedalIcon } from "lucide-react-native";
import type { Medal } from "@/types/achievements";
import { useAppTheme } from "@/store/theme.store";

type MedalBadgeProps = {
  medal: Medal;
};

export function MedalBadge({ medal }: MedalBadgeProps) {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: theme.colors.cardStrong,
          borderColor: medal.equipped ? theme.colors.accent : theme.colors.border,
        },
      ]}
    >
      <MedalIcon
        color={medal.unlocked ? theme.colors.accent : theme.colors.mutedText}
        size={18}
      />
      <Text style={[styles.name, { color: theme.colors.text }]}>{medal.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  name: {
    fontSize: 12,
    fontWeight: "900",
  },
});
