import { useEffect } from "react";
import { router, type Href } from "expo-router";
import { ScanBarcode } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { useAppTheme } from "@/store/theme.store";

export default function BarcodeScannerScreen() {
  const theme = useAppTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/app/product-review?barcode=7891000315507" as Href);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <Text style={[styles.eyebrow, { color: theme.colors.primarySoft }]}>
          Scanner
        </Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Mira no código.
        </Text>
        <ManiacCard strong style={styles.scanner}>
          <View style={[styles.frame, { borderColor: theme.colors.accent }]}>
            <ScanBarcode color={theme.colors.accent} size={96} />
          </View>
          <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
            Simulando leitura. Depois isso usa Expo Camera e backend Flask.
          </Text>
        </ManiacCard>
        <LoadingManiac message="Buscando produto..." />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: "900",
    textAlign: "center",
    textTransform: "uppercase",
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 20,
    marginTop: 8,
    textAlign: "center",
  },
  scanner: {
    alignItems: "center",
    gap: 18,
  },
  frame: {
    alignItems: "center",
    aspectRatio: 1,
    borderRadius: 28,
    borderWidth: 3,
    justifyContent: "center",
    width: "82%",
  },
  copy: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },
});
