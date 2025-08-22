import { useContext } from "react";
import { PlaybackStateContext } from "../contexts/SongContext";

export function usePlayback() {
  const context = useContext(PlaybackStateContext);
  if (!context)
    throw new Error("PlaybackContext was used outside the PlaybackProvider");
  return context;
}
