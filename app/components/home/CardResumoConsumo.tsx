import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CardResumoConsumo() {
  return (
    <View>
      <Text style={styles.cardTitle}>Resumo do Consumo</Text>

      {/* Análise de notícias */}
      <View style={styles.section}>
        <View style={styles.containerAnalise}>
          <Feather name="book-open" size={20} color="#007bff" />
          <Text style={styles.analiseTitle}>Análise de Notícias</Text>
        </View>

        <View style={styles.barraAnalise}>
          <View style={[{ flex: 40, backgroundColor: "#50C878" }]} />
          <View style={[{ flex: 40, backgroundColor: "#A9A9A9" }]} />
          <View style={[{ flex: 20, backgroundColor: "#E97451" }]} />
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#50C878" }]} />
            <Text style={styles.legendText}>Positivas</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#A9A9A9" }]} />
            <Text style={styles.legendText}>Neutras</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: "#E97451" }]} />
            <Text style={styles.legendText}>Negativas</Text>
          </View>
        </View>
      </View>

      {/* Análise de músicas */}
      <View style={styles.section}>
        <View style={styles.containerAnalise}>
          <Feather name="music" size={20} color="#007bff" />
          <Text style={styles.analiseTitle}>Análise de Músicas</Text>
        </View>

        <View style={styles.containerMusicStat}>
          <Text>
            Energia Média: <Text style={styles.musicStat}>0.75</Text>
          </Text>
          <Text>
            Positividade: <Text style={styles.musicStat}>0.82</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  section: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 16,
  },
  containerAnalise: { flexDirection: "row", paddingBottom: 10 },
  analiseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007bff",
    marginLeft: 8,
  },
  barraAnalise: {
    flexDirection: "row",
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendText: {
    fontSize: 12,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  containerMusicStat: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  musicStat: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
