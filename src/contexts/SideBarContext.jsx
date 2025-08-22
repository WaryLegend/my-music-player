/* eslint-disable react/prop-types */
import { createContext, useMemo, useReducer } from "react";

const SidebarContext = createContext();

const initialState = {
  isOpen: true, // default open
};

function sidebarReducer(state, action) {
  switch (action.type) {
    case "sidebar/toggle":
      return { ...state, isOpen: !state.isOpen };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function SidebarProvider({ children }) {
  const [{ isOpen }, dispatch] = useReducer(sidebarReducer, initialState);

  function toggleSidebar() {
    dispatch({ type: "sidebar/toggle" });
  }
  const contextValue = useMemo(() => ({ isOpen, toggleSidebar }), [isOpen]);

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export { SidebarProvider, SidebarContext };
