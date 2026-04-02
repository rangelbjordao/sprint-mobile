import { useState, useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SpotifyService } from "@/services/spotifyService";
import api from "@/services/api";
import { AppState } from "react-native";

const SPOTIFY_CONNECTED_KEY = "spotify_connected";

export function useSpotifyAuth() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkConnected = useCallback(async () => {
    try {
      const conectado = await SpotifyService.verificarConexao();
      setConnected(conectado);

      if (conectado) {
        await AsyncStorage.setItem(SPOTIFY_CONNECTED_KEY, "true");
      } else {
        await AsyncStorage.removeItem(SPOTIFY_CONNECTED_KEY);
      }
    } catch {
      // fallback local
      const val = await AsyncStorage.getItem(SPOTIFY_CONNECTED_KEY);
      setConnected(val === "true");
    }
  }, []);

  // 🔥 Atualiza automaticamente quando app volta do Spotify
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active" && !loading) {
        checkConnected();
      }
    });

    return () => subscription.remove();
  }, [checkConnected, loading]);

  const connect = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const urlLogin = await SpotifyService.obterUrlLoginSpotify();

      await WebBrowser.openBrowserAsync(urlLogin);

      // ⏳ espera o backend processar callback
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await checkConnected();
    } catch (err) {
      console.error("Erro ao conectar com Spotify:", err);
      setError("Erro ao conectar com o Spotify");
    } finally {
      setLoading(false);
    }
  }, [checkConnected]);

  const disconnect = useCallback(async () => {
    try {
      setLoading(true);

      await api.delete("/spotify/disconnect");

      await AsyncStorage.removeItem(SPOTIFY_CONNECTED_KEY);

      // 🔥 garante sincronização com backend
      await checkConnected();
    } catch (err) {
      console.error("Erro ao desconectar Spotify:", err);
      setError("Erro ao desconectar do Spotify");
    } finally {
      setLoading(false);
    }
  }, [checkConnected]);

  return {
    connected,
    connect,
    disconnect,
    checkConnected,
    loading,
    error,
  };
}
