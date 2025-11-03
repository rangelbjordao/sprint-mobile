import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function CardHumorAtual() {
  return (
    <View>
      <Text style={styles.cardTitle}>Seu Humor Atual</Text>
      <View style={styles.containerHumor}>
        <Entypo name="emoji-happy" size={36} color="#007bff" />
        <Text style={styles.humorText}>Equilibrado e Positivo</Text>
      </View>
      <Text style={styles.subtitle}>
        Seu consumo recente indica um estado de humor estável.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
  subtitle: { fontSize: 16 },
});
