import { router, type Href } from "expo-router";
import { History, Keyboard, ScanBarcode } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { CheckInOptionCard } from "@/components/checkin/CheckInOptionCard";
import { Screen } from "@/components/layout/Screen";
import { ScreenHeader } from "@/components/layout/ScreenHeader";

const options = [
  {
    title: "Codigo de barras",
    copy: "Consulta o Open Food Facts e registra a porção.",
    icon: ScanBarcode,
    route: "/app/barcode-scanner" as Href,
  },
  {
    title: "Manual",
    copy: "Registra na mao quando o produto some do mapa.",
    icon: Keyboard,
    route: "/app/manual-check-in" as Href,
  },
  {
    title: "Repetir refeicao",
    copy: "Puxa um check-in recente e registra de novo.",
    icon: History,
    route: "/app/repeat-check-in" as Href,
  },
];

export default function CheckInScreen() {
  return (
    <Screen>
      <ScreenHeader
        eyebrow="Check-in"
        title="Registra a refeicao."
        subtitle="Dieta registrada. Agora vira jogo."
      />
      <View style={styles.list}>
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <CheckInOptionCard
              key={option.title}
              description={option.copy}
              icon={<Icon color="#FFFFFF" size={24} />}
              onPress={() => router.push(option.route)}
              title={option.title}
            />
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 14,
  },
});
