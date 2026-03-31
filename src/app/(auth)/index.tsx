import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/login/LoginForm";

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, registrar, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (result.success) {
      router.replace("/(tabs)");
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    console.log("Tentando cadastrar:", { username, email, password });
    const result = await registrar(username, email, password);
    console.log("Resultado:", result);
    if (result.success) {
      setIsRegistering(false);
    } else {
      Alert.alert("Erro", result.mensagem || "Erro ao cadastrar");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>EmotiWave</Text>
        <Text style={styles.subtitulo}>
          {isRegistering ? "Crie sua conta" : "Bem-vindo de volta"}
        </Text>

        <LoginForm
          isRegistering={isRegistering}
          onLogin={handleLogin}
          onRegister={handleRegister}
          loading={loading}
        />

        <TouchableOpacity
          onPress={() => setIsRegistering(!isRegistering)}
          style={styles.toggleButton}
        >
          <Text style={styles.toggleText}>
            {isRegistering
              ? "Já tem conta? Fazer login"
              : "Não tem conta? Cadastrar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#1DB954",
  },
  subtitulo: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 32,
  },
  toggleButton: {
    marginTop: 20,
    alignItems: "center",
  },
  toggleText: {
    color: "#4A90E2",
    fontSize: 14,
  },
});