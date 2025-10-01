import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#1E90FF",
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="pagina1" options={{ title: "Página 1" }} />
      <Tabs.Screen name="pagina2" options={{ title: "Página 2" }} />
      <Tabs.Screen name="pagina3" options={{ title: "Página 3" }} />
    </Tabs>
  );
}
