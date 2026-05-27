import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
  const [name, setName] = useState("Rafael");
  const [username, setUsername] = useState("rafael");
  const [email, setEmail] = useState("rafael@macro.app");
  const [password, setPassword] = useState("123456");
  const registerMutation = useMutation({
    mutationFn: () => authService.register({ name, username, email, password }),
    onSuccess: (user) => {
      setUser(user);
      router.push("/onboarding/avatar");
    },
  });

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
          label="Criar avatar"
          loading={registerMutation.isPending}
          onPress={() => registerMutation.mutate()}
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
