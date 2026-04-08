import Card from "@/components/configuracoes/Card";
import SpotifyConnect from "@/components/configuracoes/spotifyConnect";
import { useAuth } from "@/hooks/useAuth";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { Redirect } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constants/colors";

const ConfiguracoesScreen = () => {
  const { logout, loading, token } = useAuth();
  const {
    connected,
    connect,
    disconnect: disconnectSpotify,
    loading: spotifyLoading,
  } = useSpotifyAuth();

  if (token === null) {
    return <Redirect href="/login" />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F5F5F5" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}>
        <Text style={styles.title}>Configurações</Text>

        <Card>
          <Text style={styles.cardTitle}>Spotify</Text>
          <SpotifyConnect
            connected={connected}
            loading={spotifyLoading}
            onConnect={connect}
            onDisconnect={disconnectSpotify}
          />
        </Card>

        <Card>
          <Text style={styles.cardTitle}>Conta</Text>
          <TouchableOpacity
            style={styles.buttonLogout}
            onPress={async () => {
              await logout();
            }}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Sair da conta</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ConfiguracoesScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.texto,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: COLORS.texto,
  },
  buttonLogout: {
    backgroundColor: "#E24A4A",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});