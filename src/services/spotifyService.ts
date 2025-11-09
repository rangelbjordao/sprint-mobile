import api from "@/services/api";
import { Musica } from "@/types/spotify";

export const SpotifyService = {
  obterUrlLoginSpotify: async (): Promise<string> => {
    try {
      const resposta = await api.get("/spotify/auth", {
        headers: {},
      });

      const urlCorrigida = resposta.data.replace("127.0.0.1", "192.168.15.58");
      return urlCorrigida;
    } catch (erro: any) {
      console.error("Erro ao obter URL de login do Spotify:", erro.message);
      throw new Error("Não foi possível obter a URL de login do Spotify.");
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
