import api from "@/services/api";

export type RelatorioSemanal = {
  humor_predominante: string;
  total_registros: number;
  media_humor: number;
  ultimo_registro: string;
};

export const ApexService = {
  buscarRelatorio: async (): Promise<RelatorioSemanal | null> => {
    const response = await api.get("/humor/relatorio-semanal");
    return response.data ?? null;
  },
};

export default ApexService;
