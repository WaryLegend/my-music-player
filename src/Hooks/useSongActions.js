import { useContext } from "react";
import { SongActionsContext } from "../contexts/SongContext";

export function useSongActions() {
  const context = useContext(SongActionsContext);
  if (!context)
    throw new Error("SongActionsContext was used outside the SongProvider");
  return context;
}
