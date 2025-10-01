import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Monitor de Bem-Estar Digital
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 30 }}>
        Pagina teste do app.
      </Text>

      <Button title="Página 1" onPress={() => router.push("/pagina1")} />
      <View style={{ height: 10 }} />
      <Button title="Página 2" onPress={() => router.push("/pagina2")} />
      <View style={{ height: 10 }} />
      <Button title="Página 3" onPress={() => router.push("/pagina3")} />
    </View>
  );
}
