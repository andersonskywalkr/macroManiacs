import type { ReactNode } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAppTheme } from "@/store/theme.store";

type ManiacButtonProps = {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
};

export function ManiacButton({
  label,
  onPress,
  icon,
  variant = "primary",
  loading,
}: ManiacButtonProps) {
  const theme = useAppTheme();
  const isPrimary = variant === "primary";
  const isGhost = variant === "ghost";

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.84}
      disabled={loading}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: isGhost
            ? "transparent"
            : isPrimary
              ? theme.colors.primary
              : theme.colors.cardStrong,
          borderColor: isGhost ? theme.colors.border : "transparent",
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.text} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.label,
              { color: isPrimary ? "#FFFFFF" : theme.colors.text },
            ]}
          >
            {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0,
  },
});
