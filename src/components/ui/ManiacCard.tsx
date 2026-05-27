import type { ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { useAppTheme } from "@/store/theme.store";

type ManiacCardProps = {
  children: ReactNode;
  style?: ViewStyle;
  strong?: boolean;
};

export function ManiacCard({ children, style, strong }: ManiacCardProps) {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: strong ? theme.colors.cardStrong : theme.colors.card,
          borderColor: theme.colors.border,
          shadowColor: theme.colors.primary,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 24,
  },
});
