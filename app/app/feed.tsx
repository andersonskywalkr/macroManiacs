import { useLocalSearchParams } from "expo-router";
import { MessageCircle, ThumbsUp } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { useFeed } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function FeedScreen() {
  const theme = useAppTheme();
  const { groupId } = useLocalSearchParams<{ groupId?: string }>();
  const { data: posts, isLoading } = useFeed(groupId);

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Feed"
        title="Movimento do clube"
        subtitle="Check-ins, streaks e provocacoes do grupo."
      />
      {isLoading || !posts ? (
        <LoadingManiac />
      ) : (
        <View style={styles.list}>
          {posts.map((post) => (
          <ManiacCard key={post.id}>
            <Text style={[styles.title, { color: theme.colors.text }]}>
              {post.title}
            </Text>
            <Text style={[styles.description, { color: theme.colors.mutedText }]}>
              {post.description}
            </Text>
            {post.macros ? (
              <Text style={[styles.meta, { color: theme.colors.primarySoft }]}>
                {post.macros.calories} kcal · {post.macros.protein}g prot ·{" "}
                {post.macros.carbs}g carb · {post.macros.fat}g fat
              </Text>
            ) : null}
            <View style={styles.footer}>
              <View style={styles.footerItem}>
                <ThumbsUp color={theme.colors.accent} size={16} />
                <Text style={[styles.footerText, { color: theme.colors.text }]}>
                  {post.reactions.reduce((sum, reaction) => sum + reaction.count, 0)}
                </Text>
              </View>
              <View style={styles.footerItem}>
                <MessageCircle color={theme.colors.accent} size={16} />
                <Text style={[styles.footerText, { color: theme.colors.text }]}>
                  {post.commentsCount}
                </Text>
              </View>
              {post.points ? (
                <Text style={[styles.points, { color: theme.colors.accent }]}>
                  +{post.points} pts
                </Text>
              ) : null}
            </View>
          </ManiacCard>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  description: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 8,
  },
  meta: {
    fontSize: 13,
    fontWeight: "900",
    marginTop: 10,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    marginTop: 14,
  },
  footerItem: {
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  footerText: {
    fontSize: 13,
    fontWeight: "900",
  },
  points: {
    marginLeft: "auto",
    fontSize: 13,
    fontWeight: "900",
  },
});
