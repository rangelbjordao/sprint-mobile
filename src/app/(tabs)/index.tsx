import CardHumorAtual from "@/components/home/CardHumorAtual";
import CardHumorSemana from "@/components/home/CardHumorSemana";
import CardRecomendacao from "@/components/home/CardRecomendacao";
import CardResumoConsumo from "@/components/home/CardResumoConsumo";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const IndexScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Olá, Usuário!</Text>
      <Text style={styles.subtitle}>
        Veja como seu bem-estar digital está hoje.
      </Text>

      {/* Cards */}
      <View style={styles.card}>
        <CardHumorAtual />
      </View>

      <View style={styles.card}>
        <CardResumoConsumo />
      </View>

      <View style={styles.card}>
        <CardRecomendacao />
      </View>

      <View style={styles.card}>
        <CardHumorSemana />
      </View>
    </ScrollView>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
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
