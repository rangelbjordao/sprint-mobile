import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";

interface CardNavegacaoProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const CardNavegacao = ({ href, icon, title, description }: CardNavegacaoProps) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.card}>
        {icon}
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
        <Feather name="chevron-right" size={24} color={colors.textoSecundario} />
      </TouchableOpacity>
    </Link>
  );
};

const makeStyles = (colors: typeof LIGHT) => StyleSheet.create({
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 20, marginBottom: 16, flexDirection: "row", alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4, elevation: 3 },
  cardTextContainer: { flex: 1, marginLeft: 16 },
  cardTitle: { fontSize: 17, fontWeight: "bold", color: colors.texto },
  cardDescription: { fontSize: 14, marginTop: 4, color: colors.textoSecundario },
});

export default CardNavegacao;