import { Feather } from "@expo/vector-icons";
import { Redirect, Tabs, useRouter } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function TabsLayout() {
  const { token } = useAuthContext();
  const { colors } = useTheme();
  const router = useRouter();

  if (token === null) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textoSecundario,
        tabBarStyle: { backgroundColor: colors.tabBar },
        headerShown: false,
      }}
      screenListeners={{
        tabPress: (e) => {
          const tabName = e.target?.toString();
          if (tabName?.includes("registros")) {
            e.preventDefault();
            router.replace("/(tabs)/registros");
          }
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="registros"
        options={{
          title: "Registros",
          tabBarLabel: "Registros",
          tabBarIcon: ({ color, size }) => <Feather name="bar-chart-2" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="configuracoes"
        options={{
          title: "Configurações",
          tabBarLabel: "Configurações",
          tabBarIcon: ({ color, size }) => <Feather name="settings" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}