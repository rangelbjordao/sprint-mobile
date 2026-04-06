import api from "@/services/api";

export type RegistroHumorRequest = {
  humor: string;
  atividades: string[];
  detalhes: string;
};

export type RegistroHumorResponse = {
  id: number;
  humor: string;
  atividades: string[];
  detalhes: string;
  criadoEm: string;
};

export const DiarioService = {
  listar: async (): Promise<RegistroHumorResponse[]> => {
    const response = await api.get("/humor");
    return response.data;
  },

  criar: async (dto: RegistroHumorRequest): Promise<RegistroHumorResponse> => {
    const response = await api.post("/humor", dto);
    return response.data;
  },

  atualizar: async (
    id: number,
    dto: RegistroHumorRequest,
  ): Promise<RegistroHumorResponse> => {
    const response = await api.put(`/humor/${id}`, dto);
    return response.data;
  },

  deletar: async (id: number): Promise<void> => {
    await api.delete(`/humor/${id}`);
  },
};
