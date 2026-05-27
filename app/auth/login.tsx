import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Apple, Dumbbell, Mail } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useAppTheme } from "@/store/theme.store";

export default function LoginScreen() {
  const theme = useAppTheme();
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState("rafael@macro.app");
  const [password, setPassword] = useState("123456");
  const loginMutation = useMutation({
    mutationFn: () => authService.login({ email, password }),
    onSuccess: (user) => {
      setUser(user);
      router.replace(user.onboardingCompleted ? "/app/home" : "/onboarding/avatar");
    },
  });

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Login"
        title="Volta pro jogo."
        subtitle="Ranking atualizado. A turma nao esperou."
      />
      <View style={styles.form}>
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
          placeholder="Sua senha"
          secureTextEntry
          value={password}
        />
        <ManiacButton
          icon={<Dumbbell color="#FFFFFF" size={18} />}
          label="Entrar"
          loading={loginMutation.isPending}
          onPress={() => loginMutation.mutate()}
        />
        <ManiacButton
          icon={<Mail color={theme.colors.text} size={18} />}
          label="Google em breve"
          variant="secondary"
        />
        <ManiacButton
          icon={<Apple color={theme.colors.text} size={18} />}
          label="Apple em breve"
          variant="secondary"
        />
      </View>
      <TouchableOpacity onPress={() => router.push("/auth/register")}>
        <Text style={[styles.link, { color: theme.colors.primarySoft }]}>
          Novo no clube? Cria conta e vira maniac.
        </Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 14,
  },
  link: {
    fontSize: 14,
    fontWeight: "900",
    marginTop: 18,
    textAlign: "center",
  },
});
