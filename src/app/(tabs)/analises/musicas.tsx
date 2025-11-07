import BarraMedia from "@/components/analises/musicas/BarraMedia";
import MusicaItem from "@/components/analises/musicas/MusicaItem";
import { SpotifyService } from "@/services/spotifyService";
import { Musica } from "@/types/spotify";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const AnaliseMusicasScreen = () => {
  const medias = { energy: 0.68, valence: 0.61, danceability: 0.75 };
  const [musicas, setMusicas] = useState<Musica[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const tokenJwtDoUsuario =
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZUBlbWFpbC5jb20iLCJpc3MiOiJBUEkgRW1vdGlXYXZlIiwiZXhwIjoxNzYyNjEzNzU0fQ.3Bubob7g6Y7W8QXNjNzouRP75nyRNJgYVqxg4asB_8I";
        const tracks = await SpotifyService.buscarMusicasMaisOuvidas(
          tokenJwtDoUsuario
        );
        setMusicas(tracks);
      } catch {
        setErro("Erro ao carregar músicas");
      } finally {
        setCarregando(false);
      }
    };
    carregar();
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

  if (erro) {
    return (
      <View
        style={[
          styles.container,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text>{erro}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Análise Musical</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sua Vibe Musical Recente</Text>
        {barras.map((barra) => (
          <BarraMedia
            key={barra.label}
            label={barra.label}
            value={barra.value}
            color={barra.color}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Músicas Mais Ouvidas</Text>

      {musicas.map((musica) => (
        <MusicaItem key={musica.id} musica={musica} />
      ))}
    </ScrollView>
  );
};

export default AnaliseMusicasScreen;

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 16 },
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
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
});
