import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { useAppTheme } from "@/store/theme.store";

const maniacPalette = {
  background: "#E1CFF9",
  surface: "#FDF9ED",
  surfaceSoft: "#F8F1E2",
  ink: "#280060",
  inkSoft: "#471C81",
  lavender: "#DCCAF6",
  lavenderStrong: "#CDA7FF",
  accent: "#A870DB",
};

type DesignScaffoldProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

type ScaffoldCardProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
};

type MetricTileProps = {
  accent?: string;
  label: string;
  value: string;
};

type ActionRowProps = {
  icon?: ReactNode;
  label: string;
  meta?: string;
  onPress?: () => void;
};

export function DesignScaffold({ eyebrow, title, subtitle, children }: DesignScaffoldProps) {
  const theme = useAppTheme();
  const isDark = theme.name === "dark";

  return (
    <Screen>
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDark ? theme.colors.card : maniacPalette.lavender,
            borderColor: isDark ? theme.colors.border : maniacPalette.ink,
          },
        ]}
      >
        <Text style={[styles.eyebrow, { color: isDark ? theme.colors.accent : maniacPalette.inkSoft }]}>
          {eyebrow}
        </Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.mutedText }]}>{subtitle}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </Screen>
  );
}

export function ScaffoldCard({ children, title, subtitle, style }: ScaffoldCardProps) {
  const theme = useAppTheme();
  const isDark = theme.name === "dark";

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? theme.colors.cardStrong : maniacPalette.surface,
          borderColor: isDark ? theme.colors.border : maniacPalette.ink,
        },
        style,
      ]}
    >
      {title ? (
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{title}</Text>
          {subtitle ? (
            <Text style={[styles.cardSubtitle, { color: theme.colors.mutedText }]}>{subtitle}</Text>
          ) : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}

export function MetricTile({ accent, label, value }: MetricTileProps) {
  const theme = useAppTheme();
  const isDark = theme.name === "dark";

  return (
    <View
      style={[
        styles.metricTile,
        {
          backgroundColor: isDark ? "rgba(202, 161, 255, 0.12)" : maniacPalette.lavender,
          borderColor: isDark ? "rgba(202, 161, 255, 0.20)" : maniacPalette.ink,
        },
      ]}
    >
      <View style={[styles.metricDot, { backgroundColor: accent ?? theme.colors.accent }]} />
      <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.metricValue, { color: theme.colors.text }]}>
        {value}
      </Text>
      <Text numberOfLines={2} style={[styles.metricLabel, { color: theme.colors.mutedText }]}>
        {label}
      </Text>
    </View>
  );
}

export function ActionRow({ icon, label, meta, onPress }: ActionRowProps) {
  const theme = useAppTheme();
  const isDark = theme.name === "dark";

  return (
    <Pressable
      accessibilityRole={onPress ? "button" : undefined}
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionRow,
        {
          backgroundColor: isDark ? "rgba(202, 161, 255, 0.12)" : maniacPalette.surfaceSoft,
          borderColor: isDark ? "rgba(202, 161, 255, 0.18)" : maniacPalette.ink,
        },
        pressed && onPress ? styles.pressed : null,
      ]}
    >
      {icon ? (
        <View
          style={[
            styles.actionIcon,
            { backgroundColor: isDark ? "rgba(245, 199, 121, 0.16)" : maniacPalette.lavender },
          ]}
        >
          {icon}
        </View>
      ) : null}
      <View style={styles.actionCopy}>
        <Text style={[styles.actionLabel, { color: theme.colors.text }]}>{label}</Text>
        {meta ? <Text style={[styles.actionMeta, { color: theme.colors.mutedText }]}>{meta}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    borderRadius: 34,
    borderWidth: 3,
    marginBottom: 18,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  eyebrow: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 38,
  },
  subtitle: {
    fontFamily: "Baloo2-Medium",
    fontSize: 17,
    fontWeight: "500",
    lineHeight: 24,
    marginTop: 10,
  },
  content: {
    gap: 16,
    paddingBottom: 92,
  },
  card: {
    borderRadius: 32,
    borderWidth: 3,
    elevation: 1,
    padding: 20,
    shadowColor: "#280060",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 23,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 28,
  },
  cardSubtitle: {
    fontFamily: "Baloo2-Medium",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 21,
    marginTop: 6,
  },
  metricTile: {
    borderRadius: 22,
    borderWidth: 2,
    flex: 1,
    minHeight: 100,
    padding: 14,
  },
  metricDot: {
    borderRadius: 999,
    height: 11,
    marginBottom: 10,
    width: 11,
  },
  metricValue: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 28,
  },
  metricLabel: {
    fontFamily: "Baloo2-Bold",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 4,
  },
  actionRow: {
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 2,
    flexDirection: "row",
    gap: 14,
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pressed: {
    opacity: 0.78,
  },
  actionIcon: {
    alignItems: "center",
    borderColor: maniacPalette.ink,
    borderRadius: 16,
    borderWidth: 2,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  actionCopy: {
    flex: 1,
  },
  actionLabel: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 18,
    fontWeight: "800",
    lineHeight: 23,
  },
  actionMeta: {
    fontFamily: "Baloo2-Medium",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 3,
  },
});
