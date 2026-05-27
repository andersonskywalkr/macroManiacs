import { StyleSheet, Text, TextInput, type TextInputProps, View } from "react-native";
import { useAppTheme } from "@/store/theme.store";

type ManiacInputProps = TextInputProps & {
  label: string;
};

export function ManiacInput({ label, style, ...props }: ManiacInputProps) {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.primarySoft }]}>
        {label}
      </Text>
      <TextInput
        placeholderTextColor={theme.colors.mutedText}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.card,
            borderColor: theme.colors.border,
            color: theme.colors.text,
          },
          style,
        ]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase",
  },
  input: {
    borderRadius: 18,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "700",
    minHeight: 54,
    paddingHorizontal: 16,
  },
});
