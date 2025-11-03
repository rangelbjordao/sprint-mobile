import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const mockMusicas = [
  {
    id: "1",
    artist: "Tame Impala",
    title: "The Less I Know The Better",
    energy: 0.7,
    valence: 0.85,
  },
  {
    id: "2",
    artist: "Billie Eilish",
    title: "bad guy",
    energy: 0.6,
    valence: 0.5,
  },
  {
    id: "3",
    artist: "Daft Punk",
    title: "Get Lucky",
    energy: 0.8,
    valence: 0.9,
  },
  {
    id: "4",
    artist: "Bon Iver",
    title: "Holocene",
    energy: 0.2,
    valence: 0.15,
  },
];

const AnaliseMusicasScreen = () => {
  const medias = { energy: 0.68, valence: 0.61, danceability: 0.75 };

  const barras = [
    { label: "Energia", value: medias.energy, color: "#E97451" },
    { label: "Positividade", value: medias.valence, color: "#50C878" },
    { label: "Dançabilidade", value: medias.danceability, color: "#4A90E2" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Análise Musical</Text>

      {/* barras de média */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sua Vibe Musical Recente</Text>
        {barras.map((barra) => (
          <View key={barra.label} style={styles.barraContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.barraLabel}>{barra.label}</Text>
              <Text style={styles.percentText}>
                {Math.round(barra.value * 100)}%
              </Text>
            </View>
            <View style={styles.barraBackground}>
              <View
                style={[
                  styles.barraFill,
                  {
                    width: `${barra.value * 100}%`,
                    backgroundColor: barra.color,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Músicas Recentes</Text>

      {/* Lista de musicas */}
      {mockMusicas.map((musica) => (
        <View key={musica.id} style={styles.musicaItem}>
          <FontAwesome5 name="music" size={20} color="#000000" />
          <View style={styles.musicaInfo}>
            <Text style={styles.musicaTitle}>{musica.title}</Text>
            <Text style={styles.musicaArtist}>{musica.artist}</Text>
          </View>
          <View style={styles.musicaStats}>
            <Text style={styles.statLabel}>E: {musica.energy}</Text>
            <Text style={styles.statLabel}>P: {musica.valence}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default AnaliseMusicasScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  barraContainer: {
    marginBottom: 16,
  },
  barraLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  barraBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  barraFill: {
    height: "100%",
    borderRadius: 5,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  percentText: {
    fontSize: 14,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  musicaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  musicaInfo: {
    flex: 1,
    marginLeft: 16,
  },
  musicaTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  musicaArtist: {
    fontSize: 14,
    color: "#0077ff",
  },
  musicaStats: {
    alignItems: "flex-end",
  },
  statLabel: {
    fontSize: 12,
  },
});
