import api from "@/services/api";

export type MusicaUsuario = {
  id: string;
  titulo: string;
  artista: string;
  imagemUrl?: string | null;
};

export const UserMusicService = {
  async buscarTopMusicasSpotify(limit = 10): Promise<MusicaUsuario[]> {
    const response = await api.get(
      `/usuarios/musicas/spotify/top?limit=${limit}`,
    );

    return response.data.map((m: any) => ({
      id: m.spotifyTrackId ?? m.id ?? m.titulo,
      titulo: m.titulo,
      artista: m.artista,
      imagemUrl: m.imagemUrl ?? null,
    }));
  },

  async buscarMusicasRecentesSpotify(): Promise<MusicaUsuario[]> {
    const response = await api.get("/usuarios/musicas/spotify/recentes");

    const data = response.data?.body ?? response.data ?? [];

    return data.map((m: any) => ({
      id: m.id ?? m.spotifyTrackId ?? m.titulo,
      titulo: m.titulo,
      artista: m.artista,
      imagemUrl: m.imagemUrl ?? null,
    }));
  },
};

export default UserMusicService;
