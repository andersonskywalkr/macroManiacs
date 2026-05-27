import { StyleSheet, Text, View } from "react-native";
import { MedalBadge } from "@/components/achievements/MedalBadge";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useRanking } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function RankingScreen() {
  const theme = useAppTheme();
  const { data: ranking, isLoading } = useRanking();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Ranking"
        title="A briga da semana."
        subtitle="Ranking atualizado. Ana abriu 40 pontos."
      />
      {isLoading || !ranking ? (
        <LoadingManiac />
      ) : (
        <View style={styles.list}>
          {ranking.entries.map((entry) => (
            <ManiacCard key={entry.userId} strong={entry.isCurrentUser}>
              <View style={styles.row}>
                <Text style={[styles.position, { color: theme.colors.accent }]}>
                  #{entry.position}
                </Text>
                <View style={styles.copyWrap}>
                  <Text style={[styles.name, { color: theme.colors.text }]}>
                    {entry.name}
                  </Text>
                  <Text style={[styles.meta, { color: theme.colors.mutedText }]}>
                    @{entry.username} · {entry.streak} dias · {entry.points} pts
                  </Text>
                </View>
              </View>
              {entry.medals[0] ? (
                <View style={styles.medal}>
                  <MedalBadge medal={entry.medals[0]} />
                </View>
              ) : null}
            </ManiacCard>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 14,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
  },
  position: {
    fontSize: 26,
    fontWeight: "900",
    width: 52,
  },
  copyWrap: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "900",
  },
  meta: {
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },
  medal: {
    marginTop: 14,
  },
});
