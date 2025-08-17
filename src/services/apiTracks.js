import { apiClient } from "./spotify";
import { testPlayList } from "./TestPlayList";

const LIMIT_TRACKS = 100;
const OFFSET = 0;
// get tracks from any playlist
export async function getTracks(id) {
  try {
    let tracks;
    if (id === "1234567890") {
      tracks = testPlayList.tracks;
    } else if (id === "liked-songs") {
      tracks = await apiClient(`me/tracks?limit=50&offset=${OFFSET}`);
    } else {
      tracks = await apiClient(
        `playlists/${id}/tracks?limit=${LIMIT_TRACKS}&offset=${OFFSET}`
      );
    }
    return { id, tracks };
  } catch (error) {
    console.error(error);
    throw new Error("Tracks could not be loaded");
  }
}

export async function checkIfSongIsLiked(trackIds) {
  try {
    const response = await apiClient(`me/tracks/contains?ids=${trackIds}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addSongToLikedTracks(trackIds) {
  try {
    await apiClient(`me/tracks`, {
      method: "PUT",
      body: JSON.stringify({ ids: [trackIds] }),
    });
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Song couldn't be added to Favorties");
  }
}

export async function removeSongFromLikedTracks(trackIds) {
  try {
    await apiClient(`me/tracks`, {
      method: "DELETE",
      body: JSON.stringify({ ids: [trackIds] }),
    });
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Song couldn't be removed from Favorties");
  }
}
