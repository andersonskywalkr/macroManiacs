import * as ImagePicker from "expo-image-picker";
import { Moon, Sun } from "lucide-react-native";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { useUpdateAvatar, useUploadAvatar } from "@/hooks/useBackendReadyData";
import { useAppTheme, useThemeStore } from "@/store/theme.store";

export default function SettingsScreen() {
  const theme = useAppTheme();
  const themeName = useThemeStore((state) => state.themeName);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const updateAvatar = useUpdateAvatar();
  const uploadAvatar = useUploadAvatar();

  function removeAvatar() {
    updateAvatar.mutate(null, {
      onSuccess: () => {
        Alert.alert("Perfil atualizado", "Avatar removido com sucesso.");
      },
      onError: (error) => {
        Alert.alert(
          "Nao foi possivel atualizar",
          error instanceof Error ? error.message : "Tente novamente.",
        );
      },
    });
  }

  async function pickAvatar() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permissao necessaria", "Libere acesso a galeria para escolher o avatar.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ["images"],
      quality: 0.85,
    });

    if (result.canceled || !result.assets[0]) {
      return;
    }

    const asset = result.assets[0];
    uploadAvatar.mutate(
      {
        uri: asset.uri,
        name: asset.fileName ?? "avatar.jpg",
        mimeType: asset.mimeType ?? "image/jpeg",
      },
      {
        onSuccess: () => Alert.alert("Perfil atualizado", "Avatar enviado com sucesso."),
        onError: (error) => {
          Alert.alert(
            "Nao foi possivel enviar",
            error instanceof Error ? error.message : "Tente novamente.",
          );
        },
      },
    );
  }

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Settings"
        title="Configuracoes"
        subtitle="Ajustes minimos para demo e integracao."
      />
      <ManiacCard style={styles.card}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Tema atual</Text>
        <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
          {themeName}
        </Text>
        <ManiacButton
          icon={
            themeName === "dark" ? (
              <Sun color="#FFFFFF" size={18} />
            ) : (
              <Moon color="#FFFFFF" size={18} />
            )
          }
          label="Alternar tema"
          onPress={toggleTheme}
        />
      </ManiacCard>
      <ManiacCard style={styles.card}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Avatar</Text>
        <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
          Envie uma imagem do dispositivo para atualizar sua foto de perfil.
        </Text>
        <View style={styles.actions}>
          <ManiacButton
            label="Escolher imagem"
            loading={uploadAvatar.isPending}
            onPress={pickAvatar}
          />
          <ManiacButton
            label="Remover avatar"
            loading={updateAvatar.isPending}
            onPress={removeAvatar}
            variant="secondary"
          />
        </View>
      </ManiacCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  copy: {
    fontSize: 14,
    fontWeight: "700",
  },
  actions: {
    gap: 10,
  },
});
