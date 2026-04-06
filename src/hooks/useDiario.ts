import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DiarioService, RegistroHumorRequest } from "@/services/diarioService";

export function useDiario() {
  const queryClient = useQueryClient();

  const {
    data: registros = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["humor"],
    queryFn: DiarioService.listar,
  });

  const criarMutation = useMutation({
    mutationFn: (dto: RegistroHumorRequest) => DiarioService.criar(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["humor"] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: RegistroHumorRequest }) =>
      DiarioService.atualizar(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["humor"] });
    },
  });

  const deletarMutation = useMutation({
    mutationFn: (id: number) => DiarioService.deletar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["humor"] });
    },
  });

  return {
    registros,
    isLoading,
    error,
    criar: criarMutation.mutateAsync,
    atualizar: atualizarMutation.mutateAsync,
    deletar: deletarMutation.mutateAsync,
    criando: criarMutation.isPending,
    atualizando: atualizarMutation.isPending,
    deletando: deletarMutation.isPending,
  };
}
