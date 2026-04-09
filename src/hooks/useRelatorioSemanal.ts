import { useQuery } from "@tanstack/react-query";
import ApexService from "@/services/apexService";

export function useRelatorioSemanal() {
  const relatorio = useQuery({
    queryKey: ["relatorio-semanal"],
    queryFn: ApexService.buscarRelatorio,
  });

  return {
    relatorio: relatorio.data,
    loadingRelatorio: relatorio.isLoading,
    errorRelatorio: relatorio.error,
  };
}
