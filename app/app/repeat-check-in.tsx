import { router, type Href } from "expo-router";
import { CheckCircle2, RotateCcw } from "lucide-react-native";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { useRecentCheckins, useRepeatCheckIn } from "@/hooks/useBackendReadyData";
import { mapMacroSummary } from "@/api/mappers";
import type { ApiCheckInResult } from "@/api/dtos";
import { useAppTheme } from "@/store/theme.store";

export default function RepeatCheckInScreen() {
  const theme = useAppTheme();
  const { data: checkins, isLoading } = useRecentCheckins(20);
  const repeatMutation = useRepeatCheckIn();
  const recent = checkins ?? [];

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Repetir"
        title="De novo no prato."
        subtitle="Escolha um check-in recente para registrar novamente."
      />
      {isLoading ? (
        <LoadingManiac />
      ) : recent.length === 0 ? (
        <ManiacCard>
          <Text style={[styles.empty, { color: theme.colors.mutedText }]}>
            Nenhum check-in recente encontrado.
          </Text>
        </ManiacCard>
      ) : (
        <View style={styles.list}>
          {recent.map((checkin: ApiCheckInResult) => {
            const id = checkin.checkin_id ?? checkin.checkInId ?? checkin.check_in_id ?? "";
            const macros = mapMacroSummary(checkin.macros ?? checkin.macros_added);
            return (
              <Pressable
                key={id || `${checkin.created_at}-${checkin.name}`}
                onPress={() => {
                  if (!id) {
                    Alert.alert("Check-in invalido", "Nao foi possivel identificar este registro.");
                    return;
                  }

                  repeatMutation.mutate(
                    { checkinId: id },
                    {
                      onSuccess: () => router.push("/app/check-in-success" as Href),
                      onError: (error) => {
                        Alert.alert(
                          "Nao foi possivel repetir",
                          error instanceof Error ? error.message : "Tente novamente.",
                        );
                      },
                    },
                  );
                }}
              >
                <ManiacCard>
                  <View style={styles.row}>
                    <View style={[styles.icon, { backgroundColor: theme.colors.primary }]}>
                      <RotateCcw color="#FFFFFF" size={22} />
                    </View>
                    <View style={styles.copy}>
                      <Text style={[styles.title, { color: theme.colors.text }]}>
                        {checkin.name ?? "Check-in recente"}
                      </Text>
                      <Text style={[styles.meta, { color: theme.colors.mutedText }]}>
                        {macros.calories} kcal - {macros.protein}g proteina -{" "}
                        {checkin.type ?? "repeat"}
                      </Text>
                    </View>
                    <CheckCircle2 color={theme.colors.accent} size={20} />
                  </View>
                </ManiacCard>
              </Pressable>
            );
          })}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  icon: {
    alignItems: "center",
    borderRadius: 18,
    height: 52,
    justifyContent: "center",
    width: 52,
  },
  copy: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "900",
  },
  meta: {
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 4,
  },
  empty: {
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
    textAlign: "center",
  },
});
