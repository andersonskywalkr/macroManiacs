import { router, type Href, useLocalSearchParams } from "expo-router";
import { CheckCircle2, PackageCheck } from "lucide-react-native";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";
import { ManiacButton } from "@/components/ui/ManiacButton";
import { ManiacCard } from "@/components/ui/ManiacCard";
import { LoadingManiac } from "@/components/ui/LoadingManiac";
import { ManiacInput } from "@/components/ui/ManiacInput";
import { useBarcodeCheckIn, useProduct } from "@/hooks/useBackendReadyData";
import { useAppTheme } from "@/store/theme.store";

export default function ProductReviewScreen() {
  const theme = useAppTheme();
  const params = useLocalSearchParams<{ barcode?: string }>();
  const barcode = params.barcode ?? "";
  const [quantityG, setQuantityG] = useState("100");
  const { data: product, isLoading } = useProduct(barcode);
  const confirmMutation = useBarcodeCheckIn();
  const handleConfirm = () => {
    confirmMutation.mutate({ barcode, quantityG: Number(quantityG) || 100 }, {
    onSuccess: () => {
      router.push("/app/check-in-success" as Href);
    },
    onError: (error) => {
      Alert.alert(
        "Nao foi possivel registrar",
        error instanceof Error ? error.message : "Tente novamente.",
      );
    },
  });
  };

  return (
    <Screen>
      <ScreenHeader
        eyebrow="Produto"
        title="Produto encontrado."
        subtitle="Confere a porção e manda pro contador."
      />
      {!barcode ? (
        <ManiacCard>
          <Text style={[styles.brand, { color: theme.colors.mutedText }]}>
            Nenhum codigo de barras foi lido. Volte ao scanner e tente novamente.
          </Text>
        </ManiacCard>
      ) : isLoading || !product ? (
        <LoadingManiac />
      ) : (
        <>
          <ManiacCard strong style={styles.product}>
            <View style={[styles.icon, { backgroundColor: theme.colors.primary }]}>
              <PackageCheck color="#FFFFFF" size={36} />
            </View>
            <Text style={[styles.name, { color: theme.colors.text }]}>
              {product.name}
            </Text>
            <Text style={[styles.brand, { color: theme.colors.mutedText }]}>
              {product.brand} · porção {product.servingSize}
            </Text>
          </ManiacCard>

          <View style={styles.grid}>
            <MacroTile label="Kcal" value={product.caloriesPer100g} unit="/100g" />
            <MacroTile label="Proteína" value={product.proteinPer100g} unit="g" />
            <MacroTile label="Carbo" value={product.carbsPer100g} unit="g" />
            <MacroTile label="Gordura" value={product.fatPer100g} unit="g" />
          </View>

          <View style={styles.quantity}>
            <ManiacInput
              keyboardType="number-pad"
              label="Quantidade consumida (g)"
              onChangeText={setQuantityG}
              value={quantityG}
            />
          </View>

          <ManiacButton
            icon={<CheckCircle2 color="#FFFFFF" size={18} />}
            label="Confirmar check-in"
            loading={confirmMutation.isPending}
            onPress={handleConfirm}
          />
        </>
      )}
    </Screen>
  );
}

function MacroTile({
  label,
  value,
  unit,
}: {
  label: string;
  value?: number | null;
  unit: string;
}) {
  const theme = useAppTheme();

  return (
    <ManiacCard style={styles.tile}>
      <Text style={[styles.tileValue, { color: theme.colors.text }]}>
        {value ?? 0}
        {unit}
      </Text>
      <Text style={[styles.tileLabel, { color: theme.colors.mutedText }]}>
        {label}
      </Text>
    </ManiacCard>
  );
}

const styles = StyleSheet.create({
  product: {
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  icon: {
    alignItems: "center",
    borderRadius: 24,
    height: 76,
    justifyContent: "center",
    width: 76,
  },
  name: {
    fontSize: 25,
    fontWeight: "900",
    textAlign: "center",
  },
  brand: {
    fontSize: 14,
    fontWeight: "800",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18,
  },
  quantity: {
    marginBottom: 18,
  },
  tile: {
    flexBasis: "47%",
    flexGrow: 1,
  },
  tileValue: {
    fontSize: 22,
    fontWeight: "900",
  },
  tileLabel: {
    fontSize: 12,
    fontWeight: "900",
    marginTop: 4,
    textTransform: "uppercase",
  },
});
