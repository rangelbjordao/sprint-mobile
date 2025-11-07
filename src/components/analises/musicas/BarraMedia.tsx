import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BarraMediaProps {
  label: string;
  value: number;
  color: string;
}

const BarraMedia = ({ label, value, color }: BarraMediaProps) => {
  return (
    <View style={styles.barraContainer}>
      <View style={styles.labelRow}>
        <Text style={styles.barraLabel}>{label}</Text>
        <Text style={styles.percentText}>{Math.round(value * 100)}%</Text>
      </View>
      <View style={styles.barraBackground}>
        <View
          style={[
            styles.barraFill,
            { width: `${value * 100}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

export default BarraMedia;

const styles = StyleSheet.create({
  barraContainer: {
    marginBottom: 16,
  },
  barraLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  barraBackground: {
    width: "100%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  barraFill: {
    height: "100%",
    borderRadius: 5,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  percentText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
