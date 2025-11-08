import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/services/api";

const TOKEN_KEY = "jwt_token";

type AuthResult = { success: boolean; mensagem?: string };

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        if (storedToken) {
          console.log(
            "[useAuth] Token encontrado no AsyncStorage:",
            storedToken
          );
          setToken(storedToken);
        } else {
          console.log("[useAuth] Nenhum token encontrado no AsyncStorage.");
        }
      } catch (err) {
        console.error("[useAuth] Erro ao carregar token do AsyncStorage:", err);
      }
    };
    loadToken();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth", { email, password });
      const jwt = response.data?.tokenJWT;
      if (!jwt)
        return {
          success: false,
          mensagem: "Token JWT não recebido do backend",
        };

      setToken(jwt);
      await AsyncStorage.setItem(TOKEN_KEY, jwt);
      return { success: true };
    } catch (err: any) {
      const msg =
        err.response?.data?.mensagem || err.message || "Erro ao logar";
      setError(msg);
      return { success: false, mensagem: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem(TOKEN_KEY);
  };

  const registrar = async (
    username: string,
    email: string,
    password: string
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/criar", { username, email, password });
      return { success: true };
    } catch (err: any) {
      const msg =
        err.response?.data?.mensagem || err.message || "Erro ao cadastrar";
      setError(msg);
      return { success: false, mensagem: msg };
    } finally {
      setLoading(false);
    }
  };

  return { token, login, logout, registrar, loading, error };
};
