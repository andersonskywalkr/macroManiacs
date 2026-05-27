import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, CheckCircle2, Flag, Plus, Trophy, UsersRound } from "lucide-react-native";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import {
  DesignScaffold,
  MetricTile,
  ScaffoldCard,
} from "@/components/layout/DesignScaffold";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import {
  useChallengeDetail,
  useFinishChallenge,
  useJoinChallenge,
  useUpdateChallengeProgress,
} from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";
import type { Challenge } from "@/types/challenge";

const palette = {
  ink: "#280060",
  cream: "#FDF9ED",
  lavender: "#DCCAF6",
  green: "#A9C984",
  yellow: "#F5C779",
};

const manualTypes: Challenge["type"][] = ["manual", "water_goal", "no_ultra_processed"];

const typeLabels: Record<Challenge["type"], string> = {
  daily_checkin: "Check-in diario",
  water_goal: "Agua",
  protein_goal: "Proteina",
  calorie_goal: "Calorias",
  no_ultra_processed: "Sem ultraprocessados",
  breakfast_checkin: "Cafe da manha",
  manual: "Manual",
};

function progressPercent(challenge: Challenge) {
  const current = challenge.currentProgress ?? challenge.userProgress?.currentProgress ?? 0;
  return Math.max(0, Math.min(100, challenge.goal ? (current / challenge.goal) * 100 : 0));
}

