import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@/store/theme.store";

type LoadingManiacProps = {
  message?: string;
};

export function LoadingManiac({
  message = "Caçando proteína...",
}: LoadingManiacProps) {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.colors.primary} size="large" />
      <Text style={[styles.message, { color: theme.colors.mutedText }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
    justifyContent: "center",
    padding: 24,
  },
  message: {
    fontSize: 14,
    fontWeight: "800",
  },
});
