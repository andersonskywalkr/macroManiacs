import { router } from "expo-router";
import { PlusCircle, Ticket, Trophy } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { OnboardingOptionCard } from "@/components/onboarding/OnboardingOptionCard";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";

export default function GroupEntryScreen() {
  return (
    <Screen>
      <ScreenHeader
        eyebrow="Clube"
        title="Agora chama a tropa."
        subtitle="Dieta sozinho é tarefa. Com ranking, vira provocação."
      />
      <View style={styles.options}>
        <OnboardingOptionCard
          description="Cria um clube para amigos disputarem check-ins."
          icon={<PlusCircle color="#FFFFFF" size={22} />}
          selected
          title="Criar clube"
        />
        <OnboardingOptionCard
          description="Entra com o código de convite do grupo."
          icon={<Ticket color="#FFFFFF" size={22} />}
          title="Entrar por código"
        />
        <OnboardingOptionCard
          description="Semana fechando macros e somando pontos."
          icon={<Trophy color="#FFFFFF" size={22} />}
          title="Criar desafio"
        />
      </View>
      <ManiacInput
        autoCapitalize="characters"
        label="Código de convite"
        placeholder="MANIAC7"
      />
      <View style={styles.footer}>
        <ManiacButton
          label="Ir para Home"
          onPress={() => router.replace("/app/home")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: 12,
    marginBottom: 16,
  },
  footer: {
    marginTop: 18,
  },
});
