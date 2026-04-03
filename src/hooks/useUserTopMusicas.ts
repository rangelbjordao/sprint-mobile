import { useCallback, useEffect, useState } from "react";
import UserMusicService, { MusicaUsuario } from "@/services/userMusicService";

export function useUserTopMusicas(limit = 5) {
  const [musicas, setMusicas] = useState<MusicaUsuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await UserMusicService.buscarTopMusicasSpotify(limit);
      setMusicas(data);
    } catch (err: any) {
      setError(err?.message || "Erro ao carregar músicas");
      setMusicas([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return {
    musicas,
    loading,
    error,
    recarregar: carregar,
  };
}
