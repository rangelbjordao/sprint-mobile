import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ApexService, { RegistroApex } from "@/services/apexService";

export function useRelatorioSemanal(usuarioId: number | null) {
  const queryClient = useQueryClient();

  const relatorio = useQuery({
    queryKey: ["relatorio-semanal", usuarioId],
    queryFn: () => ApexService.buscarRelatorio(usuarioId!),
    enabled: !!usuarioId,
  });

  const distribuicao = useQuery({
    queryKey: ["distribuicao-humor", usuarioId],
    queryFn: () => ApexService.buscarDistribuicao(usuarioId!),
    enabled: !!usuarioId,
  });

  const enviarMutation = useMutation({
    mutationFn: (registro: RegistroApex) =>
      ApexService.enviarRegistro(registro),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relatorio-semanal"] });
      queryClient.invalidateQueries({ queryKey: ["distribuicao-humor"] });
    },
  });

  return {
    relatorio: relatorio.data,
    distribuicao: distribuicao.data ?? [],
    loadingRelatorio: relatorio.isLoading,
    loadingDistribuicao: distribuicao.isLoading,
    errorRelatorio: relatorio.error,
    enviarRegistro: enviarMutation.mutateAsync,
    enviando: enviarMutation.isPending,
  };
}
