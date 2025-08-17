import { useContext } from "react";
import { SongStateContext } from "../contexts/SongContext";

export function useSongState() {
  const context = useContext(SongStateContext);
  if (!context)
    throw new Error("SongStateContext was used outside the SongProvider");
  return context;
}
