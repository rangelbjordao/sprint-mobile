import { useQuery } from "@tanstack/react-query";
import UserMusicService, { MusicaUsuario } from "@/services/userMusicService";

export function useUserTopMusicas(limit = 5) {
  const query = useQuery<MusicaUsuario[]>({
    queryKey: ["top-musicas", limit],
    queryFn: () => UserMusicService.buscarTopMusicasSpotify(limit),
    staleTime: 1000 * 60 * 5,
  });

  return {
    musicas: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    recarregar: query.refetch,
  };
}
