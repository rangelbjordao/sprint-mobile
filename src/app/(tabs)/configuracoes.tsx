import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import SpotifyService from "@/services/spotifyService";
import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import * as WebBrowser from "expo-web-browser";

const ConfiguracoesScreen = () => {
  const [usuario, setUsuario] = useState("");
  const [mensagemSalva, setMensagemSalva] = useState("");

  const {
    accessToken,
    login,
    logout,
    loading: isTokenLoading,
    error,
  } = useSpotifyAuth();

  // 🔑 JWT fixo apenas para testes
  const tokenJwtDoUsuario =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZUBlbWFpbC5jb20iLCJpc3MiOiJBUEkgRW1vdGlXYXZlIiwiZXhwIjoxNzYyNjEzNzU0fQ.3Bubob7g6Y7W8QXNjNzouRP75nyRNJgYVqxg4asB_8I";

  const salvarUsuario = () => {
    if (usuario.trim().length < 1) {
      setMensagemSalva("Digite pelo menos 1 caractere.");
      return;
    }
    setMensagemSalva("Usuário salvo com sucesso!");
  };

  const handleSpotifyLogin = async () => {
    try {
      const url = await SpotifyService.obterUrlLoginSpotify(tokenJwtDoUsuario);

      // Corrige 127.0.0.1 para IP do PC
      const urlCorrigida = url.replace("127.0.0.1", "192.168.15.58");

      // Abre no navegador do celular
      await WebBrowser.openBrowserAsync(urlCorrigida);
    } catch (erro) {
      console.error("Erro ao iniciar login do Spotify:", erro);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Perfil</Text>
        <View style={styles.inputGroup}>
          <Feather name="user" size={20} color="#666" style={styles.icone} />
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={usuario}
            onChangeText={setUsuario}
          />
        </View>

        <TouchableOpacity style={styles.botaoSalvar} onPress={salvarUsuario}>
          <Text style={styles.textoBotaoSalvar}>Salvar Usuário</Text>
        </TouchableOpacity>
        {mensagemSalva !== "" && (
          <Text style={styles.mensagem}>{mensagemSalva}</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Conexões</Text>

        {isTokenLoading ? (
          <ActivityIndicator color="#1DB954" />
        ) : (
          <TouchableOpacity
            style={[
              styles.botaoSpotify,
              accessToken ? styles.botaoDesconectar : {},
            ]}
            onPress={async () => {
              if (accessToken) {
                logout();
                Alert.alert(
                  "Desconectado",
                  "Você saiu do Spotify com sucesso."
                );
              } else {
                try {
                  console.log("Obtendo URL de login do Spotify...");
                  let url = await SpotifyService.obterUrlLoginSpotify(
                    tokenJwtDoUsuario
                  );

                  // Corrige o redirect_uri de 127.0.0.1 para o IP da máquina
                  url = url.replace("127.0.0.1", "192.168.15.58");
                  console.log("URL corrigida:", url);

                  // Abre no navegador do celular
                  await WebBrowser.openBrowserAsync(url);
                } catch (erro) {
                  console.error("Erro ao iniciar login do Spotify:", erro);
                  Alert.alert("Erro", "Falha ao conectar com Spotify.");
                }
              }
            }}
          >
            <FontAwesome name="spotify" size={20} color="#FFF" />
            <Text style={styles.textoBotao}>
              {accessToken ? "Desconectar do Spotify" : "Conectar com Spotify"}
            </Text>
          </TouchableOpacity>
        )}

        {error && (
          <Text style={{ color: "red", marginTop: 8 }}>
            Erro: {error.toString()}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ConfiguracoesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#F5F5F5" },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitulo: {
    fontSize: 18,
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
    paddingVertical: 10,
    borderRadius: 8,
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
    paddingVertical: 10,
    borderRadius: 8,
  },
  botaoConectado: {
    backgroundColor: "#5a8e6b",
  },
  botaoDesconectar: {
    backgroundColor: "#b02c1b",
  },
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
