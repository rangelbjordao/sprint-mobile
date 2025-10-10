import { Feather } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
      }}
      screenListeners={{
        tabPress: (e) => {
          const tabName = e.target?.toString();
          if (tabName?.includes("analises")) {
            e.preventDefault();
            router.replace("/(tabs)/analises");
          }
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="analises"
        options={{
          title: "Análises",
          tabBarLabel: "Análises",
          tabBarIcon: ({ color, size }) => (
            <Feather name="bar-chart-2" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: "Configurações",
          tabBarLabel: "Configurações",
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
