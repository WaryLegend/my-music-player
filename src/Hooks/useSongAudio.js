import { useContext } from "react";
import { SongAudioContext } from "../contexts/SongContext";

export function useSongAudio() {
  const context = useContext(SongAudioContext);
  if (!context)
    throw new Error("SongAudioContext was used outside the SongProvider");
  return context;
}
