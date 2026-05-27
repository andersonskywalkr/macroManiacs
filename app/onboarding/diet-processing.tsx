import { useEffect } from "react";
import { router } from "expo-router";
import { Image, StyleSheet, Text } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { useAppTheme } from "@/store/theme.store";
import mascotHead from "../../assets/images/brand/mascot-head.png";

export default function DietProcessingScreen() {
  const theme = useAppTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/onboarding/diet-review");
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Screen scroll={false}>
      <ManiacCard strong style={styles.card}>
        <Image source={mascotHead} style={styles.mascot} resizeMode="cover" />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          IA lendo sua dieta.
        </Text>
        <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
          Caçando proteína, separando carbo e marcando onde o jogo começa.
        </Text>
        <LoadingManiac message="Caçando proteína..." />
      </ManiacCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    marginTop: 18,
    textAlign: "center",
  },
  copy: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: 10,
    textAlign: "center",
  },
  mascot: {
    height: 132,
    width: 132,
  },
});
