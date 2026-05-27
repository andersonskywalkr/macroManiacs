import { router } from "expo-router";
import { Flame, Trophy } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { MedalBadge } from "@/components/achievements/MedalBadge";
import { Screen } from "@/components/layout/Screen";
import { MacroCounterCard } from "@/components/macros/MacroCounterCard";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useLastCheckIn } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function CheckInSuccessScreen() {
  const theme = useAppTheme();
  const { data: result, isLoading } = useLastCheckIn();

  if (isLoading || !result) {
    return (
      <Screen>
        <LoadingManiac />
      </Screen>
    );
  }

  return (
    <Screen>
      <ManiacCard strong style={styles.hero}>
        <View style={[styles.trophy, { backgroundColor: theme.colors.accent }]}>
          <Trophy color="#000000" size={42} />
        </View>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Proteína batida. Hoje você não foi frango.
        </Text>
        <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
          +{result.pointsEarned} pontos · Ranking #{result.rankingPosition} atualizado.
        </Text>
      </ManiacCard>

      <MacroCounterCard macros={result.dailyMacros} />

      <View style={styles.medalBlock}>
        <View style={styles.medalTitle}>
          <Flame color={theme.colors.accent} size={20} />
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Recompensa desbloqueada
          </Text>
        </View>
        {result.unlockedMedals.map((medal) => (
          <MedalBadge key={medal.id} medal={medal} />
        ))}
        {result.unlockedBadges.map((badge) => (
          <ManiacCard key={badge.id}>
            <Text style={[styles.badgeName, { color: theme.colors.text }]}>{badge.name}</Text>
            <Text style={[styles.badgeCopy, { color: theme.colors.mutedText }]}>
              {badge.description}
            </Text>
          </ManiacCard>
        ))}
      </View>

      <View style={styles.actions}>
        <ManiacButton label="Voltar para Home" onPress={() => router.replace("/app/home")} />
        <ManiacButton
          label="Ver ranking"
          onPress={() => router.push("/app/ranking")}
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  trophy: {
    alignItems: "center",
    borderRadius: 999,
    height: 88,
    justifyContent: "center",
    width: 88,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 32,
    textAlign: "center",
  },
  copy: {
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
    textAlign: "center",
  },
  medalBlock: {
    gap: 12,
    marginVertical: 18,
  },
  medalTitle: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  badgeName: {
    fontSize: 17,
    fontWeight: "900",
  },
  badgeCopy: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 4,
  },
  actions: {
    gap: 10,
  },
});
