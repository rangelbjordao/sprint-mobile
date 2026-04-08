import { useAuthContext } from "@/context/AuthContext";
import api from "@/services/api";
import { useState } from "react";

type AuthResult = { success: boolean; mensagem?: string };

export const useAuth = () => {
  const { token, setToken, setNome } = useAuthContext();
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
      console.log("LOGIN RESPONSE:", response.data);

      const jwt = response.data?.tokenJWT;
      const nomeUsuario =
        response.data?.username ||
        response.data?.nome ||
        response.data?.name ||
        email.split("@")[0] ||
        null;

      if (!jwt) {
        return { success: false, mensagem: "Token JWT não recebido" };
      }

      await setToken(jwt);
      await setNome(nomeUsuario);

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
    await setNome(null);
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
