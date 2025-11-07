import { useAuth } from "@/hooks/useAuth";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
  const [mensagem, setMensagem] = useState("");
  const { token, login, logout, registrar, loading, error } = useAuth();
  const {
    accessToken,
    logout: logoutSpotify,
    loading: isTokenLoadingSpotify,
  } = useSpotifyAuth();

  const handleLoginLogout = async () => {
    setMensagem("");
    try {
      if (token) {
        await logout();
        setMensagem("Logout realizado com sucesso!");
      } else if (isCadastro) {
        if (!usuario || !email || !senha) {
          setMensagem("Preencha todos os campos para cadastro");
          return;
        }
        await registrar(usuario, email, senha);
        setMensagem("Cadastro realizado! Faça login.");
        setIsCadastro(false);
      } else {
        if (!email || !senha) {
          setMensagem("Digite email e senha");
          return;
        }
        await login(email, senha);
        setMensagem("Login realizado com sucesso!");
      }
    } catch (err: any) {
      setMensagem("Erro: " + (error || err.message));
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
        console.error(erro);
        Alert.alert("Erro", "Falha ao conectar com Spotify.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>
          {isCadastro ? "Cadastro" : "Perfil"}
        </Text>

        {isCadastro && (
          <View style={styles.inputGroup}>
            <Feather name="user" size={20} color="#666" style={styles.icone} />
            <TextInput
              style={styles.input}
              placeholder="Usuário"
              value={usuario}
              onChangeText={setUsuario}
            />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Feather name="mail" size={20} color="#666" style={styles.icone} />
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
          <Feather name="lock" size={20} color="#666" style={styles.icone} />
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
        >
          <Text style={styles.textoBotaoSalvar}>
            {isCadastro ? "Cadastrar" : token ? "Logout" : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsCadastro(!isCadastro)}>
          <Text style={[styles.mensagem, { color: "#4A90E2", marginTop: 8 }]}>
            {isCadastro
              ? "Já tem conta? Faça login"
              : "Não tem conta? Cadastre-se"}
          </Text>
        </TouchableOpacity>

        {mensagem ? <Text style={styles.mensagem}>{mensagem}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Conexões</Text>

        {isTokenLoadingSpotify ? (
          <ActivityIndicator color="#1DB954" />
        ) : (
          <TouchableOpacity
            style={[
              styles.botaoSpotify,
              accessToken ? styles.botaoDesconectar : {},
            ]}
            onPress={handleSpotify}
          >
            <FontAwesome name="spotify" size={20} color="#FFF" />
            <Text style={styles.textoBotao}>
              {accessToken ? "Desconectar do Spotify" : "Conectar com Spotify"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ConfiguracoesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F5F5F5" },
  titulo: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitulo: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  icone: { marginRight: 10 },
  input: { flex: 1, height: 45, fontSize: 16 },
  botaoSalvar: {
    backgroundColor: "#4A90E2",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotaoSalvar: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  botaoSpotify: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1DB954",
    paddingVertical: 10,
    borderRadius: 8,
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
    color: "#4A90E2",
    fontWeight: "bold",
    textAlign: "center",
  },
});
