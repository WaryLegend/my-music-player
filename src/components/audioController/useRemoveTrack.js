import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { removeSongFromLikedTracks } from "../../services/apiTracks";

export function useRemoveTrack() {
  // use the QueryClient from the inital declared at App()
  const queryClient = useQueryClient();

  const { isPending: isRemoving, mutate: removeTrack } = useMutation({
    mutationFn: removeSongFromLikedTracks,
    onSuccess: (_, trackId) => {
      toast.success("Removed from favorites successfully");
      // trigger the auto refresh when got deleted
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
  return { isRemoving, removeTrack };
}
