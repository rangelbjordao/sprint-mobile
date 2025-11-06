import { Musica } from "@/types/spotify";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const TOKEN_STORAGE_KEY = "spotify_access_token";

export async function salvarToken(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
  } catch (err) {
    console.error("Erro ao salvar token:", err);
  }
}

export async function carregarToken(): Promise<string | null> {
  try {
    return AsyncStorage.getItem(TOKEN_STORAGE_KEY);
  } catch (err) {
    console.error("Erro ao carregar token:", err);
    return null;
  }
}

export async function removerToken() {
  try {
    await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
  } catch (err) {
    console.error("Erro ao remover token:", err);
  }
}

export async function trocarCodigoPorToken(
  code: string,
  codeVerifier: string,
  clientId: string,
  redirectUri: string,
  tokenUrl: string
): Promise<string> {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    code_verifier: codeVerifier,
  }).toString();

  const resposta = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await resposta.json();
  if (!data.access_token) throw new Error("Não foi possível obter token");
  return data.access_token;
}

export async function buscarMusicasRecentes(): Promise<Musica[]> {
  const token = await carregarToken();
  if (!token) throw new Error("Token não encontrado");

  const resposta = await axios.get(
    "https://api.spotify.com/v1/me/player/recently-played?limit=5",
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return resposta.data.items.map((item: any) => item.track);
}
