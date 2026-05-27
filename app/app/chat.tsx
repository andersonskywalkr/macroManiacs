import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Send } from "lucide-react-native";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { useChat, useGroupById, useSendChatMessage } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function ChatScreen() {
  const theme = useAppTheme();
  const { groupId } = useLocalSearchParams<{ groupId?: string }>();
  const safeGroupId = typeof groupId === "string" ? groupId : undefined;
  const [message, setMessage] = useState("");
  const { data: group } = useGroupById(safeGroupId ?? "");
  const { data: messages, isLoading, error } = useChat(safeGroupId);
  const sendMessage = useSendChatMessage(safeGroupId);

  function handleSend() {
    const text = message.trim();
    if (!text) {
      return;
    }

    sendMessage.mutate(text, {
      onSuccess: () => setMessage(""),
      onError: (sendError) => {
        Alert.alert(
          "Nao foi possivel enviar",
          sendError instanceof Error ? sendError.message : "Tente novamente.",
        );
      },
    });
  }

  return (
    <Screen>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeft color={theme.colors.text} size={20} />
        <Text style={[styles.backText, { color: theme.colors.text }]}>Voltar</Text>
      </Pressable>
      <ScreenHeader
        eyebrow="Chat"
        title={group?.name ?? "Conversa do grupo"}
        subtitle="Troque mensagens com os participantes do grupo."
      />
      {isLoading ? (
        <LoadingManiac />
      ) : error ? (
        <ManiacCard>
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            Chat indisponivel
          </Text>
          <Text style={[styles.emptyCopy, { color: theme.colors.mutedText }]}>
            {error instanceof Error ? error.message : "Tente novamente em alguns instantes."}
          </Text>
        </ManiacCard>
      ) : !messages?.length ? (
        <ManiacCard>
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            Nenhuma mensagem ainda
          </Text>
          <Text style={[styles.emptyCopy, { color: theme.colors.mutedText }]}>
            Envie a primeira mensagem para o grupo.
          </Text>
        </ManiacCard>
      ) : (
        <View style={styles.list}>
          {messages.map((item) => (
            <ManiacCard key={item.id} strong={item.type === "system"}>
              <Text style={[styles.author, { color: theme.colors.primarySoft }]}>
                {item.authorName}
              </Text>
              <Text style={[styles.message, { color: theme.colors.text }]}>
                {item.message}
              </Text>
              {item.createdAt ? (
                <Text style={[styles.date, { color: theme.colors.mutedText }]}>
                  {item.createdAt}
                </Text>
              ) : null}
            </ManiacCard>
          ))}
        </View>
      )}
      <View style={styles.form}>
        <ManiacInput
          label="Mensagem"
          multiline
          onChangeText={setMessage}
          placeholder="Manda no grupo"
          value={message}
        />
        <ManiacButton
          icon={<Send color="#FFFFFF" size={18} />}
          label="Enviar"
          loading={sendMessage.isPending}
          onPress={handleSend}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  backText: {
    fontSize: 15,
    fontWeight: "900",
  },
  list: {
    gap: 10,
  },
  author: {
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  message: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
  },
  date: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "900",
    textAlign: "center",
  },
  emptyCopy: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center",
  },
  form: {
    gap: 10,
    marginTop: 18,
  },
});
