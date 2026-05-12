import { AuthProvider, useAuthContext } from "@/context/AuthContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { wakeUpApi } from "@/services/wakeUpApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Slot } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, LogBox, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";

const queryClient = new QueryClient();

function RootNavigator() {
  const { token } = useAuthContext();
  const { colors } = useTheme();
  const [apiReady, setApiReady] = useState(false);
  const [apiChecked, setApiChecked] = useState(false);

  const verificarApi = useCallback(async () => {
    setApiChecked(false);
    const ok = await wakeUpApi();
    setApiReady(ok);
    setApiChecked(true);
  }, []);

  useEffect(() => {
    verificarApi();
  }, [verificarApi]);

  useEffect(() => {
    const subscription =
      Notifications.addNotificationResponseReceivedListener(() => {
        router.push("/(tabs)");
      });

    return () => subscription.remove();
  }, []);

  if (token === undefined || !apiChecked) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ color: colors.texto, marginTop: 8 }}>Conectando ao servidor...</Text>
      </View>
    );
  }

  if (!apiReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: colors.background }}>
        <Text style={{ textAlign: "center", marginBottom: 12, color: colors.texto }}>
          Não foi possível conectar ao servidor.
        </Text>
        <Text style={{ textAlign: "center", marginBottom: 20, color: colors.texto }}>
          Tente novamente em alguns instantes.
        </Text>
        <TouchableOpacity
          onPress={verificarApi}
          style={{ backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8 }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <Slot />
    </SafeAreaView>
  );
}

LogBox.ignoreLogs(['expo-notifications: Android Push notifications']);

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RootNavigator />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}