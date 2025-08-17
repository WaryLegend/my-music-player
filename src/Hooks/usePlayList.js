import { useContext } from "react";
import { PlayListContext } from "../contexts/SongContext";

export function usePlayList() {
  const context = useContext(PlayListContext);
  if (!context)
    throw new Error("PlayListContext was used outside the PlayListProvider");
  return context;
}
