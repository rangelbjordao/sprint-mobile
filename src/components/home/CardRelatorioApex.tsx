import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUsuarioMe } from "@/hooks/useUsuarioMe";
import { useRelatorioSemanal } from "@/hooks/useRelatorioSemanal";
import { COLORS } from "@/constants/colors";

const mapaIcone: Record<string, any> = {
  Empolgado: "emoticon-excited-outline",
  Feliz: "emoticon-happy-outline",
  Neutro: "emoticon-neutral-outline",
  Infeliz: "emoticon-sad-outline",
  Triste: "emoticon-cry-outline",
};

export default function CardRelatorioApex() {
  const { usuario } = useUsuarioMe();
  const { relatorio, loadingRelatorio, errorRelatorio } =
    useRelatorioSemanal(usuario?.id ?? null);

  if (loadingRelatorio) {
    return (
      <View>
        <Text style={styles.titulo}>Relatório Semanal</Text>
        <ActivityIndicator color="#4A90E2" />
      </View>
    );
  }

  if (errorRelatorio) {
    return (
      <View>
        <Text style={styles.titulo}>Relatório Semanal</Text>
        <Text style={styles.textoAuxiliar}>
          Não foi possível conectar ao serviço do relatório.
        </Text>
      </View>
    );
  }

  if (!relatorio || !relatorio.humor_predominante) {
    return (
      <View>
        <Text style={styles.titulo}>Relatório Semanal</Text>
        <Text style={styles.textoAuxiliar}>
          Registre seu humor no diário para ver o relatório semanal.
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.titulo}>Relatório Semanal</Text>

      <View style={styles.linha}>
        <MaterialCommunityIcons
          name={mapaIcone[relatorio.humor_predominante] ?? "emoticon-neutral-outline"}
          size={40}
          color="#4A90E2"
        />
        <View style={styles.info}>
          <Text style={styles.label}>Humor predominante</Text>
          <Text style={styles.valor}>{relatorio.humor_predominante}</Text>
        </View>
      </View>

      <View style={styles.linha}>
        <MaterialCommunityIcons name="counter" size={40} color="#4A90E2" />
        <View style={styles.info}>
          <Text style={styles.label}>Total de registros</Text>
          <Text style={styles.valor}>{relatorio.total_registros}</Text>
        </View>
      </View>

      <View style={styles.linha}>
        <MaterialCommunityIcons name="chart-line" size={40} color="#4A90E2" />
        <View style={styles.info}>
          <Text style={styles.label}>Média de humor</Text>
          <Text style={styles.valor}>{relatorio.media_humor}/5</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: COLORS.texto,
  },
  linha: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  info: {
    marginLeft: 12,
  },
  label: {
    fontSize: 13,
    color: "#888",
  },
  valor: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.texto,
  },
  textoAuxiliar: {
    fontSize: 15,
    color: COLORS.texto,
  },
});