import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, CalendarDays, Flag } from "lucide-react-native";
import { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { DesignScaffold, ScaffoldCard } from "@/components/layout/DesignScaffold";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { useCreateChallenge, useGroupById } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";
import type { ChallengeType } from "@/types/challenge";

const palette = {
  ink: "#280060",
  cream: "#FDF9ED",
  lavender: "#DCCAF6",
  yellow: "#F5C779",
};

const challengeTypes: Array<{ type: ChallengeType; label: string }> = [
  { type: "daily_checkin", label: "Check-in diario" },
  { type: "water_goal", label: "Agua" },
  { type: "protein_goal", label: "Proteina" },
  { type: "calorie_goal", label: "Calorias" },
  { type: "no_ultra_processed", label: "Sem ultra" },
  { type: "breakfast_checkin", label: "Cafe" },
  { type: "manual", label: "Manual" },
];

function defaultEndDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().slice(0, 10);
}

export default function CreateChallengeScreen() {
  const theme = useAppTheme();
  const { groupId } = useLocalSearchParams<{ groupId?: string }>();
  const { data: group } = useGroupById(groupId ?? "");
  const createChallenge = useCreateChallenge();
  const [title, setTitle] = useState("Check-in diario");
  const [description, setDescription] = useState("Faca check-in por 7 dias.");
  const [type, setType] = useState<ChallengeType>("daily_checkin");
  const [goal, setGoal] = useState("7");
  const [rewardPoints, setRewardPoints] = useState("120");
  const [endDate, setEndDate] = useState(defaultEndDate);

  const subtitle = useMemo(
    () => group?.name ?? "Defina uma meta coletiva para o grupo.",
    [group?.name],
  );

  function handleSubmit() {
    const parsedGoal = Number(goal);
    const parsedReward = Number(rewardPoints);

    if (!groupId) {
      Alert.alert("Grupo ausente", "Abra a criacao a partir de um grupo.");
      return;
    }

    if (!title.trim() || !description.trim() || !endDate.trim()) {
      Alert.alert("Complete os campos", "Titulo, descricao e data final sao obrigatorios.");
      return;
    }

    if (Number.isNaN(parsedGoal) || parsedGoal < 1 || parsedGoal > 365) {
      Alert.alert("Meta invalida", "A meta precisa ficar entre 1 e 365.");
      return;
    }

    if (Number.isNaN(parsedReward) || parsedReward < 10 || parsedReward > 500) {
      Alert.alert("Recompensa invalida", "A recompensa precisa ficar entre 10 e 500 pontos.");
      return;
    }

    createChallenge.mutate(
      {
        groupId,
        title: title.trim(),
        description: description.trim(),
        type,
        goal: parsedGoal,
        rewardPoints: parsedReward,
        endDate: endDate.trim(),
      },
      {
        onSuccess: () => {
          Alert.alert("Desafio criado", "O grupo ja pode participar.");
          router.replace(`/app/challenges?groupId=${groupId}` as any);
        },
        onError: (error) =>
          Alert.alert(
            "Nao foi possivel criar",
            error instanceof Error ? error.message : "Tente novamente.",
          ),
      },
    );
  }

  return (
    <DesignScaffold eyebrow="Desafio" title="Criar desafio" subtitle={subtitle}>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft color={palette.ink} size={20} />
        <Text style={styles.backText}>Voltar</Text>
      </Pressable>

      <ScaffoldCard title="Informacoes">
        <View style={styles.form}>
          <ManiacInput label="Titulo" value={title} onChangeText={setTitle} />
          <ManiacInput
            label="Descricao"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
            style={styles.textArea}
          />
        </View>
      </ScaffoldCard>

      <ScaffoldCard title="Tipo">
        <View style={styles.typeGrid}>
          {challengeTypes.map((item) => {
            const selected = item.type === type;
            return (
              <Pressable
                accessibilityRole="button"
                key={item.type}
                onPress={() => setType(item.type)}
                style={[
                  styles.typeChip,
                  {
                    backgroundColor: selected ? palette.yellow : palette.cream,
                    borderColor: palette.ink,
                  },
                ]}
              >
                <Flag color={palette.ink} size={17} />
                <Text style={styles.typeText}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScaffoldCard>

      <ScaffoldCard title="Meta e recompensa">
        <View style={styles.form}>
          <ManiacInput
            keyboardType="number-pad"
            label="Meta"
            value={goal}
            onChangeText={setGoal}
          />
          <ManiacInput
            keyboardType="number-pad"
            label="Pontos"
            value={rewardPoints}
            onChangeText={setRewardPoints}
          />
          <ManiacInput
            label="Data final"
            placeholder="YYYY-MM-DD"
            value={endDate}
            onChangeText={setEndDate}
          />
        </View>
      </ScaffoldCard>

      <ManiacButton
        icon={<CalendarDays color="#FFFFFF" size={18} />}
        label="Publicar desafio"
        loading={createChallenge.isPending}
        onPress={handleSubmit}
      />

      <Text style={[styles.helper, { color: theme.colors.mutedText }]}>
        Desafios automaticos evoluem com check-ins. Agua, manual e sem ultra podem ser atualizados pelo botao de progresso.
      </Text>
    </DesignScaffold>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: palette.lavender,
    borderColor: palette.ink,
    borderRadius: 999,
    borderWidth: 2,
    flexDirection: "row",
    gap: 8,
    minHeight: 42,
    paddingHorizontal: 14,
  },
  backText: {
    color: palette.ink,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 19,
  },
  form: {
    gap: 14,
  },
  textArea: {
    minHeight: 96,
    paddingTop: 14,
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  typeChip: {
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 2,
    flexDirection: "row",
    gap: 7,
    minHeight: 42,
    paddingHorizontal: 12,
  },
  typeText: {
    color: palette.ink,
    fontFamily: "Baloo2-ExtraBold",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 18,
  },
  helper: {
    fontFamily: "Baloo2-Medium",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 19,
    textAlign: "center",
  },
});
