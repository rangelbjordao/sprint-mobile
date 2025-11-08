import { useAuth } from "@/hooks/useAuth";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ConfiguracoesScreen = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [isCadastro, setIsCadastro] = useState(false);

  const { token, login, logout, registrar, loading } = useAuth();
  const {
    accessToken,
    logout: logoutSpotify,
    loading: isTokenLoadingSpotify,
  } = useSpotifyAuth();

  const handleLoginLogout = async () => {
    if (token) {
      await logout();
      Alert.alert("Sucesso", "Logout realizado com sucesso!");
      return;
    }

    if (isCadastro) {
      if (!usuario || !email || !senha) {
        Alert.alert("Atenção", "Preencha todos os campos para cadastro");
        return;
      }
      const resultado = await registrar(usuario, email, senha);
      if (resultado.success) {
        Alert.alert("Sucesso", "Cadastro realizado! Faça login.");
        setIsCadastro(false);
      } else {
        Alert.alert("Erro", resultado.mensagem || "Erro ao cadastrar");
      }
    } else {
      if (!email || !senha) {
        Alert.alert("Atenção", "Digite email e senha");
        return;
      }
      const resultado = await login(email, senha);
      if (resultado.success) {
        Alert.alert("Sucesso", "Login realizado com sucesso!");
      } else {
        Alert.alert("Erro", resultado.mensagem || "Erro ao logar");
      }
    }
  };

  const handleSpotify = async () => {
    if (accessToken) {
      logoutSpotify();
      Alert.alert("Spotify", "Você saiu do Spotify.");
    } else {
      try {
        console.log("Iniciar login Spotify...");
      } catch (erro) {
        Alert.alert("Erro", "Falha ao conectar com Spotify.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F5F5F5" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Configurações</Text>

        {token ? (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Bem-vindo, {usuario || email}</Text>
            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={handleLoginLogout}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.textoBotaoSalvar}>Logout</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>
              {isCadastro ? "Cadastro" : "Login"}
            </Text>

            {isCadastro && (
              <View style={styles.inputGroup}>
                <Feather
                  name="user"
                  size={20}
                  color="#666"
                  style={styles.icone}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Usuário"
                  value={usuario}
                  onChangeText={setUsuario}
                />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Feather
                name="mail"
                size={20}
                color="#666"
                style={styles.icone}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Feather
                name="lock"
                size={20}
                color="#666"
                style={styles.icone}
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={handleLoginLogout}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.textoBotaoSalvar}>
                  {isCadastro ? "Cadastrar" : "Login"}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsCadastro(!isCadastro)}
              style={{ marginTop: 10 }}
            >
              <Text style={[styles.mensagem, { color: "#4A90E2" }]}>
                {isCadastro
                  ? "Já tem conta? Faça login"
                  : "Não tem conta? Cadastre-se"}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Conexões</Text>

          {isTokenLoadingSpotify ? (
            <ActivityIndicator color="#1DB954" />
          ) : (
            <TouchableOpacity
              style={[
                styles.botaoSpotify,
                accessToken ? styles.botaoDesconectar : {},
                { opacity: isTokenLoadingSpotify ? 0.6 : 1 },
              ]}
              onPress={handleSpotify}
              disabled={isTokenLoadingSpotify}
            >
              <FontAwesome name="spotify" size={20} color="#FFF" />
              <Text style={styles.textoBotao}>
                {accessToken
                  ? "Desconectar do Spotify"
                  : "Conectar com Spotify"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ConfiguracoesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
  },
  icone: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  botaoSalvar: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotaoSalvar: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoSpotify: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    borderRadius: 10,
  },
  botaoDesconectar: { backgroundColor: "#b02c1b" },
  textoBotao: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  mensagem: {
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
});
