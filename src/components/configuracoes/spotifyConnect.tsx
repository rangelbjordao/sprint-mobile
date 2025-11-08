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
  accessToken: string | null;
  loading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const SpotifyConnect: React.FC<SpotifyConnectProps> = ({
  accessToken,
  loading,
  onConnect,
  onDisconnect,
}) => {
  const handlePress = () => {
    if (accessToken) {
      onDisconnect();
      Alert.alert("Spotify", "Você saiu do Spotify.");
    } else {
      onConnect();
    }
  };

  return loading ? (
    <ActivityIndicator color="#1DB954" />
  ) : (
    <TouchableOpacity
      style={[styles.button, accessToken ? styles.disconnect : {}]}
      onPress={handlePress}
      disabled={loading}
    >
      <FontAwesome name="spotify" size={20} color="#FFF" />
      <Text style={styles.text}>
        {accessToken ? "Desconectar do Spotify" : "Conectar com Spotify"}
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
