import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import api from "@/services/api";
import { router } from "expo-router";

type AuthResult = { success: boolean; mensagem?: string };

export const useAuth = () => {
  const { token, setToken } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/auth", { email, password });
      const jwt = response.data?.tokenJWT;
      if (!jwt) return { success: false, mensagem: "Token JWT não recebido" };
      await setToken(jwt);
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
    await setToken(null);
  };

  const registrar = async (
    username: string,
    email: string,
    password: string,
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
