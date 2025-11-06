import { Musica } from "@/types/spotify";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface MusicaItemProps {
  musica: Musica;
}

const MusicaItem = ({ musica }: MusicaItemProps) => {
  return (
    <View style={styles.musicaItem}>
      <Image
        source={{ uri: musica.album.images[0]?.url }}
        style={styles.albumImage}
      />
      <View style={styles.musicaInfo}>
        <Text style={styles.musicaTitle}>{musica.name}</Text>
        <Text style={styles.musicaArtist}>
          {musica.artists.map((a) => a.name).join(", ")}
        </Text>
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
  albumImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
});
