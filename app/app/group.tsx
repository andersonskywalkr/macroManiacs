import { router } from "expo-router";
import { MessageCircle, Trophy, UsersRound } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { useGroup } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function GroupScreen() {
  const theme = useAppTheme();
  const { data: group, isLoading } = useGroup();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Clube"
        title={group?.name ?? "Clube"}
        subtitle={group?.currentChallenge ?? "Carregando clube"}
      />
      {isLoading || !group ? (
        <LoadingManiac />
      ) : (
        <ManiacCard strong>
          <View style={styles.row}>
            <UsersRound color={theme.colors.accent} size={28} />
            <View>
              <Text style={[styles.number, { color: theme.colors.text }]}>
                {group.membersCount} maniacs
              </Text>
              <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
                Convite {group.inviteCode}
              </Text>
            </View>
          </View>
        </ManiacCard>
      )}
      <View style={styles.actions}>
        <ManiacButton
          icon={<MessageCircle color="#FFFFFF" size={18} />}
          label="Abrir feed"
          onPress={() => router.push("/app/feed")}
        />
        <ManiacButton
          icon={<Trophy color={theme.colors.text} size={18} />}
          label="Ver ranking"
          onPress={() => router.push("/app/ranking")}
          variant="secondary"
        />
        <ManiacButton
          icon={<MessageCircle color={theme.colors.text} size={18} />}
          label="Abrir chat"
          onPress={() => router.push("/app/chat")}
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
  },
  number: {
    fontSize: 24,
    fontWeight: "900",
  },
  copy: {
    fontSize: 14,
    fontWeight: "800",
  },
  actions: {
    gap: 10,
    marginTop: 16,
  },
});
