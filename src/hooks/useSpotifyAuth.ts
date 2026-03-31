import { useState, useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SpotifyService } from "@/services/spotifyService";

const SPOTIFY_CONNECTED_KEY = "spotify_connected";

export function useSpotifyAuth() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkConnected = useCallback(async () => {
    const val = await AsyncStorage.getItem(SPOTIFY_CONNECTED_KEY);
    setConnected(val === "true");
  }, []);

  const connect = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const urlLogin = await SpotifyService.obterUrlLoginSpotify();

      const result = await WebBrowser.openAuthSessionAsync(
        urlLogin,
        Linking.createURL("/spotify-callback"),
      );

      if (
        result.type === "success" ||
        result.type === "dismiss" ||
        result.type === "cancel"
      ) {
        await AsyncStorage.setItem(SPOTIFY_CONNECTED_KEY, "true");
        setConnected(true);
      }
    } catch (err) {
      console.error("Erro ao conectar com Spotify:", err);
      setError("Erro ao conectar com o Spotify");
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    await AsyncStorage.removeItem(SPOTIFY_CONNECTED_KEY);
    setConnected(false);
  }, []);

  return { connected, connect, disconnect, checkConnected, loading, error };
}
