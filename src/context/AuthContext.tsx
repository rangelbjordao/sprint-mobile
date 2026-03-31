import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    let mounted = true;

    AsyncStorage.getItem(TOKEN_KEY).then((t) => {
      if (mounted) setTokenState(t ?? null);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const setToken = useCallback(async (newToken: string | null) => {
    setTokenState(newToken);

    if (newToken) {
      await AsyncStorage.setItem(TOKEN_KEY, newToken);
    } else {
      await AsyncStorage.removeItem(TOKEN_KEY);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);