import { AuthProvider, useAuthContext } from "@/context/AuthContext";
import { wakeUpApi } from "@/services/wakeUpApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const queryClient = new QueryClient();

function RootNavigator() {
  const { token } = useAuthContext();
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
        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          Tente novamente em alguns instantes.
        </Text>

        <TouchableOpacity
          onPress={verificarApi}
          style={{
            backgroundColor: "#4A90E2",
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Tentar novamente
          </Text>
        </TouchableOpacity>
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