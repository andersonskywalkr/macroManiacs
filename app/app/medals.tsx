import { StyleSheet, Text, View } from "react-native";
import { MedalBadge } from "@/components/achievements/MedalBadge";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { useAchievements } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function MedalsScreen() {
  const theme = useAppTheme();
  const { data, isLoading } = useAchievements();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Conquistas"
        title="Medalhas e badges"
        subtitle="Colecao visual do avatar."
      />
      {isLoading || !data ? (
        <LoadingManiac />
      ) : (
        <>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Medalhas
          </Text>
          <View style={styles.list}>
            {data.medals.map((medal) => (
              <MedalBadge key={medal.id} medal={medal} />
            ))}
          </View>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Badges
          </Text>
          <View style={styles.list}>
            {data.badges.map((badge) => (
              <ManiacCard key={badge.id}>
                <Text style={[styles.badgeName, { color: theme.colors.text }]}>
                  {badge.name}
                </Text>
                <Text style={[styles.badgeText, { color: theme.colors.mutedText }]}>
                  {badge.description}
                </Text>
              </ManiacCard>
            ))}
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 10,
    marginTop: 14,
  },
  list: {
    gap: 10,
  },
  badgeName: {
    fontSize: 17,
    fontWeight: "900",
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 6,
  },
});
