import api from "@/services/api";
import { Musica } from "@/types/spotify";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SpotifyService = {
  obterUrlLoginSpotify: async (): Promise<string> => {
    try {
      const token = await AsyncStorage.getItem("jwt_token");

      const resposta = await api.get("/spotify/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return resposta.data;
    } catch (erro: any) {
      console.error("Erro ao obter URL de login do Spotify:", erro.message);
      throw new Error("Não foi possível obter a URL de login do Spotify.");
    }
  },

  verificarConexao: async (): Promise<boolean> => {
    try {
      const resposta = await api.get("/spotify/status");
      return resposta.data;
    } catch (err) {
      console.error("Erro ao verificar conexão:", err);
      return false;
    }
  },

  buscarMusicasMaisOuvidas: async (): Promise<Musica[]> => {
    try {
      const resposta = await api.get("/musicas/top");
      return resposta.data.content.map((m: any) => ({
        id: m.id,
        titulo: m.titulo,
        artista: m.artista,
        imagemUrl: m.imagemUrl,
      }));
    } catch (err) {
      console.error("Erro ao buscar músicas:", err);
      return [];
    }
  },
};

export default SpotifyService;
