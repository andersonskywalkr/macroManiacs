import { router } from "expo-router";
import { ChevronRight, Flag, PlusCircle, Ticket, Trophy, UsersRound } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ActionRow, DesignScaffold, MetricTile, ScaffoldCard } from "@/components/layout/DesignScaffold";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useGroups } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";
import type { Group } from "@/types/group";

const groupColors = ["#A870DB", "#A9C984", "#F5C779", "#B36464", "#CDA7FF"];
const palette = {
  ink: "#280060",
  cream: "#FDF9ED",
  softCream: "#F8F1E2",
  lavender: "#DCCAF6",
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

function GroupCapsule({ group, index }: { group: Group; index: number }) {
  const theme = useAppTheme();
  const isDark = theme.name === "dark";
  const avatarColor = groupColors[index % groupColors.length];
  const period = group.startsAt && group.endsAt ? `${group.startsAt} - ${group.endsAt}` : "Período ativo";

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => router.push(`/app/group-detail/${group.id}` as any)}
      style={({ pressed }) => [
        styles.capsule,
        {
          backgroundColor: isDark ? theme.colors.cardStrong : palette.cream,
          borderColor: isDark ? theme.colors.border : palette.ink,
        },
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{getInitials(group.name)}</Text>
      </View>

      <View style={styles.capsuleBody}>
        <View style={styles.titleRow}>
          <Text numberOfLines={1} style={[styles.groupName, { color: theme.colors.text }]}>
            {group.name}
          </Text>
          <Text style={[styles.period, { color: theme.colors.mutedText }]}>{period}</Text>
        </View>

        <Text numberOfLines={1} style={[styles.challenge, { color: theme.colors.mutedText }]}>
          {group.currentChallenge}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <UsersRound color={palette.ink} size={15} />
            <Text style={styles.metaText}>{group.membersCount}</Text>
          </View>
          <View style={styles.metaPill}>
            <Trophy color={palette.ink} size={15} />
            <Text style={styles.metaText}>#{group.rankingPosition ?? "-"}</Text>
          </View>
          <Text numberOfLines={1} style={[styles.activity, { color: theme.colors.mutedText }]}>
            {group.lastActivity ?? `${group.points ?? 0} pts`}
          </Text>
        </View>
      </View>

      <ChevronRight color={theme.colors.mutedText} size={20} />
    </Pressable>
  );
}

export default function GroupScreen() {
  const theme = useAppTheme();
  const { data: groups, isLoading } = useGroups();
  const safeGroups = groups ?? [];
  const totalMembers = safeGroups.reduce((sum, group) => sum + group.membersCount, 0);
  const bestPosition = safeGroups.reduce<number | null>((best, group) => {
    if (!group.rankingPosition) return best;
    return best === null ? group.rankingPosition : Math.min(best, group.rankingPosition);
  }, null);

  return (
    <DesignScaffold
      eyebrow="Grupos"
      title="Seus grupos"
      subtitle="Acompanhe desafios, ranking e atividade dos grupos que você faz parte."
    >
      <ScaffoldCard title="Resumo">
        {isLoading ? (
          <LoadingManiac />
        ) : (
          <View style={styles.metrics}>
            <MetricTile accent={theme.colors.accent} label="grupos" value={`${safeGroups.length}`} />
            <MetricTile accent={theme.colors.success} label="integrantes" value={`${totalMembers}`} />
            <MetricTile accent={theme.colors.danger} label="melhor posição" value={bestPosition ? `#${bestPosition}` : "-"} />
          </View>
        )}
      </ScaffoldCard>

      <ScaffoldCard title="Ações">
        <View style={styles.list}>
          <ActionRow
            icon={<Flag color={theme.colors.accent} size={22} />}
            label="Meus desafios"
            meta="Acompanhe os desafios em que voce esta participando."
            onPress={() => router.push("/app/challenges")}
          />
          <ActionRow
            icon={<PlusCircle color={theme.colors.accent} size={22} />}
            label="Criar ou entrar em grupo"
            meta="Use convite ou crie um clube novo."
            onPress={() => router.push("/onboarding/group-entry")}
          />
          <ActionRow
            icon={<Ticket color={theme.colors.accent} size={22} />}
            label="Tenho um código"
            meta="Abra o fluxo de convite."
            onPress={() => router.push("/onboarding/group-entry")}
          />
        </View>
      </ScaffoldCard>

      <ScaffoldCard title="Comunidades" subtitle="Toque em uma cápsula para abrir os detalhes do grupo.">
        {isLoading ? (
          <LoadingManiac />
        ) : (
          <View style={styles.list}>
            {safeGroups.map((group, index) => (
              <GroupCapsule key={group.id} group={group} index={index} />
            ))}
          </View>
        )}
      </ScaffoldCard>
    </DesignScaffold>
  );
}

const styles = StyleSheet.create({
  metrics: {
    flexDirection: "row",
    gap: 12,
  },
  list: {
    gap: 12,
  },
  capsule: {
    alignItems: "center",
    borderRadius: 28,
    borderWidth: 3,
    flexDirection: "row",
    gap: 12,
    minHeight: 112,
    padding: 12,
  },
  pressed: {
    opacity: 0.78,
  },
  avatar: {
    alignItems: "center",
    borderColor: palette.ink,
    borderRadius: 24,
    borderWidth: 3,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  avatarText: {
    color: palette.cream,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 28,
  },
  capsuleBody: {
    flex: 1,
    gap: 5,
  },
  titleRow: {
    alignItems: "flex-start",
    gap: 4,
  },
  groupName: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 21,
    fontWeight: "800",
    lineHeight: 25,
  },
  period: {
    fontFamily: "Baloo2-Bold",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 16,
  },
  challenge: {
    fontFamily: "Baloo2-Medium",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 19,
  },
  metaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  metaPill: {
    alignItems: "center",
    backgroundColor: palette.lavender,
    borderColor: palette.ink,
    borderRadius: 999,
    borderWidth: 2,
    flexDirection: "row",
    gap: 4,
    minHeight: 28,
    paddingHorizontal: 8,
  },
  metaText: {
    color: palette.ink,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 16,
  },
  activity: {
    flex: 1,
    fontFamily: "Baloo2-Medium",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 16,
  },
});
