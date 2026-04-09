import api from "@/services/api";

export type UsuarioMe = {
  id: number;
  username: string;
  email: string;
};

export const UsuarioService = {
  me: async (): Promise<UsuarioMe> => {
    const response = await api.get("/usuarios/me");
    return response.data;
  },
};

export default UsuarioService;
