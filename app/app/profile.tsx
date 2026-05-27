import { router } from "expo-router";
import { Award, Settings, ShieldCheck, UserRound } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { MedalBadge } from "@/components/achievements/MedalBadge";
import { AvatarPreview } from "@/components/avatar/AvatarPreview";
import {
  ActionRow,
  DesignScaffold,
  MetricTile,
  ScaffoldCard,
} from "@/components/layout/DesignScaffold";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useProfile } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function ProfileScreen() {
  const theme = useAppTheme();
  const { data: profile, isLoading } = useProfile();
  const equippedMedals = profile?.medals.filter((medal) => medal.equipped) ?? [];
  const unlockedMedals = profile?.medals.filter((medal) => medal.unlocked).length ?? 0;

  return (
    <DesignScaffold
      eyebrow="Perfil"
      title="Dados e configurações"
      subtitle="Central do usuário, avatar, conquistas e ajustes da conta."
    >
      {isLoading || !profile ? (
        <ScaffoldCard>
          <LoadingManiac />
        </ScaffoldCard>
      ) : (
        <>
          <ScaffoldCard>
            <View style={styles.profileHero}>
              <AvatarPreview avatar={profile.avatar} size={124} />
              <View style={styles.profileCopy}>
                <Text style={[styles.name, { color: theme.colors.text }]}>{profile.user.name}</Text>
                <Text style={[styles.username, { color: theme.colors.mutedText }]}>
                  @{profile.user.username}
                </Text>
                {profile.user.email ? (
                  <Text style={[styles.email, { color: theme.colors.mutedText }]}>{profile.user.email}</Text>
                ) : null}
              </View>
            </View>
          </ScaffoldCard>

          <ScaffoldCard title="Status">
            <View style={styles.metrics}>
              <MetricTile accent={theme.colors.accent} label="medalhas" value={`${unlockedMedals}`} />
              <MetricTile
                accent={theme.colors.success}
                label="onboarding"
                value={profile.user.onboardingCompleted ? "OK" : "Pendente"}
              />
            </View>
          </ScaffoldCard>

          <ScaffoldCard title="Medalhas equipadas">
            {equippedMedals.length > 0 ? (
              <View style={styles.medals}>
                {equippedMedals.map((medal) => (
                  <MedalBadge key={medal.id} medal={medal} />
                ))}
              </View>
            ) : (
              <ActionRow
                icon={<Award color={theme.colors.accent} size={22} />}
                label="Nenhuma medalha equipada"
                meta="Escolha uma medalha para destacar no perfil."
                onPress={() => router.push("/app/medals")}
              />
            )}
          </ScaffoldCard>

          <ScaffoldCard title="Conta">
            <View style={styles.stack}>
              <ActionRow
                icon={<Award color={theme.colors.accent} size={22} />}
                label="Medalhas"
                meta="Coleção, raridades e medalhas equipadas."
                onPress={() => router.push("/app/medals")}
              />
              <ActionRow
                icon={<UserRound color={theme.colors.accent} size={22} />}
                label="Plano alimentar"
                meta="Metas e refeições vinculadas ao perfil."
                onPress={() => router.push("/app/meals")}
              />
              <ActionRow
                icon={<Settings color={theme.colors.accent} size={22} />}
                label="Configurações"
                meta="Preferências, tema e dados da conta."
                onPress={() => router.push("/app/settings")}
              />
              <ActionRow
                icon={<ShieldCheck color={theme.colors.accent} size={22} />}
                label="Privacidade"
                meta="Controles de segurança e visibilidade."
              />
            </View>
          </ScaffoldCard>
        </>
      )}
    </DesignScaffold>
  );
}

const styles = StyleSheet.create({
  profileHero: {
    alignItems: "center",
    gap: 16,
    paddingVertical: 4,
  },
  profileCopy: {
    alignItems: "center",
  },
  name: {
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 0,
    lineHeight: 35,
    textAlign: "center",
  },
  username: {
    fontFamily: "Baloo2-Bold",
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: 4,
  },
  email: {
    fontFamily: "Baloo2-Medium",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 6,
  },
  metrics: {
    flexDirection: "row",
    gap: 12,
  },
  medals: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  stack: {
    gap: 12,
  },
});
