import { CheckCircle2, Mail, MailOpen } from "lucide-react-native";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { useMarkNotificationRead, useNotifications } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function NotificationsScreen() {
  const theme = useAppTheme();
  const { data, isLoading } = useNotifications();
  const markAsRead = useMarkNotificationRead();
  const notifications = data?.latest ?? [];

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Notificacoes"
        title="Recados do jogo."
        subtitle="Badges, medalhas e avisos recentes."
      />
      {isLoading ? (
        <LoadingManiac />
      ) : notifications.length === 0 ? (
        <ManiacCard>
          <Text style={[styles.empty, { color: theme.colors.mutedText }]}>
            Nenhuma notificacao por enquanto.
          </Text>
        </ManiacCard>
      ) : (
        <View style={styles.list}>
          {notifications.map((notification) => {
            const Icon = notification.read ? MailOpen : Mail;
            return (
              <Pressable
                key={notification.id}
                onPress={() => {
                  if (notification.read) return;
                  markAsRead.mutate(notification.id, {
                    onError: (error) => {
                      Alert.alert(
                        "Nao foi possivel marcar como lida",
                        error instanceof Error ? error.message : "Tente novamente.",
                      );
                    },
                  });
                }}
              >
                <ManiacCard strong={!notification.read}>
                  <View style={styles.row}>
                    <View style={[styles.icon, { backgroundColor: theme.colors.primary }]}>
                      <Icon color="#FFFFFF" size={22} />
                    </View>
                    <View style={styles.copy}>
                      <Text style={[styles.title, { color: theme.colors.text }]}>
                        {notification.title || "Notificacao"}
                      </Text>
                      <Text style={[styles.message, { color: theme.colors.mutedText }]}>
                        {notification.message}
                      </Text>
                      {notification.createdAt ? (
                        <Text style={[styles.date, { color: theme.colors.primarySoft }]}>
                          {notification.createdAt}
                        </Text>
                      ) : null}
                    </View>
                    {notification.read ? (
                      <CheckCircle2 color={theme.colors.success} size={20} />
                    ) : null}
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
  message: {
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
