import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIGHT, DARK } from "@/constants/colors";

type Theme = typeof LIGHT;

interface ThemeContextType {
  colors: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: LIGHT,
  isDark: false,
  toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === "dark");

  useEffect(() => {
    AsyncStorage.getItem("tema").then((val) => {
      if (val !== null) setIsDark(val === "dark");
      else setIsDark(systemScheme === "dark");
    });
  }, []);

  const toggleTheme = async () => {
    const novo = !isDark;
    setIsDark(novo);
    await AsyncStorage.setItem("tema", novo ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ colors: isDark ? DARK : LIGHT, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);