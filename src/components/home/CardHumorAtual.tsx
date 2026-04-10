import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";
import { useDiario } from "@/hooks/useDiario";

export default function CardHumorAtual() {
  const { registros, isLoading } = useDiario();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  if (isLoading) return <View><Text style={styles.cardTitle}>Seu Humor Atual</Text><Text style={styles.subtitle}>Carregando seu humor atual...</Text></View>;

  const ultimo = registros[0];
  if (!ultimo) return <View><Text style={styles.cardTitle}>Seu Humor Atual</Text><Text style={styles.subtitle}>Nenhum registro encontrado ainda.</Text></View>;

  const mapaHumor = {
    Empolgado: { titulo: "Muito animado", subtitulo: "Seu último registro mostra um momento de alta energia e entusiasmo.", icone: "emoji-happy" as const, cor: "#007bff" },
    Feliz: { titulo: "Feliz e positivo", subtitulo: "Seu último registro indica um estado emocional leve e positivo.", icone: "emoji-happy" as const, cor: "#007bff" },
    Neutro: { titulo: "Equilibrado e estável", subtitulo: "Seu último registro mostra um humor mais neutro e estável.", icone: "emoji-neutral" as const, cor: "#f4a261" },
    Infeliz: { titulo: "Um pouco desanimado", subtitulo: "Seu último registro sugere um momento de baixa motivação ou cansaço.", icone: "emoji-sad" as const, cor: "#e76f51" },
    Triste: { titulo: "Mais sensível", subtitulo: "Seu último registro indica um estado emocional mais delicado.", icone: "emoji-sad" as const, cor: "#e63946" },
  };

  const humorAtual = mapaHumor[ultimo.humor as keyof typeof mapaHumor] ?? { titulo: ultimo.humor, subtitulo: "Seu último registro indica como você está se sentindo no momento.", icone: "emoji-neutral" as const, cor: "#007bff" };

  return (
    <View>
      <Text style={styles.cardTitle}>Seu Humor Atual</Text>
      <View style={styles.containerHumor}>
        <Entypo name={humorAtual.icone} size={36} color={humorAtual.cor} />
        <Text style={styles.humorText}>{humorAtual.titulo}</Text>
      </View>
      <Text style={styles.subtitle}>{humorAtual.subtitulo}</Text>
    </View>
  );
}

const makeStyles = (colors: typeof LIGHT) => StyleSheet.create({
  cardTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 8, color: colors.texto },
  containerHumor: { flexDirection: "row", marginBottom: 8, alignItems: "center" },
  humorText: { fontSize: 22, fontWeight: "600", marginLeft: 12, color: colors.texto },
  subtitle: { fontSize: 16, color: colors.textoSecundario },
});