import { Musica } from "@/types/spotify";
import axios from "axios";
import { Platform } from "react-native";
import Constants from "expo-constants";

const API_BASE = (() => {
  if (Platform.OS === "web") {
    // Web
    return "http://localhost:8080";
  }

  // app móvel ou emulador
  const host = Constants.expoConfig?.hostUri?.split(":")[0];
  return host ? `http://${host}:8080` : "http://localhost:8080";
})();

export const SpotifyService = {
  obterUrlLoginSpotify: async (tokenJwt: string): Promise<string> => {
    const resposta = await axios.get(`${API_BASE}/spotify/auth`, {
      headers: { Authorization: `Bearer ${tokenJwt}` },
    });
    return resposta.data;
  },

  buscarMusicasMaisOuvidas: async (): Promise<Musica[]> => {
    try {
      const resposta = await axios.get(`${API_BASE}/musicas/top`);
      return resposta.data.content;
    } catch (err) {
      console.error("Erro ao buscar músicas:", err);
      return [];
    }
  },
};
