import { useContext } from "react";
import { PlayListContext } from "../contexts/PlayListContext";

export function usePlayList() {
  const context = useContext(PlayListContext);
  if (context === undefined)
    throw new Error("PlayListContext was used outside the PlayListProvider");
  return context;
}
