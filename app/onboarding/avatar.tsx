import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Crown, Shirt, Smile } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { AvatarPreview } from "@/components/avatar/AvatarPreview";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { OnboardingOptionCard } from "@/components/onboarding/OnboardingOptionCard";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { mockAvatar } from "@/mocks/user.mock";
import { onboardingService } from "@/services/onboarding.service";
import { useAppTheme } from "@/store/theme.store";

export default function AvatarOnboardingScreen() {
  const theme = useAppTheme();
  const saveMutation = useMutation({
    mutationFn: onboardingService.saveAvatar,
    onSuccess: () => router.push("/onboarding/body-data"),
  });

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Avatar"
        title="Cria seu mascote."
        subtitle="Seu status no ranking vai aparecer nele."
      />
      <ManiacCard strong style={styles.preview}>
        <AvatarPreview avatar={mockAvatar} size={148} />
        <Text style={[styles.previewText, { color: theme.colors.text }]}>
          Medalhas bloqueadas esperando sua primeira semana braba.
        </Text>
      </ManiacCard>
      <View style={styles.options}>
        <OnboardingOptionCard
          description="Energia de quem ja veio discutir macro no grupo."
          icon={<Smile color="#FFFFFF" size={22} />}
          selected
          title="Expressao confiante"
        />
        <OnboardingOptionCard
          description="Uniforme roxo oficial do clube."
          icon={<Shirt color="#FFFFFF" size={22} />}
          selected
          title="Outfit de treino"
        />
        <OnboardingOptionCard
          description="Aparece quando voce desbloquear conquista visual."
          icon={<Crown color="#FFFFFF" size={22} />}
          title="Medalha lendaria"
        />
      </View>
      <ManiacButton
        label="Salvar avatar"
        loading={saveMutation.isPending}
        onPress={() => saveMutation.mutate()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  preview: {
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  previewText: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 21,
    textAlign: "center",
  },
  options: {
    gap: 12,
    marginBottom: 18,
  },
});
