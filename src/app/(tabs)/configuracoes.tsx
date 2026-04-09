import Card from "@/components/configuracoes/Card";
import SpotifyConnect from "@/components/configuracoes/spotifyConnect";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/hooks/useAuth";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { LIGHT } from "@/constants/colors";
import { Redirect } from "expo-router";
import React, { useEffect } from "react";
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, Switch, Text, TouchableOpacity, View,
} from "react-native";

const ConfiguracoesScreen = () => {
  const { logout, loading, token } = useAuth();
  const { connected, connect, disconnect: disconnectSpotify, checkConnected, loading: spotifyLoading } = useSpotifyAuth();
  const { isDark, toggleTheme, colors } = useTheme();
  const styles = makeStyles(colors);

  useEffect(() => { checkConnected(); }, []);

  if (token === null) return <Redirect href="/login" />;

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.background }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Configurações</Text>

        <Card style={colors}>
          <Text style={styles.cardTitle}>Aparência</Text>
          <View style={styles.temaRow}>
            <Text style={styles.temaTexto}>{isDark ? "Modo Escuro" : "Modo Claro"}</Text>
            <Switch value={isDark} onValueChange={toggleTheme} trackColor={{ false: "#DDD", true: colors.primary }} thumbColor="#FFF" />
          </View>
        </Card>

        <Card style={colors}>
          <Text style={styles.cardTitle}>Spotify</Text>
          <SpotifyConnect connected={connected} loading={spotifyLoading} onConnect={connect} onDisconnect={disconnectSpotify} />
        </Card>

        <Card style={colors}>
          <Text style={styles.cardTitle}>Conta</Text>
          <TouchableOpacity style={styles.buttonLogout} onPress={async () => { await logout(); }} disabled={loading}>
            <Text style={styles.buttonText}>Sair da conta</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ConfiguracoesScreen;

const makeStyles = (colors: typeof LIGHT) => StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: colors.background },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: colors.texto },
  cardTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 12, color: colors.texto },
  temaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  temaTexto: { fontSize: 16, color: colors.texto },
  buttonLogout: { backgroundColor: colors.danger, paddingVertical: 12, borderRadius: 10, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});