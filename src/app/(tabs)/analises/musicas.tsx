import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const AnaliseMusicasScreen = () => {
  const medias = { energy: 0.68, valence: 0.61, danceability: 0.75 };
  const [musicas, setMusicas] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarMusicas() {
      try {
        const token = await AsyncStorage.getItem("spotify_access_token");
        if (!token) {
          console.log("Token do Spotify não encontrado.");
          setCarregando(false);
          return;
        }

        // Buscar últimas músicas tocadas
        const resposta = await axios.get(
          "https://api.spotify.com/v1/me/player/recently-played?limit=5",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("Músicas carregadas:", resposta.data);
        const items = resposta.data.items;

        const tracks = items.map((item: any) => item.track);
        setMusicas(tracks);

        const ids = tracks.map((m: any) => m.id).join(",");
        const audioFeatures = await axios.get(
          `https://api.spotify.com/v1/audio-features?ids=${ids}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const features = audioFeatures.data.audio_features;

        const avg = (key: string) =>
          features.reduce((acc: number, f: any) => acc + (f?.[key] || 0), 0) /
          features.length;

        setMedias({
          energy: avg("energy"),
          valence: avg("valence"),
          danceability: avg("danceability"),
        });
      } catch (error: any) {
        if (error.response) {
          console.log(
            "Erro Spotify:",
            error.response.status,
            error.response.data
          );
        } else {
          console.log("Erro inesperado:", error.message);
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarMusicas();
  }, []);

  const barras = [
    { label: "Energia", value: medias.energy, color: "#E97451" },
    { label: "Positividade", value: medias.valence, color: "#50C878" },
    { label: "Dançabilidade", value: medias.danceability, color: "#4A90E2" },
  ];

  if (carregando) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={{ marginTop: 10 }}>Carregando suas músicas...</Text>
      </View>
    );
  }

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
      {musicas.map((musica) => (
        <View key={musica.id} style={styles.musicaItem}>
          <Image
            source={{ uri: musica.album.images[0]?.url }}
            style={styles.albumImage}
          />

          <View style={styles.musicaInfo}>
            <Text style={styles.musicaTitle}>{musica.name}</Text>
            <Text style={styles.musicaArtist}>
              {musica.artists.map((a: any) => a.name).join(", ")}
            </Text>
          </View>
          <View style={styles.musicaStats}>
            <Text style={styles.statLabel}>
              E: {(musica.energy || 0.7).toFixed(2)}
            </Text>
            <Text style={styles.statLabel}>
              P: {(musica.valence || 0.6).toFixed(2)}
            </Text>
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
  albumImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
});
