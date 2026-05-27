import { router } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Dumbbell, LogIn, Sparkles, Ticket } from "lucide-react-native";
import { Screen } from "@/components/layout/Screen";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { useAppTheme } from "@/store/theme.store";
import mascotHead from "../assets/images/brand/mascot-head.png";

export default function SplashScreen() {
  const theme = useAppTheme();

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Text style={[styles.logo, { color: theme.colors.primarySoft }]}>
            MacroManiacs
          </Text>
          <Image source={mascotHead} style={styles.mascot} resizeMode="cover" />
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Dieta é difícil sozinho. Com os amigos, vira jogo.
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.mutedText }]}>
            Bata macros, ganhe medalhas e suba no ranking do clube.
          </Text>
        </View>

        <ManiacCard strong style={styles.card}>
          <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
            Maniac mode ativado.
          </Text>
          <Text style={[styles.cardCopy, { color: theme.colors.mutedText }]}>
            Conectado ao backend Flask para cadastro, dieta, check-ins e ranking.
          </Text>
          <View style={styles.actions}>
            <ManiacButton
              icon={<Sparkles color="#FFFFFF" size={18} />}
              label="Criar conta"
              onPress={() => router.push("/auth/register")}
            />
            <ManiacButton
              icon={<LogIn color={theme.colors.text} size={18} />}
              label="Entrar"
              onPress={() => router.push("/auth/login")}
              variant="secondary"
            />
            <ManiacButton
              icon={<Ticket color={theme.colors.text} size={18} />}
              label="Tenho convite"
              onPress={() => router.push("/onboarding/group-entry")}
              variant="ghost"
            />
          </View>
        </ManiacCard>

        <View style={[styles.pill, { borderColor: theme.colors.border }]}>
          <Dumbbell color={theme.colors.accent} size={16} />
          <Text style={[styles.pillText, { color: theme.colors.text }]}>
            MVP Hackathon
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  hero: {
    alignItems: "center",
    paddingTop: 18,
  },
  logo: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    marginBottom: 30,
  },
  title: {
    fontSize: 38,
    fontWeight: "900",
    letterSpacing: 0,
    lineHeight: 42,
    marginTop: 28,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 23,
    marginTop: 14,
    textAlign: "center",
  },
  mascot: {
    height: 138,
    width: 138,
  },
  card: {
    gap: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "900",
  },
  cardCopy: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  actions: {
    gap: 10,
    marginTop: 10,
  },
  pill: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "900",
  },
});
