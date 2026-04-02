import api from "@/services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const TOKEN_KEY = "jwt_token";

interface AuthContextType {
  token: string | null | undefined;
  setToken: (token: string | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  token: undefined,
  setToken: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setTokenState] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const validarToken = async () => {
      const t = await AsyncStorage.getItem(TOKEN_KEY);
      if (!t) {
        setTokenState(null);
        return;
      }
      try {
        await api.get("/usuarios/humor-semanal", {
          headers: { Authorization: `Bearer ${t}` },
        });
        setTokenState(t);
      } catch (err: any) {
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          await AsyncStorage.removeItem(TOKEN_KEY);
          setTokenState(null);
        } else {
          setTokenState(t);
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

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);