import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";
import { useDiario } from "@/hooks/useDiario";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type RecomendacaoConfig = { icone: React.ComponentProps<typeof Feather>["name"]; cor: string; mensagem: string; };

export default function CardRecomendacao() {
  const { registros, isLoading } = useDiario();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  if (isLoading) return <View><Text style={styles.cardTitle}>Recomendação do Dia</Text><Text style={styles.subtitle}>Carregando recomendação...</Text></View>;

  const ultimo = registros[0];
  if (!ultimo) return <View><Text style={styles.cardTitle}>Recomendação do Dia</Text><Text style={styles.subtitle}>Registre seu humor no diário para receber recomendações personalizadas.</Text></View>;

  const recomendacoes: Record<string, RecomendacaoConfig> = {
    Empolgado: { icone: "smile", cor: "#2A9D8F", mensagem: "Seu humor está em alta. Aproveite esse momento para manter uma rotina equilibrada e continuar consumindo conteúdos que te fazem bem." },
    Feliz: { icone: "thumbs-up", cor: "#4A90E2", mensagem: "Você parece estar em um momento positivo. Uma boa ideia é continuar com conteúdos leves e músicas que reforcem esse bem-estar." },
    Neutro: { icone: "coffee", cor: "#F4A261", mensagem: "Seu humor está estável. Que tal fazer uma pequena pausa, respirar um pouco e equilibrar seu consumo digital com algo mais leve?" },
    Infeliz: { icone: "moon", cor: "#E76F51", mensagem: "Seu último registro sugere cansaço ou desânimo. Tente desacelerar e priorizar conteúdos mais tranquilos ao longo do dia." },
    Triste: { icone: "heart", cor: "#D0021B", mensagem: "Seu humor parece mais sensível hoje. Talvez seja um bom momento para reduzir estímulos e buscar conteúdos mais acolhedores." },
  };

  const recomendacao = recomendacoes[ultimo.humor] ?? { icone: "info", cor: "#4A90E2", mensagem: "Acompanhe seus registros no diário para entender melhor como seu consumo digital afeta seu bem-estar." };

  return (
    <View>
      <Text style={styles.cardTitle}>Recomendação do Dia</Text>
      <Feather name={recomendacao.icone} size={24} color={recomendacao.cor} style={{ marginBottom: 8 }} />
      <Text style={styles.subtitle}>{recomendacao.mensagem}</Text>
    </View>
  );
}

const makeStyles = (colors: typeof LIGHT) => StyleSheet.create({
  cardTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 8, color: colors.texto },
  subtitle: { fontSize: 16, color: colors.textoSecundario },
});