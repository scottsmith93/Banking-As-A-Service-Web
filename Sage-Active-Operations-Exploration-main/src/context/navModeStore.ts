import { createContext } from "react";

export type NavMode = "essentials" | "portal";

export type NavModeContextValue = {
  mode: NavMode;
  setMode: (mode: NavMode) => void;
  toggleMode: () => void;
};

export const NavModeContext = createContext<NavModeContextValue | undefined>(undefined);
