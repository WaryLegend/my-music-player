import { useQuery } from "@tanstack/react-query";
import { getTracks } from "../../services/apiTracks";

export function useLikeTracks() {
  // creating a query key for read liked tracks in spotify
  const { data: tracksData, isLoading } = useQuery({
    queryKey: ["liketracks"],
    queryFn: () => getTracks("liked-songs"),
  });
  return { tracksData, isLoading };
}
