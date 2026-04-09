import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRelatorioSemanal } from "@/hooks/useRelatorioSemanal";
import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";

const mapaIcone: Record<string, any> = {
  Empolgado: "emoticon-excited-outline", Feliz: "emoticon-happy-outline",
  Neutro: "emoticon-neutral-outline", Infeliz: "emoticon-sad-outline", Triste: "emoticon-cry-outline",
};

export default function CardRelatorioApex() {
  const { relatorio, loadingRelatorio } = useRelatorioSemanal();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  if (loadingRelatorio) return <View><Text style={styles.titulo}>Relatório Semanal</Text><ActivityIndicator color={colors.primary} /></View>;

  if (!relatorio || !relatorio.humor_predominante) return <View><Text style={styles.titulo}>Relatório Semanal</Text><Text style={styles.textoAuxiliar}>Registre seu humor no diário para ver o relatório semanal.</Text></View>;

  return (
    <View>
      <Text style={styles.titulo}>Relatório Semanal</Text>
      <View style={styles.linha}>
        <MaterialCommunityIcons name={mapaIcone[relatorio.humor_predominante] ?? "emoticon-neutral-outline"} size={40} color={colors.primary} />
        <View style={styles.info}><Text style={styles.label}>Humor predominante</Text><Text style={styles.valor}>{relatorio.humor_predominante}</Text></View>
      </View>
      <View style={styles.linha}>
        <MaterialCommunityIcons name="counter" size={40} color={colors.primary} />
        <View style={styles.info}><Text style={styles.label}>Total de registros</Text><Text style={styles.valor}>{relatorio.total_registros}</Text></View>
      </View>
      <View style={styles.linha}>
        <MaterialCommunityIcons name="chart-line" size={40} color={colors.primary} />
        <View style={styles.info}><Text style={styles.label}>Média de humor</Text><Text style={styles.valor}>{relatorio.media_humor}/5</Text></View>
      </View>
    </View>
  );
}

const makeStyles = (colors: typeof LIGHT) => StyleSheet.create({
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 12, color: colors.texto },
  linha: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  info: { marginLeft: 12 },
  label: { fontSize: 13, color: colors.textoSecundario },
  valor: { fontSize: 18, fontWeight: "bold", color: colors.texto },
  textoAuxiliar: { fontSize: 15, color: colors.textoSecundario },
});