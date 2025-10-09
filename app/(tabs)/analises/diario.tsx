import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
  const [humorSelecionado, setHumorSelecionado] = useState<string | null>(null);
  const [atividadesSelecionadas, setAtividadesSelecionadas] = useState<
    string[]
  >([]);
  const [detalhes, setDetalhes] = useState<string>("");
  const [historico, setHistorico] = useState<Registro[]>([]);
  const [mensagemErro, setMensagemErro] = useState<string>("");

  const alternarAtividade = (atividade: string) =>
    setAtividadesSelecionadas((prev) =>
      prev.includes(atividade)
        ? prev.filter((a) => a !== atividade)
        : [...prev, atividade]
    );

  const salvarRegistro = () => {
    if (!humorSelecionado) {
      return setMensagemErro("Selecione um humor.");
    }
    if (!atividadesSelecionadas.length) {
      return setMensagemErro("Selecione pelo menos uma atividade.");
    }
    if (!detalhes.trim()) {
      return setMensagemErro("Adicione detalhes sobre seu dia.");
    }

    const novoRegistro: Registro = {
      humor: humorSelecionado,
      atividades: [...atividadesSelecionadas],
      detalhes,
      data: new Date().toLocaleString(),
    };

    setHistorico([novoRegistro, ...historico]);
    setHumorSelecionado(null);
    setAtividadesSelecionadas([]);
    setDetalhes("");
    setMensagemErro("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Diário</Text>

      {/* Formulário do diario */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Como você está se sentindo hoje?</Text>
        <View style={styles.opcoesDeHumor}>
          {ListaDeHumores.map((humor, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.botaoHumor,
                humorSelecionado === humor.nome && styles.humorSelecionado,
              ]}
              onPress={() => setHumorSelecionado(humor.nome)}
            >
              <MaterialCommunityIcons
                name={humor.icone}
                size={36}
                color={humorSelecionado === humor.nome ? "#fff" : "#444"}
              />
              <Text
                style={[
                  styles.textoHumor,
                  humorSelecionado === humor.nome && { color: "#fff" },
                ]}
              >
                {humor.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.cardTitle}>O que você fez?</Text>
        <View style={styles.tagsContainer}>
          {ListaDeAtividades.map((atividade, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.tag,
                atividadesSelecionadas.includes(atividade) &&
                  styles.tagSelecionada,
              ]}
              onPress={() => alternarAtividade(atividade)}
            >
              <Text
                style={
                  atividadesSelecionadas.includes(atividade) && {
                    color: "#fff",
                  }
                }
              >
                {atividade}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.cardTitle}>Anote mais detalhes:</Text>
        <TextInput
          style={styles.input}
          placeholder="Descreva seu dia, pensamentos ou sentimentos..."
          value={detalhes}
          onChangeText={setDetalhes}
          multiline
        />

        <Button
          title="Salvar Registro"
          onPress={salvarRegistro}
          color="#4A90E2"
        />

        {mensagemErro && <Text style={styles.msgErro}>{mensagemErro}</Text>}
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
  container: { padding: 16, backgroundColor: "#F5F5F5" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 8 },
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
  textoHumor: { marginTop: 5, fontSize: 14 },
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
  msgErro: { color: "red", marginTop: 10, textAlign: "center" },
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
