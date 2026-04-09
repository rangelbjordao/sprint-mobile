import LoginForm from "@/components/login/LoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";
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

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const { login, registrar, loading, token } = useAuth();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  if (token) {
    return <Redirect href="/(tabs)" />;
  }

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    if (!result.success) {
      Alert.alert("Não foi possível entrar", result.mensagem || "Verifique seu e-mail e senha e tente novamente.");
    }
  };

  const handleRegister = async (username: string, email: string, password: string) => {
    const result = await registrar(username, email, password);
    if (result.success) {
      Alert.alert("Sucesso", "Conta criada! Faça login.");
      setIsRegistering(false);
    } else {
      Alert.alert("Erro ao cadastrar", result.mensagem || "Erro ao criar conta");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>EmotiWave</Text>
        <Text style={styles.subtitulo}>{isRegistering ? "Crie sua conta" : "Bem-vindo"}</Text>

        <LoginForm
          isRegistering={isRegistering}
          onLogin={handleLogin}
          onRegister={handleRegister}
          loading={loading}
        />

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} style={styles.toggleButton}>
          <Text style={styles.toggleText}>
            {isRegistering ? "Já tem conta? Fazer login" : "Não tem conta? Cadastrar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (colors: typeof LIGHT) => StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 24 },
  titulo: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 8, color: "#1DB954" },
  subtitulo: { fontSize: 16, textAlign: "center", color: colors.textoSecundario, marginBottom: 32 },
  toggleButton: { marginTop: 20, alignItems: "center" },
  toggleText: { color: colors.primary, fontSize: 14 },
});