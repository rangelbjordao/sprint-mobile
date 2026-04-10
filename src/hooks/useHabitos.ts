import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  HabitoRequest,
  HabitoResponse,
  HabitoService,
} from "@/services/habitoService";

export function useHabitos() {
  const queryClient = useQueryClient();

  const {
    data: habitos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["habitos"],
    queryFn: HabitoService.listar,
  });

  const criarMutation = useMutation({
    mutationFn: (dto: HabitoRequest) => HabitoService.criar(dto),
    onSuccess: (novoHabito) => {
      queryClient.setQueryData<HabitoResponse[]>(["habitos"], (old = []) => [
        novoHabito,
        ...old,
      ]);
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: HabitoRequest }) =>
      HabitoService.atualizar(id, dto),
    onSuccess: (habitoAtualizado) => {
      queryClient.setQueryData<HabitoResponse[]>(["habitos"], (old = []) =>
        old.map((habito) =>
          habito.id === habitoAtualizado.id ? habitoAtualizado : habito,
        ),
      );
    },
  });

  const deletarMutation = useMutation({
    mutationFn: (id: number) => HabitoService.deletar(id),

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["habitos"] });

      const anterior = queryClient.getQueryData<HabitoResponse[]>(["habitos"]);

      queryClient.setQueryData<HabitoResponse[]>(["habitos"], (old = []) =>
        old.filter((habito) => habito.id !== id),
      );

      return { anterior };
    },

    onError: (_err, _id, context) => {
      queryClient.setQueryData(["habitos"], context?.anterior);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["habitos"] });
    },
  });

  return {
    habitos,
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
