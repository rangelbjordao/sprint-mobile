import CardNavegacao from "@/components/analises/CardNavegacao";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../constants/colors";

const AnalisesScreen = () => {
  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
};

export default AnalisesScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: COLORS.texto,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: COLORS.texto,
  },
});
