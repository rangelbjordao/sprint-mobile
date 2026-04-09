import CardHumorAtual from "@/components/home/CardHumorAtual";
import CardHumorSemana from "@/components/home/CardHumorSemana";
import CardRecomendacao from "@/components/home/CardRecomendacao";
import CardRelatorioApex from "@/components/home/CardRelatorioApex";
import { useAuthContext } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";

const IndexScreen = () => {
  const { nome } = useAuthContext();
  const primeiroNome = nome?.trim().split(" ")[0] || "Usuário";

  console.log("HOME INDEX RENDERIZOU");

  useEffect(() => {
    console.log("HOME INDEX useEffect RODOU");

    async function testarApexSimples() {
      try {
        console.log("TESTE APEX INICIOU");

        const response = await fetch(
          "https://oracleapex.com/ords/wksp_emotiwave/humor/registros"
        );

        const text = await response.text();

        console.log("TESTE APEX STATUS:", response.status);
        console.log("TESTE APEX BODY:", text);
      } catch (error: any) {
        console.log("TESTE APEX ERRO:", error?.message);
      }
    }

    testarApexSimples();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        Olá, {primeiroNome}!
      </Text>
      <Text style={styles.subtitle}>
        Veja como seu bem-estar digital está hoje.
      </Text>

      <View style={styles.card}>
        <CardHumorAtual />
      </View>

      <View style={styles.card}>
        <CardRecomendacao />
      </View>

      <View style={styles.card}>
        <CardHumorSemana />
      </View>

      <View style={styles.card}>
        <CardRelatorioApex />
      </View>
    </ScrollView>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: COLORS.texto,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: COLORS.texto,
  },
  card: {
    backgroundColor: "#FFFFFF",
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