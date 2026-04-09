import CardHumorAtual from "@/components/home/CardHumorAtual";
import CardHumorSemana from "@/components/home/CardHumorSemana";
import CardRecomendacao from "@/components/home/CardRecomendacao";
import CardRelatorioApex from "@/components/home/CardRelatorioApex";
import { useAuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const IndexScreen = () => {
  const { nome } = useAuthContext();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const primeiroNome = nome?.trim().split(" ")[0] || "Usuário";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">Olá, {primeiroNome}!</Text>
      <Text style={styles.subtitle}>Veja como seu bem-estar digital está hoje.</Text>

      <View style={styles.card}><CardHumorAtual /></View>
      <View style={styles.card}><CardRecomendacao /></View>
      <View style={styles.card}><CardHumorSemana /></View>
      <View style={styles.card}><CardRelatorioApex /></View>
    </ScrollView>
  );
};

export default IndexScreen;

const makeStyles = (colors: typeof LIGHT) => StyleSheet.create({
  container: { padding: 16, flexGrow: 1, backgroundColor: colors.background },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 8, color: colors.texto },
  subtitle: { fontSize: 16, marginBottom: 16, color: colors.textoSecundario },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});