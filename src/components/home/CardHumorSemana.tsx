import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";
import { LIGHT } from "@/constants/colors";
import { useDiario } from "@/hooks/useDiario";

const mapaHumorValor: Record<string, number> = { Empolgado: 90, Feliz: 75, Neutro: 55, Infeliz: 35, Triste: 15 };
const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function CardHumorSemana() {
  const { registros, isLoading } = useDiario();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const getEmoji = (valor: number) => {
    if (valor <= 30) return <MaterialCommunityIcons name="emoticon-sad-outline" size={32} color="#E63946" />;
    if (valor <= 70) return <MaterialCommunityIcons name="emoticon-neutral-outline" size={32} color="#F4A261" />;
    return <MaterialCommunityIcons name="emoticon-happy-outline" size={32} color="#2A9D8F" />;
  };

  const agora = new Date();
  const inicioPeriodo = new Date(agora); inicioPeriodo.setDate(agora.getDate() - 6); inicioPeriodo.setHours(0, 0, 0, 0);
  const fimDeHoje = new Date(agora); fimDeHoje.setHours(23, 59, 59, 999);

  const registrosUltimos7Dias = registros.filter((r) => { const d = new Date(r.criadoEm); return d >= inicioPeriodo && d <= fimDeHoje; });

  const humorSemana = diasSemana.map((nomeDia, diaIndex) => {
    const registrosDoDia = registrosUltimos7Dias.filter((r) => new Date(r.criadoEm).getDay() === diaIndex);
    const valores = registrosDoDia.map((r) => mapaHumorValor[r.humor] ?? 55);
    const valor = valores.length > 0 ? Math.round(valores.reduce((a, b) => a + b, 0) / valores.length) : 0;
    return { dia: nomeDia, valor };
  });

  if (isLoading) return <View><Text style={styles.cardTitle}>Evolução do Humor na Semana</Text><Text style={styles.textoAuxiliar}>Carregando dados da semana...</Text></View>;

  const semDados = humorSemana.every((item) => item.valor === 0);
  if (semDados) return <View><Text style={styles.cardTitle}>Evolução do Humor na Semana</Text><Text style={styles.textoAuxiliar}>Ainda não há registros suficientes para mostrar sua semana.</Text></View>;

  return (
    <View>
      <Text style={styles.cardTitle}>Evolução do Humor na Semana</Text>
      <View style={styles.containerSemana}>
        {humorSemana.map((item, i) => (
          <View key={i} style={styles.containerDiaSemana}>
            {item.valor > 0 ? (
              <><View style={styles.emoji}>{getEmoji(item.valor)}</View><Text style={styles.humorValor}>{item.valor}</Text></>
            ) : (
              <><View style={styles.emoji}><MaterialCommunityIcons name="minus-circle-outline" size={28} color="#BDBDBD" /></View><Text style={styles.humorValorVazio}>--</Text></>
            )}
            <Text style={styles.diaLabel}>{item.dia}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const makeStyles = (colors: typeof LIGHT) => StyleSheet.create({
  cardTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 8, color: colors.texto },
  containerSemana: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  containerDiaSemana: { alignItems: "center", flex: 1 },
  emoji: { minHeight: 38, justifyContent: "center", alignItems: "center", marginBottom: 6 },
  humorValor: { fontSize: 16, fontWeight: "bold", marginBottom: 4, color: colors.texto },
  humorValorVazio: { fontSize: 16, fontWeight: "bold", marginBottom: 4, color: "#BDBDBD" },
  diaLabel: { fontSize: 14, color: colors.textoSecundario },
  textoAuxiliar: { fontSize: 16, color: colors.textoSecundario },
});