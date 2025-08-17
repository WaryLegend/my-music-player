import { apiClient } from "./spotify";
import { testPlayList } from "./TestPlayList";

export async function fetchPlaylists() {
  try {
    const [playlistsData, likedData] = await Promise.all([
      apiClient("me/playlists"),
      apiClient("me/tracks?limit=1"),
    ]);

    // Map playlists to include only desired fields
    const playlists = playlistsData.items.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      images: playlist.images,
      tracks: {
        href: playlist.tracks.href,
        total: playlist.tracks.total,
      },
      type: "playlist",
    }));

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
      },
      type: "playlist",
    };

    // Add the test playlist from JSON
    const testPlaylist = {
      id: testPlayList.id,
      name: testPlayList.name,
      images: testPlayList.images,
      tracks: {
        href: "/test/playlist/tracks",
        total: testPlayList.tracks.total,
      },
      type: testPlayList.type,
    };

    return [likedlist, testPlaylist, ...playlists];
  } catch (error) {
    if (error) {
      console.error(error);
      throw new Error("Playlists could not be load");
    }
  }
}
