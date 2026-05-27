import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, CalendarDays, MessageCircle, Send, Trophy, UserPlus, UsersRound } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  ActionRow,
  DesignScaffold,
  MetricTile,
  ScaffoldCard,
} from "@/components/layout/DesignScaffold";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useGroupById } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

const palette = {
  ink: "#280060",
  cream: "#FDF9ED",
  lavender: "#DCCAF6",
  accent: "#A870DB",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function GroupDetailScreen() {
  const theme = useAppTheme();
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  const { data: group, isLoading } = useGroupById(groupId ?? "");
  const period = group?.startsAt && group.endsAt ? `${group.startsAt} - ${group.endsAt}` : "Período ativo";

  if (isLoading || !group) {
    return (
      <DesignScaffold eyebrow="Grupo" title="Carregando" subtitle="Buscando dados do grupo.">
        <ScaffoldCard>
          <LoadingManiac />
        </ScaffoldCard>
      </DesignScaffold>
    );
  }

  return (
    <DesignScaffold eyebrow="Grupo" title={group.name} subtitle={group.currentChallenge}>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft color={palette.ink} size={20} />
        <Text style={styles.backText}>Voltar aos grupos</Text>
      </Pressable>

      <ScaffoldCard>
        <View style={styles.hero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(group.name)}</Text>
          </View>
          <View style={styles.heroCopy}>
            <Text style={[styles.heroTitle, { color: theme.colors.text }]}>{group.name}</Text>
            <Text style={[styles.heroMeta, { color: theme.colors.mutedText }]}>
              Convite {group.inviteCode} · {group.role === "admin" ? "Admin" : "Membro"}
            </Text>
          </View>
        </View>
      </ScaffoldCard>

      <ScaffoldCard title="Desempenho no grupo">
        <View style={styles.metrics}>
          <MetricTile accent={theme.colors.accent} label="posição" value={`#${group.rankingPosition ?? "-"}`} />
          <MetricTile accent={theme.colors.success} label="pontos" value={`${group.points ?? 0}`} />
          <MetricTile accent={theme.colors.danger} label="sequência" value={`${group.streak ?? 0}d`} />
        </View>
      </ScaffoldCard>

      <ScaffoldCard title="Detalhes do desafio">
        <View style={styles.detailList}>
          <View style={styles.detailRow}>
            <CalendarDays color={palette.ink} size={21} />
            <View style={styles.detailCopy}>
              <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Duração</Text>
              <Text style={[styles.detailValue, { color: theme.colors.mutedText }]}>{period}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <UsersRound color={palette.ink} size={21} />
            <View style={styles.detailCopy}>
              <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Integrantes</Text>
              <Text style={[styles.detailValue, { color: theme.colors.mutedText }]}>
                {group.membersCount} pessoas participando
              </Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Trophy color={palette.ink} size={21} />
            <View style={styles.detailCopy}>
              <Text style={[styles.detailLabel, { color: theme.colors.text }]}>Meta da semana</Text>
              <Text style={[styles.detailValue, { color: theme.colors.mutedText }]}>
                {group.weeklyGoal ?? "Manter consistência"}
              </Text>
            </View>
          </View>
        </View>
      </ScaffoldCard>

      <ScaffoldCard title="Ações">
        <View style={styles.stack}>
          <ActionRow
            icon={<MessageCircle color={theme.colors.accent} size={22} />}
            label="Feed do grupo"
            meta="Veja check-ins e movimentações recentes."
            onPress={() => router.push(`/app/feed?groupId=${group.id}` as any)}
          />
          <ActionRow
            icon={<Trophy color={theme.colors.accent} size={22} />}
            label="Ranking completo"
            meta="Compare sua posição com todos os membros."
            onPress={() => router.push(`/app/ranking?groupId=${group.id}` as any)}
          />
          <ActionRow
            icon={<Send color={theme.colors.accent} size={22} />}
            label="Chat"
            meta="Abra a conversa do grupo."
            onPress={() => router.push("/app/chat")}
          />
          <ActionRow
            icon={<UserPlus color={theme.colors.accent} size={22} />}
            label="Convidar"
            meta={`Código ${group.inviteCode}`}
          />
        </View>
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
    gap: 16,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: palette.accent,
    borderColor: palette.ink,
    borderRadius: 30,
    borderWidth: 3,
    height: 82,
    justifyContent: "center",
    width: 82,
  },
  avatarText: {
    color: palette.cream,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 30,
    fontWeight: "800",
    lineHeight: 35,
  },
  heroCopy: {
    flex: 1,
  },
  heroTitle: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 26,
    fontWeight: "800",
    lineHeight: 31,
  },
  heroMeta: {
    fontFamily: "Baloo2-Medium",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 21,
    marginTop: 4,
  },
  metrics: {
    flexDirection: "row",
    gap: 12,
  },
  detailList: {
    gap: 14,
  },
  detailRow: {
    alignItems: "center",
    backgroundColor: palette.lavender,
    borderColor: palette.ink,
    borderRadius: 22,
    borderWidth: 2,
    flexDirection: "row",
    gap: 12,
    minHeight: 68,
    paddingHorizontal: 14,
  },
  detailCopy: {
    flex: 1,
  },
  detailLabel: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 21,
  },
  detailValue: {
    fontFamily: "Baloo2-Medium",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 2,
  },
  stack: {
    gap: 12,
  },
});
