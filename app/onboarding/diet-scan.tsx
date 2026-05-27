import { router } from "expo-router";
import { Camera, FileText, Image, Keyboard } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { OnboardingOptionCard } from "@/components/onboarding/OnboardingOptionCard";
import { ManiacButton } from "@/components/ui/ManiacButton";

const scanOptions = [
  {
    title: "PDF da nutri",
    description: "Manda o plano e deixa a IA separar as refeições.",
    icon: FileText,
  },
  {
    title: "Foto do papel",
    description: "Tira foto da dieta e transforma em metas.",
    icon: Camera,
  },
  {
    title: "Imagem salva",
    description: "Usa print, foto antiga ou arquivo da galeria.",
    icon: Image,
  },
  {
    title: "Texto manual",
    description: "Cola sua dieta e segue o jogo.",
    icon: Keyboard,
  },
];

export default function DietScanScreen() {
  return (
    <Screen>
      <ScreenHeader
        eyebrow="Scanner"
        title="Joga a dieta pra IA."
        subtitle="Por enquanto é mock completo. Depois o backend Flask cuida do OCR."
      />
      <View style={styles.options}>
        {scanOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <OnboardingOptionCard
              key={option.title}
              description={option.description}
              icon={<Icon color="#FFFFFF" size={22} />}
              selected={index === 0}
              title={option.title}
            />
          );
        })}
      </View>
      <ManiacButton
        label="Processar dieta"
        onPress={() => router.push("/onboarding/diet-processing")}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: 12,
    marginBottom: 18,
  },
});
