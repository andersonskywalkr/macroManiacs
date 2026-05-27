import { router } from "expo-router";
import { PlusCircle, Ticket, Trophy } from "lucide-react-native";
import { Alert, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { OnboardingOptionCard } from "@/components/onboarding/OnboardingOptionCard";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { useCreateGroup, useJoinGroup } from "@/hooks/useBackendReadyData";

export default function GroupEntryScreen() {
  const [mode, setMode] = useState<"create" | "join">("create");
  const [inviteCode, setInviteCode] = useState("");
  const [groupName, setGroupName] = useState("Macro Maniacs");
  const createGroup = useCreateGroup();
  const joinGroup = useJoinGroup();

  function handleContinue() {
    if (mode === "join") {
      joinGroup.mutate(inviteCode.trim(), {
        onSuccess: () => router.replace("/app/home"),
        onError: (error) => {
          Alert.alert(
            "Nao foi possivel entrar",
            error instanceof Error ? error.message : "Confira o codigo e tente novamente.",
          );
        },
      });
      return;
    }

    createGroup.mutate(
      { name: groupName.trim() || "Macro Maniacs", description: "Grupo MacroManiacs" },
      {
        onSuccess: () => router.replace("/app/home"),
        onError: (error) => {
          Alert.alert(
            "Nao foi possivel criar o grupo",
            error instanceof Error ? error.message : "Tente novamente.",
          );
        },
      },
    );
  }

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
          onPress={() => setMode("create")}
          selected={mode === "create"}
          title="Criar clube"
        />
        <OnboardingOptionCard
          description="Entra com o código de convite do grupo."
          icon={<Ticket color="#FFFFFF" size={22} />}
          onPress={() => setMode("join")}
          selected={mode === "join"}
          title="Entrar por código"
        />
        <OnboardingOptionCard
          description="Semana fechando macros e somando pontos."
          icon={<Trophy color="#FFFFFF" size={22} />}
          title="Criar desafio"
        />
      </View>
      {mode === "create" ? (
        <ManiacInput label="Nome do grupo" onChangeText={setGroupName} value={groupName} />
      ) : (
        <ManiacInput
          autoCapitalize="characters"
          label="Código de convite"
          onChangeText={setInviteCode}
          placeholder="MANIAC7"
          value={inviteCode}
        />
      )}
      <View style={styles.footer}>
        <ManiacButton
          label={mode === "create" ? "Criar grupo" : "Entrar no grupo"}
          loading={createGroup.isPending || joinGroup.isPending}
          onPress={handleContinue}
        />
        <ManiacButton label="Pular por agora" onPress={() => router.replace("/app/home")} variant="ghost" />
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
