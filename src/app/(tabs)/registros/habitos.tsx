import { LIGHT } from "@/constants/colors";
import { useTheme } from "@/context/ThemeContext";
import { useHabitos } from "@/hooks/useHabitos";
import { HabitoRequest, HabitoResponse } from "@/services/habitoService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FormData = {
  atividade: string;
  valor: string;
};

const HABITOS_FIXOS = [
  { atividade: "Sono", unidade: "horas", icone: "sleep" as const },
  { atividade: "Água", unidade: "copos", icone: "cup-water" as const },
  { atividade: "Exercício", unidade: "minutos", icone: "run" as const },
  { atividade: "Tempo de tela", unidade: "horas", icone: "cellphone" as const },
  { atividade: "Estudo", unidade: "horas", icone: "book-open-variant" as const },
];

function formatarDataHora(dataIso: string) {
  return new Date(dataIso).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatarDataHoje() {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

export default function HabitosScreen() {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const {
    habitos,
    isLoading,
    criar,
    atualizar,
    deletar,
    criando,
    atualizando,
  } = useHabitos();

  const [editandoId, setEditandoId] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      atividade: "",
      valor: "",
    },
  });

  const atividadeSelecionada = watch("atividade");

  const habitoSelecionado = useMemo(
    () =>
      HABITOS_FIXOS.find((item) => item.atividade === atividadeSelecionada) ??
      null,
    [atividadeSelecionada],
  );

  const salvandoOuAtualizando = criando || atualizando;

  const onSubmit = async (data: FormData) => {
    const habitoInfo = HABITOS_FIXOS.find(
      (item) => item.atividade === data.atividade,
    );

    if (!habitoInfo) {
      Alert.alert("Erro", "Selecione um hábito válido.");
      return;
    }

    const valorNumerico = Number(data.valor.replace(",", "."));

    if (Number.isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert("Erro", "Digite um valor numérico válido.");
      return;
    }

    const dto: HabitoRequest = {
      atividade: data.atividade,
      valor: valorNumerico,
      unidade: habitoInfo.unidade,
      dataRegistro: formatarDataHoje(),
    };

    try {
      if (editandoId !== null) {
        await atualizar({ id: editandoId, dto });
        Alert.alert("Sucesso", "Registro atualizado!");
        setEditandoId(null);
      } else {
        await criar(dto);
        Alert.alert("Sucesso", "Hábito registrado!");
      }

      reset({ atividade: "", valor: "" });
    } catch {
      Alert.alert("Erro", "Não foi possível salvar o hábito.");
    }
  };

  const iniciarEdicao = (habito: HabitoResponse) => {
    setEditandoId(habito.id);
    reset({
      atividade: habito.atividade,
      valor: String(habito.valor),
    });
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    reset({ atividade: "", valor: "" });
  };

  const confirmarDelecao = (id: number) => {
    Alert.alert("Confirmar", "Deseja deletar este registro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        style: "destructive",
        onPress: async () => {
          try {
            await deletar(id);
          } catch {
            Alert.alert("Erro", "Não foi possível deletar o registro.");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hábitos Diários</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {editandoId ? "Editar Registro" : "Registrar Hábito"}
        </Text>

        <Text style={styles.label}>Escolha o hábito</Text>
        <Controller
          control={control}
          name="atividade"
          rules={{ required: "Selecione um hábito." }}
          render={({ field: { onChange, value } }) => (
            <View>
              <View style={styles.opcoesHabitos}>
                {HABITOS_FIXOS.map((habito) => {
                  const selecionado = value === habito.atividade;

                  return (
                    <TouchableOpacity
                      key={habito.atividade}
                      style={[
                        styles.botaoHabito,
                        selecionado && styles.habitoSelecionado,
                      ]}
                      onPress={() => {
                        onChange(habito.atividade);
                        clearErrors("atividade");
                      }}
                    >
                      <MaterialCommunityIcons
                        name={habito.icone}
                        size={28}
                        color={selecionado ? "#fff" : colors.texto}
                      />
                      <Text
                        style={[
                          styles.textoHabito,
                          selecionado && { color: "#fff" },
                        ]}
                      >
                        {habito.atividade}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {errors.atividade && (
                <Text style={styles.msgErro}>{errors.atividade.message}</Text>
              )}
            </View>
          )}
        />

        <Text style={styles.label}>
          Valor {habitoSelecionado ? `(${habitoSelecionado.unidade})` : ""}
        </Text>
        <Controller
          control={control}
          name="valor"
          rules={{ required: "Digite um valor." }}
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Ex: 7"
                placeholderTextColor={colors.textoSecundario}
                keyboardType="numeric"
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  clearErrors("valor");
                }}
              />
              {errors.valor && (
                <Text style={styles.msgErro}>{errors.valor.message}</Text>
              )}
            </View>
          )}
        />

        <Button
          title={
            editandoId
              ? atualizando
                ? "Atualizando..."
                : "Atualizar Registro"
              : criando
                ? "Salvando..."
                : "Salvar Registro"
          }
          onPress={handleSubmit(onSubmit)}
          color={colors.primary}
          disabled={salvandoOuAtualizando}
        />

        {editandoId && !salvandoOuAtualizando && (
          <TouchableOpacity
            onPress={cancelarEdicao}
            style={styles.botaoCancelar}
          >
            <Text style={styles.botaoCancelarTexto}>Cancelar edição</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Histórico</Text>

        {isLoading ? (
          <ActivityIndicator color={colors.primary} />
        ) : habitos.length === 0 ? (
          <Text style={styles.textoVazio}>Nenhum registro encontrado.</Text>
        ) : (
          habitos.map((habito) => {
            const habitoInfo = HABITOS_FIXOS.find(
              (item) => item.atividade === habito.atividade,
            );

            return (
              <View key={habito.id} style={styles.cardHistorico}>
                <View style={styles.cardHistoricoHeader}>
                  <View style={styles.historicoInfo}>
                    <MaterialCommunityIcons
                      name={habitoInfo?.icone ?? "clipboard-text-outline"}
                      size={22}
                      color={colors.primary}
                    />
                    <View>
                      <Text style={styles.historicoTitulo}>
                        {habito.atividade}
                      </Text>
                      <Text style={styles.dataHistorico}>
                        {formatarDataHora(habito.criadoEm)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.acoesHistorico}>
                    <TouchableOpacity onPress={() => iniciarEdicao(habito)}>
                      <MaterialCommunityIcons
                        name="pencil"
                        size={20}
                        color={colors.primary}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => confirmarDelecao(habito.id)}
                    >
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={20}
                        color={colors.danger}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.historicoValor}>
                  {habito.valor} {habito.unidade}
                </Text>
                <Text style={styles.historicoDataRegistro}>
                  Data do registro:{" "}
                  {new Date(`${habito.dataRegistro}T00:00:00`).toLocaleDateString(
                    "pt-BR",
                    { timeZone: "America/Sao_Paulo" },
                  )}
                </Text>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const makeStyles = (colors: typeof LIGHT) =>
  StyleSheet.create({
    container: {
      padding: 16,
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 8,
      color: colors.texto,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      elevation: 3,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: colors.texto,
    },
    label: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 10,
      color: colors.texto,
    },
    opcoesHabitos: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: 16,
    },
    botaoHabito: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 12,
      margin: 8,
      alignItems: "center",
      width: 100,
      elevation: 2,
      borderWidth: 1,
      borderColor: colors.border,
    },
    habitoSelecionado: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    textoHabito: {
      marginTop: 6,
      fontSize: 12,
      textAlign: "center",
      color: colors.texto,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      backgroundColor: colors.inputBackground,
      fontSize: 16,
      marginBottom: 16,
      color: colors.texto,
    },
    msgErro: {
      color: "red",
      marginTop: -6,
      marginBottom: 12,
      textAlign: "center",
    },
    textoVazio: {
      textAlign: "center",
      color: colors.textoSecundario,
    },
    cardHistorico: {
      backgroundColor: colors.inputBackground,
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardHistoricoHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    historicoInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      flex: 1,
    },
    historicoTitulo: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.texto,
    },
    dataHistorico: {
      fontSize: 12,
      color: colors.textoSecundario,
    },
    historicoValor: {
      fontSize: 16,
      marginBottom: 4,
      color: colors.texto,
    },
    historicoDataRegistro: {
      fontSize: 13,
      color: colors.textoSecundario,
    },
    acoesHistorico: {
      flexDirection: "row",
      gap: 10,
      marginLeft: 8,
    },
    botaoCancelar: {
      marginTop: 10,
      alignItems: "center",
    },
    botaoCancelarTexto: {
      color: colors.danger,
      fontSize: 14,
    },
  });