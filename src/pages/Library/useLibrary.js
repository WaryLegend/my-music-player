import { useQuery } from "@tanstack/react-query";
import { fetchPlaylists } from "../../services/apiPlayLists";

export function useLibrary() {
  // creating a query key for read playlists in spotify
  const { data: playlists, isLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });
  return { playlists, isLoading };
}
