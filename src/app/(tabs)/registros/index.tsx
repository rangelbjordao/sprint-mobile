import CardNavegacao from "@/components/registros/CardNavegacao";
import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

const RegistrosScreen = () => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registros</Text>
      <Text style={styles.subtitle}>Acesse e gerencie seus registros de humor e consumo digital.</Text>

      <CardNavegacao
        href="/(tabs)/registros/diario"
        icon={<Feather name="edit-3" size={32} color="#E97451" />}
        title="Diário de Humor"
        description="Acesse e adicione registros ao seu diário pessoal."
      />
      <CardNavegacao
        href="/(tabs)/registros/musicas"
        icon={<FontAwesome5 name="spotify" size={32} color="#1DB954" />}
        title="Análise de Músicas"
        description="Veja a energia e positividade das suas playlists."
      />
    </ScrollView>
  );
};

export default RegistrosScreen;

const makeStyles = (colors: typeof LIGHT) => StyleSheet.create({
  container: { padding: 16, flexGrow: 1, backgroundColor: colors.background },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 8, color: colors.texto },
  subtitle: { fontSize: 16, marginBottom: 16, color: colors.textoSecundario },
});