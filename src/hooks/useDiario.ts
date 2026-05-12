import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DiarioService,
  RegistroHumorRequest,
  RegistroHumorResponse,
} from "@/services/diarioService";
import { notificarRelatorioAtualizado } from "@/services/notificationService";

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
    onSuccess: async (novoRegistro) => {
      queryClient.setQueryData<RegistroHumorResponse[]>(
        ["humor"],
        (old = []) => [novoRegistro, ...old],
      );

      queryClient.invalidateQueries({
        queryKey: ["relatorio-semanal"],
      });

      await notificarRelatorioAtualizado();
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: RegistroHumorRequest }) =>
      DiarioService.atualizar(id, dto),
    onSuccess: (registroAtualizado) => {
      queryClient.setQueryData<RegistroHumorResponse[]>(["humor"], (old = []) =>
        old.map((registro) =>
          registro.id === registroAtualizado.id ? registroAtualizado : registro,
        ),
      );

      queryClient.invalidateQueries({
        queryKey: ["relatorio-semanal"],
      });
    },
  });

  const deletarMutation = useMutation({
    mutationFn: (id: number) => DiarioService.deletar(id),

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["humor"] });

      const anterior = queryClient.getQueryData<RegistroHumorResponse[]>([
        "humor",
      ]);

      queryClient.setQueryData<RegistroHumorResponse[]>(["humor"], (old = []) =>
        old.filter((registro) => registro.id !== id),
      );

      return { anterior };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["humor"], context?.anterior);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["humor"] });

      queryClient.invalidateQueries({
        queryKey: ["relatorio-semanal"],
      });
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
