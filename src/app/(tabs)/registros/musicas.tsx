import MusicaItem from "@/components/registros/musicas/MusicaItem";
import { useUserTopMusicas } from "@/hooks/useUserTopMusicas";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RegistroMusicasScreen = () => {
  const { connected, connect, loading: spotifyLoading } = useSpotifyAuth();
  const { musicas, loading, error, recarregar } = useUserTopMusicas(5);
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  if (spotifyLoading || loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#1DB954" />
        <Text style={{ marginTop: 10, color: colors.texto }}>Carregando...</Text>
      </View>
    );
  }

  if (!connected) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.title}>Análise Musical</Text>
        <Text style={styles.textoCentral}>Conecte sua conta do Spotify para visualizar suas músicas mais ouvidas.</Text>
        <TouchableOpacity style={styles.botao} onPress={connect} disabled={spotifyLoading}>
          <Text style={styles.botaoTexto}>{spotifyLoading ? "Conectando..." : "Conectar Spotify"}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.title}>Análise Musical</Text>
        <Text style={styles.textoErro}>{error instanceof Error ? error.message : "Erro ao carregar músicas."}</Text>
        <TouchableOpacity style={styles.botao} onPress={recarregar}>
          <Text style={styles.botaoTexto}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Análise Musical</Text>
      <Text style={styles.sectionTitle}>Músicas Mais Ouvidas</Text>
      {musicas.length === 0 ? (
        <Text style={styles.textoVazio}>Nenhuma música encontrada para este usuário.</Text>
      ) : (
        musicas.map((musica) => <MusicaItem key={musica.id} musica={musica} />)
      )}
    </ScrollView>
  );
};

export default RegistroMusicasScreen;

const makeStyles = (colors: typeof LIGHT) => StyleSheet.create({
  container: { padding: 16, flexGrow: 1, backgroundColor: colors.background },
  centered: { alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 16, color: colors.texto },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 12, color: colors.texto },
  textoCentral: { textAlign: "center", fontSize: 16, marginBottom: 16, color: colors.texto },
  textoErro: { textAlign: "center", color: colors.danger, marginBottom: 16 },
  textoVazio: { textAlign: "center", color: colors.textoSecundario, marginTop: 8 },
  botao: { backgroundColor: "#1DB954", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 8 },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
});