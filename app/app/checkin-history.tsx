import { useState } from "react";
import { CalendarDays } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { mapMacroSummary } from "@/api/mappers";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { useCheckinHistory } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";
import type { ApiCheckInResult } from "@/api/dtos";

export default function CheckInHistoryScreen() {
  const theme = useAppTheme();
  const [date, setDate] = useState("");
  const normalizedDate = date.trim() || undefined;
  const { data: checkins, isLoading } = useCheckinHistory(normalizedDate);
  const history = checkins ?? [];

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Historico"
        title="Registros feitos."
        subtitle="Consulte seus check-ins; use YYYY-MM-DD para filtrar por dia."
      />
      <View style={styles.filter}>
        <ManiacInput
          label="Data"
          onChangeText={setDate}
          placeholder="2026-05-27"
          value={date}
        />
      </View>
      {isLoading ? (
        <LoadingManiac />
      ) : history.length === 0 ? (
        <ManiacCard>
          <Text style={[styles.empty, { color: theme.colors.mutedText }]}>
            Nenhum check-in encontrado.
          </Text>
        </ManiacCard>
      ) : (
        <View style={styles.list}>
          {history.map((checkin: ApiCheckInResult) => {
            const macros = mapMacroSummary(checkin.macros ?? checkin.macros_added);
            const id =
              checkin.checkin_id ??
              checkin.checkInId ??
              checkin.check_in_id ??
              `${checkin.created_at}-${checkin.name}`;

            return (
              <ManiacCard key={id}>
                <View style={styles.row}>
                  <View style={[styles.icon, { backgroundColor: theme.colors.primary }]}>
                    <CalendarDays color="#FFFFFF" size={21} />
                  </View>
                  <View style={styles.copy}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>
                      {checkin.name ?? "Check-in"}
                    </Text>
                    <Text style={[styles.meta, { color: theme.colors.mutedText }]}>
                      {macros.calories} kcal - {macros.protein}g proteina -{" "}
                      {checkin.type ?? "manual"}
                    </Text>
                    {checkin.created_at ? (
                      <Text style={[styles.date, { color: theme.colors.primarySoft }]}>
                        {checkin.created_at}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </ManiacCard>
            );
          })}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  filter: {
    marginBottom: 16,
  },
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
  date: {
    fontSize: 12,
    fontWeight: "900",
    marginTop: 6,
  },
  empty: {
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 20,
    textAlign: "center",
  },
});
