import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Camera, FileText, Image, Keyboard } from "lucide-react-native";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { OnboardingOptionCard } from "@/components/onboarding/OnboardingOptionCard";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { useExtractDiet } from "@/hooks/useBackendReadyData";
import { useState } from "react";
import type { DietScanPayload } from "@/services/diet.service";
import { useAppTheme } from "@/store/theme.store";

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
  const theme = useAppTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState<DietScanPayload | null>(null);
  const extractMutation = useExtractDiet();

  async function pickDocument(index: number) {
    setSelectedIndex(index);
    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*", "text/plain"],
      copyToCacheDirectory: true,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];
    setSelectedFile({
      sourceType: asset.mimeType?.startsWith("image/") ? "image" : "pdf",
      fileUri: asset.uri,
      fileName: asset.name,
      mimeType: asset.mimeType ?? "application/octet-stream",
    });
  }

  async function pickCameraImage(index: number) {
    setSelectedIndex(index);
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.85,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];
    setSelectedFile({
      sourceType: "image",
      fileUri: asset.uri,
      fileName: asset.fileName ?? "diet-photo.jpg",
      mimeType: asset.mimeType ?? "image/jpeg",
    });
  }

  async function pickSavedImage(index: number) {
    setSelectedIndex(index);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.9,
    });

    if (result.canceled) {
      return;
    }

    const asset = result.assets[0];
    setSelectedFile({
      sourceType: "image",
      fileUri: asset.uri,
      fileName: asset.fileName ?? "diet-image.jpg",
      mimeType: asset.mimeType ?? "image/jpeg",
    });
  }

  function handleManualText() {
    setSelectedIndex(3);
    setSelectedFile(null);
    Alert.alert(
      "Texto manual",
      "TODO: ligar esta opcao a um formulario de POST /diet. Por enquanto use arquivo, foto ou imagem.",
    );
  }

  function processDiet() {
    if (!selectedFile) {
      Alert.alert("Selecione uma dieta", "Escolha um PDF, foto ou imagem antes de processar.");
      return;
    }

    extractMutation.mutate(selectedFile, {
      onSuccess: () => router.push("/onboarding/diet-review"),
      onError: (error) => {
        Alert.alert(
          "Nao foi possivel extrair a dieta",
          error instanceof Error ? error.message : "Tente novamente em alguns minutos.",
        );
      },
    });
  }

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Scanner"
        title="Joga a dieta pra IA."
        subtitle="Envie PDF, foto ou imagem para o backend extrair refeicoes e macros."
      />
      <View style={styles.options}>
        {scanOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <OnboardingOptionCard
              key={option.title}
              description={option.description}
              icon={<Icon color="#FFFFFF" size={22} />}
              onPress={() => {
                if (index === 0) pickDocument(index);
                if (index === 1) pickCameraImage(index);
                if (index === 2) pickSavedImage(index);
                if (index === 3) handleManualText();
              }}
              selected={index === selectedIndex}
              title={option.title}
            />
          );
        })}
      </View>
      {selectedFile ? (
        <Text style={[styles.fileName, { color: theme.colors.mutedText }]}>
          Arquivo selecionado: {selectedFile.fileName}
        </Text>
      ) : null}
      <ManiacButton
        label="Processar dieta"
        loading={extractMutation.isPending}
        onPress={processDiet}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: 12,
    marginBottom: 18,
  },
  fileName: {
    fontSize: 13,
    fontWeight: "800",
    lineHeight: 18,
    marginBottom: 14,
    textAlign: "center",
  },
});
