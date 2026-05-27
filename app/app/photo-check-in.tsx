import { useEffect } from "react";
import { router } from "expo-router";
import { Screen } from "@/components/layout/Screen";
import { LoadingManiac } from "@/components/ui/LoadingManiac";

export default function PhotoCheckInScreen() {
  useEffect(() => {
    router.replace("/app/manual-check-in");
  }, []);

  return (
    <Screen>
      <LoadingManiac message="Abrindo check-in manual..." />
    </Screen>
  );
}
