import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function CardRecomendacao() {
  return (
    <View>
      <Text style={styles.cardTitle}>Recomendação do Dia</Text>
      <Feather
        name="alert-circle"
        size={24}
        color="#D0021B"
        style={{ marginBottom: 8 }}
      />
      <Text>
        Notamos um aumento no consumo de notícias negativas hoje. Que tal
        equilibrar com uma playlist mais calma?
      </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver Playlist Relaxante</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});
