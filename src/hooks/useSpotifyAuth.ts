import { SpotifyService } from "@/services/spotifyService";
import { useCallback, useState } from "react";

export function useSpotifyAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (tokenJwt: string) => {
    setLoading(true);
    setError(null);

    try {
      const urlLogin = await SpotifyService.obterUrlLoginSpotify(tokenJwt);
      window.location.href = urlLogin;
    } catch (err) {
      setError("Erro ao obter URL de login do Spotify");
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading, error };
}
