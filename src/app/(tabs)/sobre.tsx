import Card from "@/components/configuracoes/Card";
import { useTheme } from "@/context/ThemeContext";
import Constants from "expo-constants";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

export default function SobreScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const appVersion = Constants.expoConfig?.version;
  const commitHash = Constants.expoConfig?.extra?.commitHash;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Sobre o App</Text>

        <Card style={colors}>
          <Text style={styles.cardTitle}>
            Informações da versão
          </Text>

          <Text style={styles.text}>
            Versão: {appVersion}
          </Text>

          <Text style={styles.text}>
            Commit: {commitHash}
          </Text>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: colors.texto,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 12,
      color: colors.texto,
    },
    text: {
      fontSize: 16,
      marginBottom: 8,
      color: colors.texto,
    },
  });