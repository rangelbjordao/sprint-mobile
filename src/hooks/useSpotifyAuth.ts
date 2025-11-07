import { useState, useCallback } from "react";
import { Platform } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { SpotifyService } from "@/services/spotifyService";

export function useSpotifyAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (tokenJwt: string) => {
    setLoading(true);
    setError(null);

    try {
      // Pega URL de login do backend
      let urlLogin = await SpotifyService.obterUrlLoginSpotify(tokenJwt);

      // Corrige redirect_uri para IP da máquina (Expo Go)
      urlLogin = urlLogin.replace("127.0.0.1", "192.168.15.58");

      if (Platform.OS === "web") {
        // Web: redireciona normalmente
        window.location.href = urlLogin;
      } else {
        // Mobile (Expo Go / iOS / Android): abrir navegador interno
        await WebBrowser.openBrowserAsync(urlLogin);

        // Marca como conectado (placeholder)
        setAccessToken("usuario-conectado");
      }
    } catch (err) {
      console.error("Erro ao conectar com Spotify:", err);
      setError("Erro ao obter URL de login do Spotify");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
  }, []);

  return {
    accessToken,
    login,
    logout,
    loading,
    error,
  };
}
