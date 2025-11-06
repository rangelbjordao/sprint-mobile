import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPO_PUBLIC_SPOTIFY_CLIENT_ID } from "@env";

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
const TOKEN_STORAGE_KEY = "spotify_access_token";

console.log("Redirect URI:", REDIRECT_URI);

export function useSpotifyAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState(true);
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPES,
      responseType: AuthSession.ResponseType.Code,
      redirectUri: REDIRECT_URI,
      usePKCE: true,
    },
    {
      authorizationEndpoint: AUTH_URL,
      tokenEndpoint: TOKEN_URL,
    }
  );

  const saveToken = useCallback(async (token: string) => {
    setAccessToken(token);
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
  }, []);

  const loadToken = useCallback(async () => {
    setIsTokenLoading(true);
    try {
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      if (token) setAccessToken(token);
    } catch (error) {
      console.error("Erro ao carregar token do AsyncStorage:", error);
    } finally {
      setIsTokenLoading(false);
    }
  }, []);

  const login = async () => {
    if (!request) return;
    setIsTokenLoading(true);
    await promptAsync();
  };

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
    setAccessToken(null);
    Alert.alert("Logout", "Desconectado do Spotify com sucesso!");
  }, []);

  useEffect(() => {
    const trocarCodigoPorToken = async () => {
      if (response?.type === "success" && response.params.code) {
        const codigo = response.params.code;

        if (!request?.codeVerifier) {
          console.error("Code verifier não disponível!");
          Alert.alert(
            "Erro",
            "Não foi possível obter o code verifier do AuthSession."
          );
          setIsTokenLoading(false);
          return;
        }

        try {
          const body = new URLSearchParams({
            grant_type: "authorization_code",
            code: codigo,
            redirect_uri: REDIRECT_URI,
            client_id: CLIENT_ID,
            code_verifier: request.codeVerifier,
          }).toString();

          const tokenResposta = await fetch(TOKEN_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body,
          });

          const data = await tokenResposta.json();
          if (data.access_token) {
            await saveToken(data.access_token);
            Alert.alert("Sucesso", "Login realizado com o Spotify!");
          } else {
            console.error("Erro ao trocar código por token", data);
            Alert.alert("Erro", "Não foi possível obter token do Spotify.");
          }
        } catch (error) {
          console.error("Erro na requisição de token:", error);
          Alert.alert("Erro", "Falha na requisição de token.");
        } finally {
          setIsTokenLoading(false);
        }
      } else if (response?.type === "dismiss" || response?.type === "cancel") {
        setIsTokenLoading(false);
      }
    };

    trocarCodigoPorToken();
  }, [response, request, saveToken]);

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  return {
    accessToken,
    promptAsync,
    request,
    loadToken,
    isTokenLoading,
    login,
    logout,
  };
}
