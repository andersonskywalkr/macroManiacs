import { router, type Href } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { ScanBarcode } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen } from "@/components/layout/Screen";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { useAppTheme } from "@/store/theme.store";

export default function BarcodeScannerScreen() {
  const theme = useAppTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return (
      <Screen scroll={false}>
        <LoadingManiac message="Abrindo camera..." />
      </Screen>
    );
  }

  if (!permission.granted) {
    return (
      <Screen scroll={false}>
        <View style={styles.container}>
          <Text style={[styles.eyebrow, { color: theme.colors.primarySoft }]}>Scanner</Text>
          <Text style={[styles.title, { color: theme.colors.text }]}>Permita a camera.</Text>
          <ManiacCard strong style={styles.scanner}>
            <ScanBarcode color={theme.colors.accent} size={72} />
            <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
              O codigo de barras precisa da camera para consultar o Open Food Facts.
            </Text>
          </ManiacCard>
          <ManiacButton label="Liberar camera" onPress={requestPermission} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <Text style={[styles.eyebrow, { color: theme.colors.primarySoft }]}>Scanner</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>Mira no código.</Text>
        <ManiacCard strong style={styles.scanner}>
          <View style={[styles.frame, { borderColor: theme.colors.accent }]}>
            <CameraView
              barcodeScannerSettings={{
                barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e", "code128"],
              }}
              onBarcodeScanned={({ data }) => {
                if (scanned) return;
                setScanned(true);
                router.replace(`/app/product-review?barcode=${encodeURIComponent(data)}` as Href);
              }}
              style={styles.camera}
            />
          </View>
          <Text style={[styles.copy, { color: theme.colors.mutedText }]}>
            Aponte para um codigo de barras entre 8 e 14 digitos.
          </Text>
        </ManiacCard>
        {scanned ? <LoadingManiac message="Buscando produto..." /> : null}
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
    overflow: "hidden",
    width: "82%",
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  copy: {
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    textAlign: "center",
  },
});
