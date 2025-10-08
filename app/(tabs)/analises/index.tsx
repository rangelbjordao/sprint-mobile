import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import CardNavegacao from "../../components/analises/CardNavegacao";

const AnalisesScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Análises</Text>
        <Text style={styles.subtitle}>
          Explore como o conteúdo que você consome influencia seu bem-estar.
        </Text>

        <CardNavegacao
          href="/(tabs)/analises/musicas"
          icon={<FontAwesome5 name="spotify" size={32} color="#1DB954" />}
          title="Análise de Músicas"
          description="Veja a energia e positividade das suas playlists."
        />

        <CardNavegacao
          href="/(tabs)/analises/noticias"
          icon={<Feather name="book-open" size={32} color="#4A90E2" />}
          title="Análise de Notícias"
          description="Entenda o sentimento do conteúdo que você lê."
        />

        <CardNavegacao
          href="/(tabs)/analises/diario"
          icon={<Feather name="edit-3" size={32} color="#E97451" />}
          title="Diário de Humor"
          description="Acesse e adicione registros ao seu diário pessoal."
        />
      </View>
    </SafeAreaView>
  );
};

export default AnalisesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
});
