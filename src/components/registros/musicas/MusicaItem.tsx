import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Musica } from "@/types/spotify";
import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";

type Props = { musica: Musica; };

export default function MusicaItem({ musica }: Props) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      {musica.imagemUrl ? (
        <Image source={{ uri: musica.imagemUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}><Feather name="music" size={24} color="#37a820" /></View>
      )}
      <View style={styles.info}>
        <Text style={styles.titulo}>{musica.titulo}</Text>
        <Text style={styles.artista}>{musica.artista}</Text>
      </View>
    </View>
  );
}

const makeStyles = (colors: typeof LIGHT) => StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: 12, padding: 12, marginBottom: 12, elevation: 2 },
  image: { width: 56, height: 56, borderRadius: 8, marginRight: 12 },
  placeholder: { width: 56, height: 56, borderRadius: 8, marginRight: 12, backgroundColor: colors.inputBackground, alignItems: "center", justifyContent: "center" },
  info: { flex: 1 },
  titulo: { fontSize: 16, fontWeight: "600", color: colors.texto },
  artista: { marginTop: 4, color: colors.textoSecundario },
});