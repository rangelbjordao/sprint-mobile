import { Entypo } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Olá!</Text>
        <Text style={styles.subtitle}>
          Veja como seu bem-estar digital está hoje.
        </Text>

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
    fontSize: 24,
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
});
