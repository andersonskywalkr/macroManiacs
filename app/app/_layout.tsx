import { Tabs } from "expo-router";
import { CircleUserRound, Utensils, UsersRound } from "lucide-react-native";
import { Image, StyleSheet, View } from "react-native";
import { useAppTheme } from "@/store/theme.store";
import mascotHead from "../../assets/images/brand/mascot-head.png";
import tabBarBackground from "../../assets/images/navigation/tab-bar.png";

function TabIconFrame({
  children,
  focused,
}: {
  children: React.ReactNode;
  focused: boolean;
}) {
  return <View style={focused ? styles.activeTabItem : styles.tabItem}>{children}</View>;
}

export default function AppTabsLayout() {
  const theme = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.mutedText,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: "transparent",
          },
        ],
        tabBarBackground: () => (
          <Image source={tabBarBackground} style={styles.tabBarBackground} resizeMode="stretch" />
        ),
        tabBarLabelStyle: styles.label,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIconFrame focused={focused}>
              <Image source={mascotHead} style={styles.mascotIcon} resizeMode="cover" />
            </TabIconFrame>
          ),
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: "Refeições",
          tabBarIcon: ({ color, focused }) => (
            <TabIconFrame focused={focused}>
              <Utensils color={color} size={24} />
            </TabIconFrame>
          ),
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: "Grupos",
          tabBarIcon: ({ color, focused }) => (
            <TabIconFrame focused={focused}>
              <UsersRound color={color} size={25} />
            </TabIconFrame>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, focused }) => (
            <TabIconFrame focused={focused}>
              <CircleUserRound color={color} size={24} />
            </TabIconFrame>
          ),
        }}
      />
      <Tabs.Screen name="macros" options={{ href: null }} />
      <Tabs.Screen name="check-in" options={{ href: null }} />
      <Tabs.Screen name="checkin-history" options={{ href: null }} />
      <Tabs.Screen name="ranking" options={{ href: null }} />
      <Tabs.Screen name="barcode-scanner" options={{ href: null }} />
      <Tabs.Screen name="product-review" options={{ href: null }} />
      <Tabs.Screen name="planned-meal" options={{ href: null }} />
      <Tabs.Screen name="manual-check-in" options={{ href: null }} />
      <Tabs.Screen name="repeat-check-in" options={{ href: null }} />
      <Tabs.Screen name="photo-check-in" options={{ href: null }} />
      <Tabs.Screen name="check-in-success" options={{ href: null }} />
      <Tabs.Screen name="feed" options={{ href: null }} />
      <Tabs.Screen name="chat" options={{ href: null }} />
      <Tabs.Screen name="challenges" options={{ href: null }} />
      <Tabs.Screen name="challenge-detail/[challengeId]" options={{ href: null }} />
      <Tabs.Screen name="create-challenge" options={{ href: null }} />
      <Tabs.Screen name="diet" options={{ href: null }} />
      <Tabs.Screen name="group-detail/[groupId]" options={{ href: null }} />
      <Tabs.Screen name="medals" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 0,
    elevation: 0,
    height: 74,
    left: 0,
    paddingBottom: 8,
    paddingTop: 10,
    position: "absolute",
    right: 0,
    shadowOpacity: 0,
  },
  tabBarBackground: {
    height: "100%",
    width: "100%",
  },
  label: {
    fontSize: 11,
    fontWeight: "900",
  },
  activeTabItem: {
    alignItems: "center",
    backgroundColor: "#C59AF2",
    borderRadius: 15,
    height: 50,
    justifyContent: "center",
    overflow: "hidden",
    width: 50,
  },
  tabItem: {
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    overflow: "hidden",
    width: 50,
  },
  mascotIcon: {
    height: 44,
    width: 44,
  },
  foodIcon: {
    height: 52,
    width: 52,
  },
  foodCircle: {
    borderColor: "#280060",
    borderRadius: 999,
    borderWidth: 3,
    height: 27,
    left: 11,
    position: "absolute",
    top: 2,
    width: 27,
  },
  foodCircleGreen: {
    backgroundColor: "#A9C984",
    left: 3,
    top: 20,
  },
  foodCircleSalmon: {
    backgroundColor: "#B36464",
    left: 21,
    top: 21,
  },
});
