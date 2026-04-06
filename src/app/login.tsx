import LoginForm from "@/components/login/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
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
import { COLORS } from "../constants/colors";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, registrar, loading, token } = useAuth();

  if (token) {
    return <Redirect href="/(tabs)" />;
  }

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (!result.success) {
      Alert.alert(
        "Não foi possível entrar",
        result.mensagem || "Verifique seu e-mail e senha e tente novamente."
      );
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    const result = await registrar(username, email, password);
    if (result.success) {
      Alert.alert("Sucesso", "Conta criada! Faça login.");
      setIsRegistering(false);
    } else {
      Alert.alert("Erro ao cadastrar", result.mensagem || "Erro ao criar conta");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView

        contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>EmotiWave</Text>
        <Text style={styles.subtitulo}>
          {isRegistering ? "Crie sua conta" : "Bem-vindo"}
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
    flexGrow: 1,
    backgroundColor: COLORS.background
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold", textAlign: "center", marginBottom: 8, color: "#1DB954"
  },
  subtitulo: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.texto,
    marginBottom: 32
  },
  toggleButton: {
    marginTop: 20,
    alignItems: "center"
  },
  toggleText: {
    color: "#4A90E2",
    fontSize: 14
  },
});