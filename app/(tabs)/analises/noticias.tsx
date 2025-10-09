import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const AnaliseNoticiasScreen = () => {
  const sentimentoData = [
    { label: "Positivas", value: 25, color: "#50C878" },
    { label: "Negativas", value: 55, color: "#E97451" },
    { label: "Neutras", value: 20, color: "#A9A9A9" },
  ];

  const mockNoticias = [
    {
      id: "1",
      fonte: "G1 Tech",
      titulo: "Nova tecnologia promete revolucionar baterias de celular",
      sentimento: "#50C878",
    },
    {
      id: "2",
      fonte: "CNN Brasil",
      titulo: "Inflação preocupa mercado e bolsa opera em queda",
      sentimento: "#E97451",
    },
    {
      id: "3",
      fonte: "Estadão",
      titulo: "Congresso aprova novo marco regulatório para o setor",
      sentimento: "#A9A9A9",
    },
    {
      id: "4",
      fonte: "Folha de S.Paulo",
      titulo: "Crise hídrica se agrava em estados do sudeste",
      sentimento: "#E97451",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Análise de Notícias</Text>

      {/* Barra de sentimentos */}
      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Balanço de Sentimentos</Text>
        <View style={styles.barraAnalise}>
          {sentimentoData.map((s) => (
            <View
              key={s.label}
              style={{ flex: s.value, backgroundColor: s.color }}
            />
          ))}
        </View>

        <View style={styles.legendContainer}>
          {sentimentoData.map((s) => (
            <View key={s.label} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: s.color }]} />
              <Text style={styles.legendText}>
                {s.label} ({s.value}%)
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Lista de artigos */}
      <Text style={styles.sectionTitulo}>Artigos Recentes</Text>
      {mockNoticias.map((item) => (
        <View key={item.id} style={styles.noticiaItem}>
          <View
            style={[styles.indicator, { backgroundColor: item.sentimento }]}
          />
          <View style={styles.noticiaInfo}>
            <Text style={styles.noticiaTitulo} numberOfLines={2}>
              {item.titulo}
            </Text>
            <Text style={styles.noticiaFonte}>{item.fonte}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default AnaliseNoticiasScreen;
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  barraAnalise: {
    flexDirection: "row",
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
  },
  legendContainer: {
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
  },
  sectionTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noticiaItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  noticiaInfo: {
    flex: 1,
    marginLeft: 12,
  },
  noticiaTitulo: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  noticiaFonte: {
    fontSize: 14,
    color: "#4A90E2",
  },
  indicator: {
    width: 10,
    height: 40,
    borderRadius: 5,
  },
});
