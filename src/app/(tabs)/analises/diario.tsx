import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
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
import { useForm, Controller } from "react-hook-form";
import { RegistroHumorRequest } from "@/services/diarioService";
import { useDiario } from "@/hooks/useDiario";
import { COLORS } from "@/constants/colors";

type HumorIcone =
  | "emoticon-excited-outline"
  | "emoticon-happy-outline"
  | "emoticon-neutral-outline"
  | "emoticon-sad-outline"
  | "emoticon-cry-outline";

const ListaDeHumores: { nome: string; icone: HumorIcone }[] = [
  { nome: "Empolgado", icone: "emoticon-excited-outline" },
  { nome: "Feliz", icone: "emoticon-happy-outline" },
  { nome: "Neutro", icone: "emoticon-neutral-outline" },
  { nome: "Infeliz", icone: "emoticon-sad-outline" },
  { nome: "Triste", icone: "emoticon-cry-outline" },
];

const ListaDeAtividades = [
  "Trabalho", "Estudo", "Exercício", "Lazer", "Família", "Amigos", "Outro",
];

type FormData = {
  humor: string;
  atividades: string[];
  detalhes: string;
};

export default function DiarioHumorScreen() {
  const { registros, isLoading, criar, atualizar, deletar, criando } = useDiario();
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const { control, handleSubmit, reset, clearErrors, setValue, formState: { errors } } =
    useForm<FormData>({
      defaultValues: { humor: "", atividades: [], detalhes: "" },
    });

  const onSubmit = async (data: FormData) => {
    const dto: RegistroHumorRequest = {
      humor: data.humor,
      atividades: data.atividades,
      detalhes: data.detalhes,
    };

    try {
      if (editandoId !== null) {
        await atualizar({ id: editandoId, dto });
        Alert.alert("Sucesso", "Registro atualizado!");
        setEditandoId(null);
      } else {
        await criar(dto);
        Alert.alert("Sucesso", "Registro salvo!");
      }
      reset({ humor: "", atividades: [], detalhes: "" });
    } catch {
      Alert.alert("Erro", "Não foi possível salvar o registro.");
    }
  };

  const iniciarEdicao = (registro: any) => {
    setEditandoId(registro.id);
    setValue("humor", registro.humor);
    setValue("atividades", registro.atividades);
    setValue("detalhes", registro.detalhes);
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    reset({ humor: "", atividades: [], detalhes: "" });
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
            Alert.alert("Sucesso", "Registro deletado!");
          } catch {
            Alert.alert("Erro", "Não foi possível deletar o registro.");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diário</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {editandoId ? "Editar Registro" : "Como você está se sentindo hoje?"}
        </Text>

        <Controller
          control={control}
          name="humor"
          rules={{ required: "Selecione um humor." }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.opcoesDeHumor}>
              {ListaDeHumores.map((humor, i) => (
                <TouchableOpacity
                  key={i}
                  style={[styles.botaoHumor, value === humor.nome && styles.humorSelecionado]}
                  onPress={() => { onChange(humor.nome); clearErrors("humor"); }}
                >
                  <MaterialCommunityIcons
                    name={humor.icone}
                    size={36}
                    color={value === humor.nome ? "#fff" : "#444"}
                  />
                  <Text style={[styles.textoHumor, value === humor.nome && { color: "#fff" }]}>
                    {humor.nome}
                  </Text>
                </TouchableOpacity>
              ))}
              {errors.humor && <Text style={styles.msgErro}>{errors.humor.message}</Text>}
            </View>
          )}
        />

        <Text style={styles.cardTitle}>O que você fez?</Text>
        <Controller
          control={control}
          name="atividades"
          rules={{ validate: (v) => v.length > 0 || "Selecione pelo menos uma atividade." }}
          render={({ field: { onChange, value } }) => (
            <View>
              <View style={styles.tagsContainer}>
                {ListaDeAtividades.map((atividade, i) => {
                  const selecionada = value.includes(atividade);
                  return (
                    <TouchableOpacity
                      key={i}
                      style={[styles.tag, selecionada && styles.tagSelecionada]}
                      onPress={() => {
                        onChange(selecionada ? value.filter((a) => a !== atividade) : [...value, atividade]);
                        clearErrors("atividades");
                      }}
                    >
                      <Text style={selecionada ? { color: "#fff" } : {}}>{atividade}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {errors.atividades && <Text style={styles.msgErroAtividades}>{errors.atividades.message}</Text>}
            </View>
          )}
        />

        <Text style={styles.cardTitle}>Anote mais detalhes:</Text>
        <Controller
          control={control}
          name="detalhes"
          rules={{ required: "Adicione detalhes sobre seu dia." }}
          render={({ field: { onChange, value } }) => (
            <View style={{ marginBottom: 10 }}>
              <TextInput
                style={styles.input}
                placeholder="Descreva seu dia, pensamentos ou sentimentos..."
                value={value}
                onChangeText={(text) => { onChange(text); clearErrors("detalhes"); }}
                multiline
              />
              {errors.detalhes && <Text style={styles.msgErro}>{errors.detalhes.message}</Text>}
            </View>
          )}
        />

        <Button
          title={criando ? "Salvando..." : editandoId ? "Atualizar Registro" : "Salvar Registro"}
          onPress={handleSubmit(onSubmit)}
          color="#4A90E2"
          disabled={criando}
        />
        {editandoId && (
          <TouchableOpacity onPress={cancelarEdicao} style={styles.botaoCancelar}>
            <Text style={styles.botaoCancelarTexto}>Cancelar edição</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Histórico</Text>

        {isLoading ? (
          <ActivityIndicator color="#4A90E2" />
        ) : registros.length === 0 ? (
          <Text style={styles.textoVazio}>Nenhum registro encontrado.</Text>
        ) : (
          registros.map((registro) => {
            const humorItem = ListaDeHumores.find((h) => h.nome === registro.humor);
            return (
              <View key={registro.id} style={styles.cardHistorico}>
                <View style={styles.cardHistoricoHeader}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    {humorItem && (
                      <MaterialCommunityIcons name={humorItem.icone} size={24} color="#4A90E2" />
                    )}
                    <Text style={styles.dataHistorico}>
                      {new Date(registro.criadoEm).toLocaleString("pt-BR", {
                        timeZone: "America/Sao_Paulo",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity onPress={() => iniciarEdicao(registro)}>
                      <MaterialCommunityIcons name="pencil" size={20} color="#4A90E2" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => confirmarDelecao(registro.id)}>
                      <MaterialCommunityIcons name="trash-can-outline" size={20} color="#E24A4A" />
                    </TouchableOpacity>
                  </View>
                </View>

                {registro.detalhes && (
                  <Text style={styles.historicoDetalhes}>{registro.detalhes}</Text>
                )}

                <View style={styles.historicoTagsContainer}>
                  {registro.atividades.map((atividade) => (
                    <View key={atividade} style={styles.historicoTag}>
                      <Text style={styles.historicoTagText}>{atividade}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    backgroundColor: COLORS.background
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  opcoesDeHumor: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20
  },
  botaoHumor: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    margin: 8,
    alignItems: "center",
    width: 90,
    elevation: 2
  },
  humorSelecionado: {
    backgroundColor: "#4A90E2"
  },
  textoHumor: {
    marginTop: 5,
    fontSize: 12
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#EEE",
    borderRadius: 20,
    margin: 4
  },
  tagSelecionada: {
    backgroundColor: "#4A90E2"
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    backgroundColor: "#FFF",
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 20
  },
  msgErro: {
    color: "red",
    marginTop: 4,
    marginBottom: 8,
    textAlign: "center"
  },
  msgErroAtividades: {
    color: "red",
    fontSize: 13,
    marginTop: -12,
    marginBottom: 12,
    textAlign: "center"
  },
  cardHistorico: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEE"
  },
  cardHistoricoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6
  },
  dataHistorico: {
    fontSize: 12,
    color: "#666"
  },
  historicoDetalhes: {
    fontSize: 14,
    marginBottom: 6
  },
  historicoTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  historicoTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#EFEFEF",
    borderRadius: 12,
    margin: 2
  },
  historicoTagText: {
    fontSize: 12
  },
  textoVazio: {
    textAlign: "center",
    color: "#666"
  },
  botaoCancelar: {
    marginTop: 10,
    alignItems: "center"
  },
  botaoCancelarTexto: {
    color: "#E24A4A",
    fontSize: 14
  },
});