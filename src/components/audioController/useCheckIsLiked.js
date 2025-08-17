import { useQuery } from "@tanstack/react-query";
import { checkIfSongIsLiked } from "../../services/apiTracks";

export function useCheckIsLiked(trackId) {
  const { data, isLoading } = useQuery({
    queryKey: ["checkLiked", trackId],
    queryFn: () => checkIfSongIsLiked(trackId),
    retry: false, // by default ReactQuery will refetch 3 times (true)
  });
  const isLiked = data?.[0] || false;
  return { isLiked, isLoading };
}
