import { AuthProvider, useAuthContext } from "@/context/AuthContext";
import { wakeUpApi } from "@/services/wakeUpApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

function RootNavigator() {
  const { token } = useAuthContext();
  const [apiReady, setApiReady] = useState(false);
  const [apiChecked, setApiChecked] = useState(false);

  useEffect(() => {
    async function init() {
      const ok = await wakeUpApi();
      setApiReady(ok);
      setApiChecked(true);
    }

    init();
  }, []);

  if (token === undefined || !apiChecked) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Conectando ao servidor...</Text>
      </View>
    );
  }

  if (!apiReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ textAlign: "center", marginBottom: 12 }}>
          Não foi possível conectar ao servidor.
        </Text>
        <Text style={{ textAlign: "center" }}>
          Tente novamente em alguns instantes.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <Slot />
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}