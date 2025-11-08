import Card from "@/components/configuracoes/Card";
import LoginForm from "@/components/configuracoes/LoginForm";
import SpotifyConnect from "@/components/configuracoes/spotifyConnect";
import { useAuth } from "@/hooks/useAuth";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const ConfiguracoesScreen = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const { token, login, logout, registrar, loading } = useAuth();
  const {
    accessToken,
    logout: logoutSpotify,
    loading: spotifyLoading,
  } = useSpotifyAuth();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Sucesso", "Logout realizado com sucesso!");
    } catch (err) {
      Alert.alert("Erro", "Falha ao realizar logout.");
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password); // AuthResult
    if (result.success) {
      Alert.alert("Sucesso", "Login realizado com sucesso!");
    } else {
      Alert.alert("Erro", result.mensagem || "Erro ao logar");
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    const result = await registrar(username, email, password); 
    if (result.success) {
      Alert.alert("Sucesso", "Cadastro realizado! Faça login.");
      setIsRegistering(false);
    } else {
      Alert.alert("Erro", result.mensagem || "Erro ao cadastrar");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F5F5F5" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Configurações</Text>

        {token ? (
          <Card>
            <Text style={styles.cardTitle}>Bem-vindo!</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleLogout}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </Card>
        ) : (
          <Card>
            <Text style={styles.cardTitle}>
              {isRegistering ? "Cadastro" : "Login"}
            </Text>
            <LoginForm
              isRegistering={isRegistering}
              onLogin={handleLogin}
              onRegister={handleRegister}
              loading={loading}
            />

            <TouchableOpacity
              onPress={() => setIsRegistering(!isRegistering)}
              style={{ marginTop: 10 }}
            >
              <Text style={[styles.link, { textAlign: "center" }]}>
                {isRegistering
                  ? "Já tem conta? Faça login"
                  : "Não tem conta? Cadastre-se"}
              </Text>
            </TouchableOpacity>
          </Card>
        )}

        <Card>
          <Text style={styles.cardTitle}>Conexões</Text>
          <SpotifyConnect
            accessToken={accessToken}
            loading={spotifyLoading}
            onConnect={() => console.log("Login Spotify")}
            onDisconnect={logoutSpotify}
          />
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
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4A90E2",
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
  link: {
    color: "#4A90E2",
    fontWeight: "bold",
  },
});
