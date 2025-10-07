import { Entypo, Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Olá!</Text>
        <Text style={styles.subtitle}>
          Veja como seu bem-estar digital está hoje.
        </Text>

        {/* Card de humor */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Seu Humor Atual</Text>
          <View style={styles.containerHumor}>
            <Entypo name="emoji-happy" size={36} color="#007bff" />
            <Text style={styles.humorText}>Equilibrado e Positivo</Text>
          </View>
          <Text style={styles.subtitle}>
            Seu consumo recente indica um estado de humor estável.
          </Text>
        </View>

        {/* Card de resumo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo do Consumo</Text>
          <View style={styles.section}>
            <View style={styles.containerAnalise}>
              <Feather name="book-open" size={20} color="#007bff" />
              <Text style={styles.analiseTitle}>Análise de Notícias</Text>
            </View>
            <View style={styles.barraAnalise}>
              <View
                style={[
                  styles.progressBarSegment,
                  { flex: 40, backgroundColor: "#50C878" },
                ]}
              />
              <View
                style={[
                  styles.progressBarSegment,
                  { flex: 40, backgroundColor: "#A9A9A9" },
                ]}
              />
              <View
                style={[
                  styles.progressBarSegment,
                  { flex: 20, backgroundColor: "#E97451" },
                ]}
              />
            </View>
            <View>
              <View style={styles.legendContainer}>
                <Text style={styles.legendText}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#50C878" }]}
                  />{" "}
                  Positivas
                </Text>
                <Text style={styles.legendText}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#A9A9A9" }]}
                  />{" "}
                  Neutras
                </Text>
                <Text style={styles.legendText}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#E97451" }]}
                  />{" "}
                  Negativas
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.section}>
                <View style={styles.containerAnalise}>
                  <Feather name="music" size={20} color="#007bff" />
                  <Text style={styles.analiseTitle}>Análise de Músicas</Text>
                </View>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F5F5" },
  container: { padding: 16 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: { fontSize: 16 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  containerHumor: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  humorText: {
    fontSize: 22,
    fontWeight: "semibold",
    marginLeft: 12,
  },
  section: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 16,
  },
  barraAnalise: {
    flexDirection: "row",
    height: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
  },
  containerAnalise: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  analiseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007bff",
    marginLeft: 8,
  },
  progressBarSegment: {},
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  legendText: {
    fontSize: 12,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
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
