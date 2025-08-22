import { useContext } from "react";
import { SidebarContext } from "../contexts/SideBarContext";

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error("SidebarContext was used outside the SidebarProvider");
  return context;
}
