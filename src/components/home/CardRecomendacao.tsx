import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";
import { useDiario } from "@/hooks/useDiario";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type RecomendacaoConfig = {
  icone: React.ComponentProps<typeof Feather>["name"];
  cor: string;
  mensagem: string;
};

const mapaHumorValor: Record<string, number> = {
  Empolgado: 90,
  Feliz: 75,
  Neutro: 55,
  Infeliz: 35,
  Triste: 15,
};

function obterHumorPelaMedia(media: number) {
  if (media >= 80) return "Empolgado";
  if (media >= 65) return "Feliz";
  if (media >= 45) return "Neutro";
  if (media >= 25) return "Infeliz";
  return "Triste";
}

function ehMesmoDia(dataIso: string) {
  const data = new Date(dataIso);
  const agora = new Date();

  return (
    data.getFullYear() === agora.getFullYear() &&
    data.getMonth() === agora.getMonth() &&
    data.getDate() === agora.getDate()
  );
}

export default function CardRecomendacao() {
  const { registros, isLoading } = useDiario();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  if (isLoading) {
    return (
      <View>
        <Text style={styles.cardTitle}>Recomendação do Dia</Text>
        <Text style={styles.subtitle}>Carregando recomendação...</Text>
      </View>
    );
  }

  const registrosDeHoje = registros.filter((registro) =>
    ehMesmoDia(registro.criadoEm),
  );

  if (!registrosDeHoje.length) {
    return (
      <View>
        <Text style={styles.cardTitle}>Recomendação do Dia</Text>
        <Text style={styles.subtitle}>
          Registre seu humor hoje para receber recomendações personalizadas.
        </Text>
      </View>
    );
  }

  const valores = registrosDeHoje.map(
    (registro) => mapaHumorValor[registro.humor] ?? 55,
  );

  const media =
    valores.length > 0
      ? Math.round(valores.reduce((a, b) => a + b, 0) / valores.length)
      : 0;

  const humorMedio = obterHumorPelaMedia(media);

  const recomendacoes: Record<string, RecomendacaoConfig> = {
    Empolgado: {
      icone: "smile",
      cor: "#2A9D8F",
      mensagem:
        "Seu humor médio de hoje está em alta. Aproveite esse momento para manter uma rotina equilibrada e continuar consumindo conteúdos que te fazem bem.",
    },
    Feliz: {
      icone: "thumbs-up",
      cor: "#4A90E2",
      mensagem:
        "Seu humor médio de hoje está positivo. Uma boa ideia é continuar com conteúdos leves e músicas que reforcem esse bem-estar.",
    },
    Neutro: {
      icone: "coffee",
      cor: "#F4A261",
      mensagem:
        "Seu humor médio de hoje está estável. Que tal fazer uma pequena pausa, respirar um pouco e equilibrar seu consumo digital com algo mais leve?",
    },
    Infeliz: {
      icone: "moon",
      cor: "#E76F51",
      mensagem:
        "Seu humor médio de hoje sugere cansaço ou desânimo. Tente desacelerar e priorizar conteúdos mais tranquilos ao longo do dia.",
    },
    Triste: {
      icone: "heart",
      cor: "#D0021B",
      mensagem:
        "Seu humor médio de hoje parece mais sensível. Talvez seja um bom momento para reduzir estímulos e buscar conteúdos mais acolhedores.",
    },
  };

  const recomendacao = recomendacoes[humorMedio] ?? {
    icone: "info",
    cor: "#4A90E2",
    mensagem:
      "Acompanhe seus registros no diário para entender melhor como seu consumo digital afeta seu bem-estar.",
  };

  return (
    <View>
      <Text style={styles.cardTitle}>Recomendação do Dia</Text>
      <Feather
        name={recomendacao.icone}
        size={24}
        color={recomendacao.cor}
        style={{ marginBottom: 8 }}
      />
      <Text style={styles.subtitle}>{recomendacao.mensagem}</Text>
    </View>
  );
}

const makeStyles = (colors: typeof LIGHT) =>
  StyleSheet.create({
    cardTitle: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 8,
      color: colors.texto,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textoSecundario,
    },
  });