import { useQuery } from "@tanstack/react-query";
import { getTracks } from "../../services/apiTracks";
import { useParams } from "react-router-dom";

export function useTracks() {
  const { playlistId } = useParams();
  // creating a query key for read tracks in any playlists in spotify
  const { data: tracksData, isLoading } = useQuery({
    queryKey: ["tracks", playlistId],
    queryFn: () => getTracks(playlistId),
    enabled: !!playlistId,
  });
  // console.log(tracksData);
  return { tracksData, isLoading };
}
