import { Send } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { useChat, useSendChatMessage } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function ChatScreen() {
  const theme = useAppTheme();
  const [message, setMessage] = useState("");
  const { data: messages, isLoading } = useChat();
  const sendMessage = useSendChatMessage();

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Chat"
        title="Resenha do clube"
        subtitle="Mensagens reais entram pelo backend depois."
      />
      {isLoading || !messages ? (
        <LoadingManiac />
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
            </ManiacCard>
          ))}
        </View>
      )}
      <View style={styles.form}>
        <ManiacInput
          label="Mensagem"
          onChangeText={setMessage}
          placeholder="Manda no grupo"
          value={message}
        />
        <ManiacButton
          icon={<Send color="#FFFFFF" size={18} />}
          label="Enviar"
          loading={sendMessage.isPending}
          onPress={() => {
            if (message.trim()) {
              sendMessage.mutate(message.trim());
              setMessage("");
            }
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
  form: {
    gap: 10,
    marginTop: 18,
  },
});
