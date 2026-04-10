import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";
import { useHabitos } from "@/hooks/useHabitos";

const HABITOS_FIXOS = [
  { atividade: "Sono", unidade: "horas", icone: "sleep" as const },
  { atividade: "Água", unidade: "copos", icone: "cup-water" as const },
  { atividade: "Exercício", unidade: "minutos", icone: "run" as const },
  { atividade: "Tempo de tela", unidade: "horas", icone: "cellphone" as const },
  { atividade: "Estudo", unidade: "horas", icone: "book-open-variant" as const },
];

function formatarValor(valor: number | string) {
  const numero = Number(valor);

  if (Number.isNaN(numero)) return String(valor);

  return Number.isInteger(numero)
    ? String(numero)
    : numero.toLocaleString("pt-BR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
}

export default function CardHabitosAtuais() {
  const { habitos, isLoading } = useHabitos();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  if (isLoading) {
    return (
      <View>
        <Text style={styles.cardTitle}>Resumo dos Hábitos</Text>
        <Text style={styles.subtitle}>Carregando seus hábitos recentes...</Text>
      </View>
    );
  }

  if (!habitos.length) {
    return (
      <View>
        <Text style={styles.cardTitle}>Resumo dos Hábitos</Text>
        <Text style={styles.subtitle}>
          Registre seus hábitos diários para acompanhar sua rotina.
        </Text>
      </View>
    );
  }

  const ultimosPorHabito = HABITOS_FIXOS.map((habitoFixo) => {
    const ultimo = habitos.find(
      (item) => item.atividade === habitoFixo.atividade,
    );

    return {
      ...habitoFixo,
      registro: ultimo ?? null,
    };
  });

  return (
    <View>
      <Text style={styles.cardTitle}>Hábitos Diários</Text>
      <Text style={styles.subtitle}>
        Veja os valores mais recentes registrados para sua rotina.
      </Text>

      <View style={styles.lista}>
        {ultimosPorHabito.map((item) => (
          <View key={item.atividade} style={styles.linha}>
            <View style={styles.infoEsquerda}>
              <MaterialCommunityIcons
                name={item.icone}
                size={24}
                color={colors.primary}
              />
              <Text style={styles.nomeHabito}>{item.atividade}</Text>
            </View>

            <Text style={styles.valorHabito}>
              {item.registro
                ? `${formatarValor(item.registro.valor)} ${item.registro.unidade}`
                : "Sem registro"}
            </Text>
          </View>
        ))}
      </View>
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
      marginBottom: 12,
    },
    lista: {
      marginTop: 4,
    },
    linha: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    infoEsquerda: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      marginRight: 12,
    },
    nomeHabito: {
      fontSize: 16,
      marginLeft: 10,
      color: colors.texto,
      fontWeight: "500",
    },
    valorHabito: {
      fontSize: 15,
      color: colors.textoSecundario,
      fontWeight: "600",
    },
  });