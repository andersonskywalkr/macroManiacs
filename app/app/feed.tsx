import { useEffect } from "react";
import { router } from "expo-router";
import { Screen } from "@/components/layout/Screen";
import { LoadingManiac } from "@/components/ui/LoadingManiac";

export default function FeedScreen() {
  useEffect(() => {
    router.replace("/app/group");
  }, []);

  return (
    <Screen>
      <LoadingManiac message="Voltando aos grupos..." />
    </Screen>
  );
}
