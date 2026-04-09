import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const APEX_BASE_URL = "https://oracleapex.com/ords/wksp_emotiwave/humor";

const apexApi = axios.create({
  baseURL: APEX_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export type RegistroApex = {
  usuario_id: number;
  humor: string;
  detalhes: string;
};

export type RelatorioSemanal = {
  humor_predominante: string;
  total_registros: number;
  media_humor: number;
  ultimo_registro: string;
};

export type DistribuicaoHumor = {
  humor: string;
  total: number;
  percentual: number;
};

export const ApexService = {
  enviarRegistro: async (registro: RegistroApex): Promise<void> => {
    try {
      const url = `${APEX_BASE_URL}/registros`;

      console.log("Enviando para APEX:", JSON.stringify(registro, null, 2));
      console.log("URL final POST:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registro),
      });

      const responseText = await response.text();

      console.log("Status POST APEX:", response.status);
      console.log("Resposta POST APEX:", responseText);

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}: ${responseText}`);
      }
    } catch (error: any) {
      console.log("Erro POST APEX message:", error?.message);
      throw error;
    }
  },

  buscarRelatorio: async (
    usuarioId: number,
  ): Promise<RelatorioSemanal | null> => {
    try {
      const url = `${APEX_BASE_URL}/relatorio?usuario_id=${usuarioId}`;

      console.log("Buscando relatório para usuário:", usuarioId);
      console.log("URL final GET:", url);

      const response = await fetch(url);
      const responseText = await response.text();

      console.log("Status GET APEX:", response.status);
      console.log("Resposta GET APEX:", responseText);

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}: ${responseText}`);
      }

      const data = JSON.parse(responseText);

      if (data?.items && Array.isArray(data.items)) {
        return data.items[0] ?? null;
      }

      if (Array.isArray(data)) {
        return data[0] ?? null;
      }

      if (data?.humor_predominante) {
        return data;
      }

      return null;
    } catch (error: any) {
      console.log("Erro GET APEX message:", error?.message);
      throw error;
    }
  },

  buscarDistribuicao: async (
    usuarioId: number,
  ): Promise<DistribuicaoHumor[]> => {
    const response = await apexApi.get("/registros", {
      params: { usuario_id: usuarioId },
    });
    return response.data.items;
  },
};

export default ApexService;
