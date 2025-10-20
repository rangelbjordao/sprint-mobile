import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CardHumorSemana() {
  const humorSemana = [
    { dia: "S", valor: 85 },
    { dia: "T", valor: 70 },
    { dia: "Q", valor: 55 },
    { dia: "Q", valor: 30 },
    { dia: "S", valor: 90 },
    { dia: "S", valor: 60 },
    { dia: "D", valor: 40 },
  ];

  const getEmoji = (valor: number) => {
    if (valor <= 30) {
      return (
        <MaterialCommunityIcons
          name="emoticon-sad-outline"
          size={32}
          color="#E63946"
        />
      );
    }
    if (valor <= 70) {
      return (
        <MaterialCommunityIcons
          name="emoticon-neutral-outline"
          size={32}
          color="#F4A261"
        />
      );
    }
    return (
      <MaterialCommunityIcons
        name="emoticon-happy-outline"
        size={32}
        color="#2A9D8F"
      />
    );
  };

  return (
    <View>
      <Text style={styles.cardTitle}>Evolução do Humor na Semana</Text>
      <View style={styles.containerSemana}>
        {humorSemana.map((item, i) => (
          <View key={i} style={styles.containerDiaSemana}>
            <Text style={styles.emoji}>{getEmoji(item.valor)}</Text>
            <Text style={styles.humorValor}>{item.valor}</Text>
            <Text style={styles.diaLabel}>{item.dia}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  containerSemana: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  containerDiaSemana: { alignItems: "center", flex: 1 },
  emoji: { fontSize: 32, marginBottom: 6 },
  humorValor: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  diaLabel: { fontSize: 14 },
});
