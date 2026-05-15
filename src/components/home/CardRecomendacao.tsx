import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import api from "@/services/api";
import { useDiario } from "@/hooks/useDiario";

type RespostaIA = {
  recomendacao: string;
  humor: string;
};

export default function CardRecomendacao() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [dadosIA, setDadosIA] = useState<RespostaIA | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const { registros } = useDiario();

  const mapaIcones: Record<
    string,
    React.ComponentProps<typeof Feather>["name"]
  > = {
    Empolgado: "smile",
    Feliz: "thumbs-up",
    Neutro: "coffee",
    Infeliz: "moon",
    Triste: "heart",
  };

  useEffect(() => {
    async function buscarRecomendacao() {
      try {
        setIsLoading(true);
        setErro(false);

        const response = await api.get("/ia/recomendacao");

        setDadosIA(response.data);
      } catch (e) {
        setErro(true);
      } finally {
        setIsLoading(false);
      }
    }

    buscarRecomendacao();
  }, [registros]);

  if (isLoading) {
    return (
      <View>
        <Text style={styles.cardTitle}>Recomendação do Dia</Text>

        <ActivityIndicator
          color={colors.primary}
          style={{ marginTop: 8 }}
        />
      </View>
    );
  }

  if (erro || !dadosIA) {
    return (
      <View>
        <Text style={styles.cardTitle}>Recomendação do Dia</Text>
        <Text style={styles.subtitle}>
          Não foi possível carregar a recomendação. Tente novamente mais tarde.
        </Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.cardTitle}>Recomendação do Dia</Text>
      <Feather
        name={mapaIcones[dadosIA.humor] ?? "heart"}
        size={24}
        color={colors.primary}
        style={{ marginBottom: 8 }}
      />

      <Text
        style={styles.subtitle}
        numberOfLines={3}
      >
        {dadosIA.recomendacao}
      </Text>
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