import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Text style={styles.headerTitle}>Olá!</Text>
        <Text style={styles.headerSubtitle}>
          Veja como seu bem-estar digital está hoje.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F5F5F5" },
  container: { padding: 16 },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  headerSubtitle: { fontSize: 16, marginBottom: 20 },
});
