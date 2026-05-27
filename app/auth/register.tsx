import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useAppTheme } from "@/store/theme.store";

export default function RegisterScreen() {
  const theme = useAppTheme();
  const setUser = useAuthStore((state) => state.setUser);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerMutation = useMutation({
    mutationFn: () => authService.register({ name, username, email, password }),
    onSuccess: async (user) => {
      await setUser(user);
      router.replace("/onboarding/diet-scan");
    },
    onError: (error) => {
      Alert.alert(
        "Nao foi possivel criar a conta",
        error instanceof Error ? error.message : "Revise os dados e tente novamente.",
      );
    },
  });

  function handleRegister() {
    if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Complete o cadastro", "Preencha nome, username, e-mail e senha.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Senha curta", "A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    registerMutation.mutate();
  }

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Cadastro"
        title="Dieta registrada. Agora vira jogo."
        subtitle="Cria seu perfil, monta o avatar e entra no clube."
      />
      <View style={styles.form}>
        <ManiacInput label="Nome" onChangeText={setName} placeholder="Rafael" value={name} />
        <ManiacInput
          autoCapitalize="none"
          label="Username"
          onChangeText={setUsername}
          placeholder="rafael"
          value={username}
        />
        <ManiacInput
          autoCapitalize="none"
          keyboardType="email-address"
          label="E-mail"
          onChangeText={setEmail}
          placeholder="voce@macro.app"
          value={email}
        />
        <ManiacInput
          label="Senha"
          onChangeText={setPassword}
          placeholder="Minimo 6 caracteres"
          secureTextEntry
          value={password}
        />
        <Text style={[styles.disclaimer, { color: theme.colors.mutedText }]}>
          O MacroManiacs nao substitui acompanhamento medico ou nutricional. A
          gente organiza e gamifica informacoes fornecidas por voce.
        </Text>
        <ManiacButton
          icon={<Sparkles color="#FFFFFF" size={18} />}
          label="Criar conta"
          loading={registerMutation.isPending}
          onPress={handleRegister}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14,
  },
  disclaimer: {
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
  },
});
