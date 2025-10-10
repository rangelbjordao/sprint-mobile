import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ConfiguracoesScreen() {
  const [usuario, setUsuario] = useState("");
  const [spotifyConectado, setSpotifyConectado] = useState(false);
  const [mensagemSalva, setMensagemSalva] = useState("");

  const salvarUsuario = () => {
    if (usuario.trim().length < 1) {
      setMensagemSalva("Digite pelo menos 1 caractere.");
      return;
    }

    setMensagemSalva(`Usuário salvo com sucesso!`);
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
        <TouchableOpacity
          style={[
            styles.botaoSpotify,
            spotifyConectado && styles.botaoConectado,
          ]}
          onPress={() => setSpotifyConectado(!spotifyConectado)}
        >
          <FontAwesome name="spotify" size={20} color="#FFF" />
          <Text style={styles.textoBotao}>
            {spotifyConectado
              ? "Conectado com Spotify"
              : "Conectar com Spotify"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
