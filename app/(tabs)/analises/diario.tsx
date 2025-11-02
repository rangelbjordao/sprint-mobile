import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

type HumorIcone =
  | "emoticon-excited-outline"
  | "emoticon-happy-outline"
  | "emoticon-neutral-outline"
  | "emoticon-sad-outline"
  | "emoticon-cry-outline";

type Registro = {
  humor: string;
  atividades: string[];
  detalhes: string;
  data: string;
};

const ListaDeHumores: { nome: string; icone: HumorIcone }[] = [
  { nome: "Empolgado", icone: "emoticon-excited-outline" },
  { nome: "Feliz", icone: "emoticon-happy-outline" },
  { nome: "Neutro", icone: "emoticon-neutral-outline" },
  { nome: "Infeliz", icone: "emoticon-sad-outline" },
  { nome: "Triste", icone: "emoticon-cry-outline" },
];

const ListaDeAtividades = [
  "Trabalho",
  "Estudo",
  "Exercício",
  "Lazer",
  "Família",
  "Amigos",
  "Outro",
];

const DiarioHumorScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<Registro>({
    defaultValues: {
      humor: "",
      atividades: [],
      detalhes: "",
      data: "",
    },
  });

  const [historico, setHistorico] = useState<Registro[]>([]);

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem("@historico");
        if (dadosSalvos) {
          setHistorico(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        console.log("Erro ao carregar histórico:", error);
      }
    };
    carregarHistorico();
  }, []);

  const salvarRegistro = async (data: Registro) => {
    const novoRegistro: Registro = {
      ...data,
      data: new Date().toLocaleString(),
    };

    const novoHistorico = [novoRegistro, ...historico];
    setHistorico(novoHistorico);

    try {
      await AsyncStorage.setItem("@historico", JSON.stringify(novoHistorico));

      reset({
        humor: "",
        atividades: [],
        detalhes: "",
        data: "",
      });

      Alert.alert("Sucesso", "Registro salvo com sucesso!");
    } catch (error) {
      console.log("Erro ao salvar histórico:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diário</Text>

      {/* Formulário do diario */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Como você está se sentindo hoje?</Text>
        <Controller
          control={control}
          name="humor"
          rules={{ required: "Selecione um humor." }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.opcoesDeHumor}>
              {ListaDeHumores.map((humor, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.botaoHumor,
                    value === humor.nome && styles.humorSelecionado,
                  ]}
                  onPress={() => {
                    onChange(humor.nome);
                    clearErrors("humor");
                  }}
                >
                  <MaterialCommunityIcons
                    name={humor.icone}
                    size={36}
                    color={value === humor.nome ? "#fff" : "#444"}
                  />
                  <Text
                    style={[
                      styles.textoHumor,
                      value === humor.nome && { color: "#fff" },
                    ]}
                  >
                    {humor.nome}
                  </Text>
                </TouchableOpacity>
              ))}
              {errors.humor && (
                <Text style={styles.msgErro}>{errors.humor.message}</Text>
              )}
            </View>
          )}
        />

        <Text style={styles.cardTitle}>O que você fez?</Text>
        <Controller
          control={control}
          name="atividades"
          rules={{
            validate: (value) =>
              value.length > 0 || "Selecione pelo menos uma atividade.",
          }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.tagsContainer}>
              {ListaDeAtividades.map((atividade, i) => {
                const selecionada = value.includes(atividade);
                return (
                  <TouchableOpacity
                    key={i}
                    style={[styles.tag, selecionada && styles.tagSelecionada]}
                    onPress={() => {
                      const novoValor = selecionada
                        ? value.filter((a) => a !== atividade)
                        : [...value, atividade];
                      onChange(novoValor);
                      clearErrors("atividades");
                    }}
                  >
                    <Text style={selecionada ? { color: "#fff" } : {}}>
                      {atividade}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {errors.atividades && (
                <Text style={styles.msgErro}>{errors.atividades.message}</Text>
              )}
            </View>
          )}
        />

        <Text style={styles.cardTitle}>Anote mais detalhes:</Text>
        <Controller
          control={control}
          name="detalhes"
          rules={{
            required: "Adicione detalhes sobre seu dia.",
            validate: (v) =>
              v.trim().length > 0 || "O campo não pode estar vazio.",
          }}
          render={({ field: { onChange, value } }) => (
            <View style={{ marginBottom: 10 }}>
              <TextInput
                style={styles.input}
                placeholder="Descreva seu dia, pensamentos ou sentimentos..."
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                  clearErrors("detalhes");
                }}
                multiline
              />
              {errors.detalhes && (
                <Text style={styles.msgErro}>{errors.detalhes.message}</Text>
              )}
            </View>
          )}
        />

        <Button
          title="Salvar Registro"
          onPress={handleSubmit(salvarRegistro)}
          color="#4A90E2"
        />
      </View>

      {/* Histórico de registros */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Histórico</Text>
        {historico.map((registro, i) => {
          const humorItem = ListaDeHumores.find(
            (h) => h.nome === registro.humor
          );
          return (
            <View key={i} style={styles.cardHistorico}>
              <View style={styles.cardHistoricoHeader}>
                {humorItem && (
                  <MaterialCommunityIcons
                    name={humorItem.icone}
                    size={24}
                    color="#4A90E2"
                  />
                )}
                <Text style={styles.dataHistorico}>{registro.data}</Text>
              </View>

              {registro.detalhes && (
                <Text style={styles.historicoDetalhes}>
                  {registro.detalhes}
                </Text>
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
        })}
      </View>
    </ScrollView>
  );
};

export default DiarioHumorScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
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
  },
  opcoesDeHumor: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  botaoHumor: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    margin: 8,
    alignItems: "center",
    width: 90,
    elevation: 2,
  },
  humorSelecionado: { backgroundColor: "#4A90E2" },
  textoHumor: { marginTop: 5, fontSize: 12 },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#EEE",
    borderRadius: 20,
    margin: 4,
  },
  tagSelecionada: { backgroundColor: "#4A90E2" },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    width: "100%",
    backgroundColor: "#FFF",
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 20,
  },
  msgErro: { color: "red", marginTop: 4, marginBottom: 8, textAlign: "center" },
  cardHistorico: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    width: "100%",
  },
  cardHistoricoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  dataHistorico: { fontSize: 12 },
  historicoDetalhes: { fontSize: 14, marginBottom: 6 },
  historicoTagsContainer: { flexDirection: "row", flexWrap: "wrap" },
  historicoTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#EFEFEF",
    borderRadius: 12,
    margin: 2,
  },
  historicoTagText: { fontSize: 12 },
});
