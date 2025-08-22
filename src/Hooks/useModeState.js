import { useContext } from "react";
import { ModeStateContext } from "../contexts/SongContext";

export function useModeState() {
  const context = useContext(ModeStateContext);
  if (!context)
    throw new Error("ModeStateContext was used outside the ModeStateProvider");
  return context;
}
