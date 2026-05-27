import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { MedalBadge } from "@/components/achievements/MedalBadge";
import { AvatarPreview } from "@/components/avatar/AvatarPreview";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useProfile } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function ProfileScreen() {
  const theme = useAppTheme();
  const { data: profile, isLoading } = useProfile();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Perfil"
        title="Seu avatar no jogo."
        subtitle="Medalhas, badges e status de maniac."
      />
      {isLoading || !profile ? (
        <LoadingManiac />
      ) : (
        <>
          <ManiacCard strong style={styles.hero}>
            <AvatarPreview avatar={profile.avatar} size={132} />
            <Text style={[styles.name, { color: theme.colors.text }]}>
              {profile.user.name}
            </Text>
            <Text style={[styles.username, { color: theme.colors.mutedText }]}>
              @{profile.user.username} · Hoje voce nao foi frango.
            </Text>
          </ManiacCard>
          <Text style={[styles.section, { color: theme.colors.text }]}>
            Medalhas equipadas
          </Text>
          <View style={styles.medals}>
            {profile.medals.map((medal) => (
              <MedalBadge key={medal.id} medal={medal} />
            ))}
          </View>
          <View style={styles.actions}>
            <ManiacButton
              label="Ver medalhas"
              onPress={() => router.push("/app/medals")}
            />
            <ManiacButton
              label="Ver dieta"
              onPress={() => router.push("/app/diet")}
              variant="secondary"
            />
            <ManiacButton
              label="Configuracoes"
              onPress={() => router.push("/app/settings")}
              variant="secondary"
            />
          </View>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    gap: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: "900",
    marginTop: 8,
  },
  username: {
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },
  section: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 22,
    marginBottom: 12,
  },
  medals: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  actions: {
    gap: 10,
    marginTop: 18,
  },
});
