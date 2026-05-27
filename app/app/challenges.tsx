import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, CheckCircle2, Flag, PlusCircle } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  DesignScaffold,
  MetricTile,
  ScaffoldCard,
} from "@/components/layout/DesignScaffold";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useGroupById, useGroupChallenges, useMyChallenges } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";
import type { Challenge } from "@/types/challenge";

const palette = {
  ink: "#280060",
  cream: "#FDF9ED",
  lavender: "#DCCAF6",
  green: "#A9C984",
  yellow: "#F5C779",
};

const typeLabels: Record<Challenge["type"], string> = {
  daily_checkin: "Check-in diario",
  water_goal: "Agua",
  protein_goal: "Proteina",
  calorie_goal: "Calorias",
  no_ultra_processed: "Sem ultraprocessados",
  breakfast_checkin: "Cafe da manha",
  manual: "Manual",
};

function progressOf(challenge: Challenge) {
  const value = challenge.currentProgress ?? challenge.userProgress?.currentProgress ?? 0;
  return Math.max(0, Math.min(100, challenge.goal ? (value / challenge.goal) * 100 : 0));
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const theme = useAppTheme();
  const current = challenge.currentProgress ?? challenge.userProgress?.currentProgress ?? 0;
  const progress = progressOf(challenge);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/app/challenge-detail/${challenge.id}` as any)}
      style={({ pressed }) => [
        styles.challengeCard,
        {
          backgroundColor: theme.name === "dark" ? theme.colors.cardStrong : palette.cream,
          borderColor: theme.name === "dark" ? theme.colors.border : palette.ink,
        },
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={styles.challengeHeader}>
        <View style={styles.flagBox}>
          <Flag color={palette.ink} size={22} />
        </View>
        <View style={styles.challengeCopy}>
          <Text numberOfLines={1} style={[styles.challengeTitle, { color: theme.colors.text }]}>
            {challenge.title}
          </Text>
          <Text numberOfLines={2} style={[styles.challengeMeta, { color: theme.colors.mutedText }]}>
            {typeLabels[challenge.type]} - {challenge.rewardPoints} pts
          </Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.challengeFooter}>
        <Text style={[styles.progressText, { color: theme.colors.text }]}>
          {current}/{challenge.goal}
        </Text>
        <Text style={[styles.challengeMeta, { color: theme.colors.mutedText }]}>
          {challenge.participantsCount} participantes
        </Text>
      </View>
    </Pressable>
  );
}

export default function ChallengesScreen() {
  const theme = useAppTheme();
  const { groupId } = useLocalSearchParams<{ groupId?: string }>();
  const { data: group } = useGroupById(groupId ?? "");
  const groupChallenges = useGroupChallenges(groupId);
  const myChallenges = useMyChallenges();
  const challenges = groupId ? groupChallenges.data ?? [] : myChallenges.data ?? [];
  const isLoading = groupId ? groupChallenges.isLoading : myChallenges.isLoading;
  const completed = challenges.filter((challenge) => challenge.completed).length;
  const totalReward = challenges.reduce((sum, challenge) => sum + challenge.rewardPoints, 0);

  return (
    <DesignScaffold
      eyebrow={groupId ? "Grupo" : "Desafios"}
      title={groupId ? "Desafios do grupo" : "Meus desafios"}
      subtitle={group?.name ?? "Acompanhe metas coletivas e seu progresso."}
    >
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft color={palette.ink} size={20} />
        <Text style={styles.backText}>Voltar</Text>
      </Pressable>

      <ScaffoldCard title="Resumo">
        <View style={styles.metrics}>
          <MetricTile accent={theme.colors.accent} label="ativos" value={`${challenges.length}`} />
          <MetricTile accent={theme.colors.success} label="concluidos" value={`${completed}`} />
          <MetricTile accent={theme.colors.danger} label="pontos" value={`${totalReward}`} />
        </View>
      </ScaffoldCard>

      {groupId ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push(`/app/create-challenge?groupId=${groupId}` as any)}
          style={styles.createButton}
        >
          <PlusCircle color={palette.ink} size={22} />
          <Text style={styles.createText}>Criar desafio</Text>
        </Pressable>
      ) : null}

      <ScaffoldCard
        title={groupId ? "Disponiveis" : "Em andamento"}
        subtitle="Toque em um desafio para ver detalhes, entrar ou atualizar progresso."
      >
        {isLoading ? (
          <LoadingManiac />
        ) : challenges.length ? (
          <View style={styles.list}>
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <CheckCircle2 color={palette.ink} size={28} />
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
              Nenhum desafio por aqui
            </Text>
            <Text style={[styles.emptyCopy, { color: theme.colors.mutedText }]}>
              Crie um desafio no grupo ou entre em um desafio disponivel.
            </Text>
          </View>
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
  metrics: {
    flexDirection: "row",
    gap: 12,
  },
  createButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: palette.yellow,
    borderColor: palette.ink,
    borderRadius: 999,
    borderWidth: 2,
    flexDirection: "row",
    gap: 8,
    minHeight: 48,
    paddingHorizontal: 16,
  },
  createText: {
    color: palette.ink,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 20,
  },
  list: {
    gap: 12,
  },
  challengeCard: {
    borderRadius: 24,
    borderWidth: 2,
    gap: 12,
    padding: 14,
  },
  pressed: {
    opacity: 0.78,
  },
  challengeHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  flagBox: {
    alignItems: "center",
    backgroundColor: palette.green,
    borderColor: palette.ink,
    borderRadius: 18,
    borderWidth: 2,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  challengeCopy: {
    flex: 1,
  },
  challengeTitle: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 24,
  },
  challengeMeta: {
    fontFamily: "Baloo2-Medium",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 19,
  },
  progressTrack: {
    backgroundColor: palette.lavender,
    borderColor: palette.ink,
    borderRadius: 999,
    borderWidth: 2,
    height: 18,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: palette.green,
    height: "100%",
  },
  challengeFooter: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressText: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 21,
  },
  emptyState: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 22,
  },
  emptyTitle: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 25,
  },
  emptyCopy: {
    fontFamily: "Baloo2-Medium",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    textAlign: "center",
  },
});
