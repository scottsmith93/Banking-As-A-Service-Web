import { createContext } from "react";

export type NavMode = "essentials" | "operations";

export type NavModeContextValue = {
  mode: NavMode;
  setMode: (mode: NavMode) => void;
  toggleMode: () => void;
};

export const NavModeContext = createContext<NavModeContextValue | undefined>(undefined);
