import { createContext, useEffect, useReducer } from "react";
import { apiClient } from "../pages/Auth/spotify";
import { useAuth } from "../Hooks/useAuth";

const PlayListContext = createContext();

const initialState = {
  playlists: [],
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "playlists/loaded":
      return {
        ...state,
        isLoading: false,
        playlists: action.payload,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function PlayListProvider({ children }) {
  const [{ playlists, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || authLoading) return;

    async function fetchPlaylists() {
      dispatch({ type: "loading" });
      try {
        const [playlistsData, likedData] = await Promise.all([
          apiClient("me/playlists"),
          apiClient("me/tracks?limit=50&offset=0"),
        ]);
        const playlists = playlistsData.items;
        // Create a fake playlist object for Liked Songs
        const likedlist = {
          id: "liked-songs",
          name: "Liked Songs",
          images: [
            {
              url: "https://misc.scdn.co/liked-songs/liked-songs-640.png",
            },
          ],
          tracks: {
            href: "/me/tracks",
            total: likedData.total,
            items: likedData.items.map((item) => ({
              track: item.track,
            })),
          },
          type: "liked",
        };
        dispatch({
          type: "playlists/loaded",
          payload: [likedlist, ...playlists],
        });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading playlists...",
        });
      }
    }
    fetchPlaylists();
  }, [isAuthenticated, authLoading]);

  function getPlaylist(id) {
    return playlists.find((pl) => pl.id === id);
  }

  return (
    <PlayListContext.Provider
      value={{
        playlists,
        isLoading,
        error,
        getPlaylist,
      }}
    >
      {children}
    </PlayListContext.Provider>
  );
}

export { PlayListContext, PlayListProvider };
