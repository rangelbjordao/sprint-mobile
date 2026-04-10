import api from "@/services/api";

export type HabitoRequest = {
  atividade: string;
  valor: number;
  unidade: string;
  dataRegistro: string;
};

export type HabitoResponse = {
  id: number;
  atividade: string;
  valor: number;
  unidade: string;
  dataRegistro: string;
  criadoEm: string;
};

export const HabitoService = {
  listar: async (): Promise<HabitoResponse[]> => {
    const response = await api.get("/habitos");
    return response.data;
  },

  criar: async (dto: HabitoRequest): Promise<HabitoResponse> => {
    const response = await api.post("/habitos", dto);
    return response.data;
  },

  atualizar: async (
    id: number,
    dto: HabitoRequest,
  ): Promise<HabitoResponse> => {
    const response = await api.put(`/habitos/${id}`, dto);
    return response.data;
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/habitos/${id}`);
  },
};
