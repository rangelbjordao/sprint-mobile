import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/services/api";

const TOKEN_KEY = "jwt_token";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        console.log("[useAuth] Token encontrado no AsyncStorage:", storedToken);
        setToken(storedToken);
      } else {
        console.log("[useAuth] Nenhum token encontrado no AsyncStorage.");
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log("[useAuth] Tentando login com:", { email, password });
      const response = await api.post("/auth", { email, password });
      console.log("[useAuth] Resposta do login:", response.data);

      const jwt = response.data.tokenJWT;
      setToken(jwt);
      await AsyncStorage.setItem(TOKEN_KEY, jwt);
      console.log("[useAuth] Token salvo no AsyncStorage:", jwt);
    } catch (err: any) {
      console.error(
        "[useAuth] Erro ao logar:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || err.message || "Erro ao logar");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    console.log("[useAuth] Logout iniciado");
    setToken(null);
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log("[useAuth] Token removido do AsyncStorage");
  };

  const registrar = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      console.log("[useAuth] Tentando cadastro com:", {
        username,
        email,
        password,
      });
      const response = await api.post("/auth/criar", {
        username,
        email,
        password,
      });
      console.log("[useAuth] Resposta do cadastro:", response.data);
    } catch (err: any) {
      console.error(
        "[useAuth] Erro ao cadastrar:",
        err.response?.data || err.message
      );
      setError(
        err.response?.data?.message || err.message || "Erro ao cadastrar"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { token, login, logout, registrar, loading, error };
};