export default function ChallengeDetailScreen() {
  const theme = useAppTheme();
  const { challengeId } = useLocalSearchParams<{ challengeId: string }>();
  const { data: challenge, isLoading } = useChallengeDetail(challengeId);
  const joinChallenge = useJoinChallenge();
  const updateProgress = useUpdateChallengeProgress();
  const finishChallenge = useFinishChallenge();

  if (isLoading || !challenge) {
    return (
      <DesignScaffold eyebrow="Desafio" title="Carregando" subtitle="Buscando detalhes.">
        <ScaffoldCard>
          <LoadingManiac />
        </ScaffoldCard>
      </DesignScaffold>
    );
  }

  const current = challenge.currentProgress ?? challenge.userProgress?.currentProgress ?? 0;
  const progress = progressPercent(challenge);
  const canUpdate = manualTypes.includes(challenge.type) && challenge.status === "active";
  const hasJoined = Boolean(challenge.userProgress) || current > 0;

  function handleJoin() {
    joinChallenge.mutate(challenge.id, {
      onSuccess: () => Alert.alert("Desafio iniciado", "Voce entrou no desafio."),
      onError: (error) =>
        Alert.alert(
          "Nao foi possivel entrar",
          error instanceof Error ? error.message : "Tente novamente.",
        ),
    });
  }

  function handleProgress() {
    updateProgress.mutate(
      { challengeId: challenge.id, increment: 1 },
      {
        onSuccess: () => Alert.alert("Progresso atualizado", "Mais um passo registrado."),
        onError: (error) =>
          Alert.alert(
            "Nao foi possivel atualizar",
            error instanceof Error ? error.message : "Tente novamente.",
          ),
      },
    );
  }

  function handleFinish() {
    finishChallenge.mutate(challenge.id, {
      onSuccess: () => Alert.alert("Desafio encerrado", "O desafio foi finalizado."),
      onError: (error) =>
        Alert.alert(
          "Nao foi possivel encerrar",
          error instanceof Error ? error.message : "Tente novamente.",
        ),
    });
  }

  return (
    <DesignScaffold eyebrow="Desafio" title={challenge.title} subtitle={challenge.description}>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft color={palette.ink} size={20} />
        <Text style={styles.backText}>Voltar</Text>
      </Pressable>

      <ScaffoldCard>
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Flag color={palette.ink} size={28} />
          </View>
          <View style={styles.heroCopy}>
            <Text style={[styles.heroTitle, { color: theme.colors.text }]}>
              {typeLabels[challenge.type]}
            </Text>
            <Text style={[styles.heroMeta, { color: theme.colors.mutedText }]}>
              {challenge.groupName ?? "Grupo"} - {challenge.status}
            </Text>
          </View>
        </View>
      </ScaffoldCard>

      <ScaffoldCard title="Progresso">
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <View style={styles.progressRow}>
          <Text style={[styles.progressValue, { color: theme.colors.text }]}>
            {current}/{challenge.goal}
          </Text>
          <Text style={[styles.progressMeta, { color: theme.colors.mutedText }]}>
            {Math.round(progress)}%
          </Text>
        </View>
      </ScaffoldCard>

      <ScaffoldCard title="Recompensa">
        <View style={styles.metrics}>
          <MetricTile accent={theme.colors.accent} label="pontos" value={`${challenge.rewardPoints}`} />
          <MetricTile accent={theme.colors.success} label="participantes" value={`${challenge.participantsCount}`} />
          <MetricTile accent={theme.colors.danger} label="dias" value={`${challenge.daysRemaining ?? "-"}`} />
        </View>
      </ScaffoldCard>

      <ScaffoldCard title="Acoes">
        <View style={styles.actions}>
          {!hasJoined ? (
            <ManiacButton
              icon={<CheckCircle2 color="#FFFFFF" size={18} />}
              label="Entrar no desafio"
              loading={joinChallenge.isPending}
              onPress={handleJoin}
            />
          ) : null}
          {canUpdate ? (
            <ManiacButton
              icon={<Plus color="#FFFFFF" size={18} />}
              label="Adicionar progresso"
              loading={updateProgress.isPending}
              onPress={handleProgress}
            />
          ) : null}
          <ManiacButton
            label="Encerrar desafio"
            loading={finishChallenge.isPending}
            onPress={handleFinish}
            variant="secondary"
          />
        </View>
      </ScaffoldCard>

      <ScaffoldCard title="Ranking interno">
        {challenge.ranking?.length ? (
          <View style={styles.rankingList}>
            {challenge.ranking.map((participant, index) => (
              <View key={`${participant.userId}-${index}`} style={styles.rankingRow}>
                <View style={styles.rankIcon}>
                  {index === 0 ? (
                    <Trophy color={palette.ink} size={18} />
                  ) : (
                    <UsersRound color={palette.ink} size={18} />
                  )}
                </View>
                <View style={styles.rankCopy}>
                  <Text style={[styles.rankName, { color: theme.colors.text }]}>
                    {participant.name}
                  </Text>
                  <Text style={[styles.rankMeta, { color: theme.colors.mutedText }]}>
                    {participant.currentProgress}/{challenge.goal}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text style={[styles.rankMeta, { color: theme.colors.mutedText }]}>
            O ranking aparece quando houver participantes.
          </Text>
        )}
      </ScaffoldCard>
    </DesignScaffold>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: palette.lavender,
    borderColor: palette.ink,
    borderRadius: 999,
    borderWidth: 2,
    flexDirection: "row",
    gap: 8,
    minHeight: 42,
    paddingHorizontal: 14,
  },
  backText: {
    color: palette.ink,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 19,
  },
  hero: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
  },
  heroIcon: {
    alignItems: "center",
    backgroundColor: palette.yellow,
    borderColor: palette.ink,
    borderRadius: 24,
    borderWidth: 3,
    height: 68,
    justifyContent: "center",
    width: 68,
  },
  heroCopy: {
    flex: 1,
  },
  heroTitle: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 29,
  },
  heroMeta: {
    fontFamily: "Baloo2-Medium",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 4,
  },
  progressTrack: {
    backgroundColor: palette.lavender,
    borderColor: palette.ink,
    borderRadius: 999,
    borderWidth: 2,
    height: 22,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: palette.green,
    height: "100%",
  },
  progressRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  progressValue: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 29,
  },
  progressMeta: {
    fontFamily: "Baloo2-Bold",
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 19,
  },
  metrics: {
    flexDirection: "row",
    gap: 12,
  },
  actions: {
    gap: 10,
  },
  rankingList: {
    gap: 10,
  },
  rankingRow: {
    alignItems: "center",
    backgroundColor: palette.lavender,
    borderColor: palette.ink,
    borderRadius: 20,
    borderWidth: 2,
    flexDirection: "row",
    gap: 12,
    minHeight: 62,
    paddingHorizontal: 12,
  },
  rankIcon: {
    alignItems: "center",
    backgroundColor: palette.green,
    borderColor: palette.ink,
    borderRadius: 14,
    borderWidth: 2,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  rankCopy: {
    flex: 1,
  },
  rankName: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 21,
  },
  rankMeta: {
    fontFamily: "Baloo2-Medium",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 19,
  },
});
