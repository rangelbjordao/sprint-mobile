import { useQuery } from "@tanstack/react-query";
import UsuarioService from "@/services/usuarioService";

export function useUsuarioMe() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["usuario-me"],
    queryFn: UsuarioService.me,
  });

  return {
    usuario: data,
    isLoading,
    error,
  };
}
