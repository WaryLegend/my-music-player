import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addSongToLikedTracks } from "../../services/apiTracks";

export function useAddToLikedTracks() {
  // use the QueryClient from the inital declared at App()
  const queryClient = useQueryClient();

  const { isPending: isAdding, mutate: addTrack } = useMutation({
    mutationFn: addSongToLikedTracks,
    onSuccess: (_, trackId) => {
      toast.success("Added to favorites successfully");
      // trigger the auto refresh when got added
      queryClient.invalidateQueries({
        queryKey: ["checkLiked", trackId],
      });
      queryClient.invalidateQueries({
        queryKey: ["liketracks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlists"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isAdding, addTrack };
}
