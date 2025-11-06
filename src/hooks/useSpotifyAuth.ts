import {
  carregarToken,
  removerToken,
  salvarToken,
  trocarCodigoPorToken,
} from "@/services/spotifyService";
import { SpotifyAuthHook } from "@/types/spotifyAuth";
import { EXPO_PUBLIC_SPOTIFY_CLIENT_ID } from "@env";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = EXPO_PUBLIC_SPOTIFY_CLIENT_ID;
const SCOPES = [
  "user-read-email",
  "user-read-private",
  "user-top-read",
  "user-read-recently-played",
];
const AUTH_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const REDIRECT_URI = AuthSession.makeRedirectUri();

export function useSpotifyAuth(): SpotifyAuthHook {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPES,
      responseType: AuthSession.ResponseType.Code,
      redirectUri: REDIRECT_URI,
      usePKCE: true,
    },
    { authorizationEndpoint: AUTH_URL, tokenEndpoint: TOKEN_URL }
  );

  const login = async () => {
    if (!request) return;
    setIsTokenLoading(true);
    await promptAsync();
  };

  const logout = useCallback(async () => {
    await removerToken();
    setAccessToken(null);
  }, []);

  const loadToken = useCallback(async () => {
    setIsTokenLoading(true);
    try {
      const token = await carregarToken();
      if (token) setAccessToken(token);
    } catch {
      setError("Erro ao carregar token");
    } finally {
      setIsTokenLoading(false);
    }
  }, []);

  useEffect(() => {
    const trocarCodigo = async () => {
      if (response?.type === "success" && response.params.code) {
        const code = response.params.code;
        if (!request?.codeVerifier) {
          setError("Code verifier não disponível");
          setIsTokenLoading(false);
          return;
        }
        try {
          const token = await trocarCodigoPorToken(
            code,
            request.codeVerifier,
            CLIENT_ID,
            REDIRECT_URI,
            TOKEN_URL
          );
          await salvarToken(token);
          setAccessToken(token);
        } catch {
          setError("Falha ao trocar código por token");
        } finally {
          setIsTokenLoading(false);
        }
      } else if (response?.type === "dismiss" || response?.type === "cancel") {
        setIsTokenLoading(false);
      }
    };
    trocarCodigo();
  }, [response, request]);

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  return {
    accessToken,
    promptAsync,
    loadToken,
    isTokenLoading,
    login,
    logout,
    error,
  };
}
