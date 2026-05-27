import { StyleSheet, Text, View } from "react-native";
import { Crown } from "lucide-react-native";
import type { Avatar } from "@/types/avatar";
import { useAppTheme } from "@/store/theme.store";

type AvatarPreviewProps = {
  avatar?: Avatar | null;
  size?: number;
};

export function AvatarPreview({ avatar, size = 96 }: AvatarPreviewProps) {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.outer,
        {
          height: size,
          width: size,
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.accent,
        },
      ]}
    >
      <View style={[styles.face, { backgroundColor: theme.colors.backgroundAlt }]}>
        <Text style={[styles.eyes, { color: theme.colors.text }]}>^ ^</Text>
        <Text style={[styles.mouth, { color: theme.colors.accent }]}>w</Text>
      </View>
      {avatar?.equippedMedals.length ? (
        <View style={[styles.medal, { backgroundColor: theme.colors.accent }]}>
          <Crown color="#000000" size={14} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 3,
    justifyContent: "center",
  },
  face: {
    alignItems: "center",
    borderRadius: 999,
    height: "68%",
    justifyContent: "center",
    width: "68%",
  },
  eyes: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
  },
  mouth: {
    fontSize: 16,
    fontWeight: "900",
    marginTop: -6,
  },
  medal: {
    alignItems: "center",
    borderRadius: 999,
    bottom: 4,
    height: 28,
    justifyContent: "center",
    position: "absolute",
    right: 0,
    width: 28,
  },
});
