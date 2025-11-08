import { Musica } from "@/types/spotify";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface MusicaItemProps {
  musica: Musica;
}

const MusicaItem = ({ musica }: MusicaItemProps) => {
  return (
    <View style={styles.musicaItem}>
      <FontAwesome5 name="compact-disc" size={40} color="#000000" />

      <View style={styles.musicaInfo}>
        <Text style={styles.musicaTitle}>{musica.name}</Text>
        <Text style={styles.musicaArtist}>{musica.artists}</Text>
      </View>

      <View style={styles.musicaStats}>
        <Text style={styles.statLabel}>P: {musica.popularity}</Text>
      </View>
    </View>
  );
};

export default MusicaItem;

const styles = StyleSheet.create({
  musicaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  musicaInfo: {
    flex: 1,
    marginLeft: 16,
  },
  musicaTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  musicaArtist: {
    fontSize: 14,
    color: "#0077ff",
  },
  musicaStats: {
    alignItems: "flex-end",
  },
  statLabel: {
    fontSize: 12,
  },
});
