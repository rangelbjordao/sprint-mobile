import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface SpotifyConnectProps {
  connected: boolean;
  loading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const SpotifyConnect: React.FC<SpotifyConnectProps> = ({
  connected,
  loading,
  onConnect,
  onDisconnect,
}) => {
  const handlePress = () => {
    if (connected) {
      onDisconnect();
      Alert.alert("Spotify", "Você desconectou o Spotify.");
    } else {
      onConnect();
    }
  };

  return loading ? (
    <ActivityIndicator color="#1DB954" />
  ) : (
    <TouchableOpacity
      style={[styles.button, connected ? styles.disconnect : {}]}
      onPress={handlePress}
      disabled={loading}
    >
      <FontAwesome name="spotify" size={20} color="#FFF" />
      <Text style={styles.text}>
        {connected ? "Desconectar do Spotify" : "Conectar com Spotify"}
      </Text>
    </TouchableOpacity>
  );
};

export default SpotifyConnect;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1DB954",
    paddingVertical: 12,
    borderRadius: 10,
  },
  disconnect: {
    backgroundColor: "#b02c1b",
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});