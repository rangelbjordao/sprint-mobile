import api from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const TOKEN_KEY = "jwt_token";
const NOME_KEY = "user_nome";

interface AuthContextType {
  token: string | null | undefined;
  nome: string | null;
  setToken: (token: string | null) => Promise<void>;
  setNome: (nome: string | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  token: undefined,
  nome: null,
  setToken: async () => { },
  setNome: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null | undefined>(undefined);
  const [nome, setNomeState] = useState<string | null>(null);

  useEffect(() => {
    const validarToken = async () => {
      const t = await AsyncStorage.getItem(TOKEN_KEY);
      const nomeSalvo = await AsyncStorage.getItem(NOME_KEY);

      if (!t) {
        setTokenState(null);
        setNomeState(null);
        return;
      }

      try {
        await api.get("/usuarios/humor-semanal", {
          headers: { Authorization: `Bearer ${t}` },
        });
        setTokenState(t);
        setNomeState(nomeSalvo);
      } catch (err: any) {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          await AsyncStorage.removeItem(TOKEN_KEY);
          await AsyncStorage.removeItem(NOME_KEY);
          setTokenState(null);
          setNomeState(null);
        } else {
          setTokenState(t);
          setNomeState(nomeSalvo);
        }
      }
    };

    validarToken();
  }, []);

  const setToken = useCallback(async (newToken: string | null) => {
    if (newToken) {
      await AsyncStorage.setItem(TOKEN_KEY, newToken);
    } else {
      await AsyncStorage.removeItem(TOKEN_KEY);
    }
    setTokenState(newToken);
  }, []);

  const setNome = useCallback(async (novoNome: string | null) => {
    if (novoNome) {
      await AsyncStorage.setItem(NOME_KEY, novoNome);
    } else {
      await AsyncStorage.removeItem(NOME_KEY);
    }
    setNomeState(novoNome);
  }, []);

  return (
    <AuthContext.Provider value={{ token, nome, setToken, setNome }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);