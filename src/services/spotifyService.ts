import api from "@/services/api";
import { Musica } from "@/types/spotify";

export const SpotifyService = {
  obterUrlLoginSpotify: async (tokenJwt: string): Promise<string> => {
    try {
      const resposta = await api.get("/spotify/auth", {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0ZUBlbWFpbC5jb20iLCJpc3MiOiJBUEkgRW1vdGlXYXZlIiwiZXhwIjoxNzYyNjEzNzU0fQ.3Bubob7g6Y7W8QXNjNzouRP75nyRNJgYVqxg4asB_8I",
        },
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
