import { useEffect, useState, type ReactNode } from "react";
import { NavModeContext, type NavMode } from "./navModeStore";

const STORAGE_KEY = "nav-mode";

function readStoredMode(): NavMode {
  if (typeof window === "undefined") return "essentials";
  return window.localStorage.getItem(STORAGE_KEY) === "portal" ||
    window.localStorage.getItem(STORAGE_KEY) === "operations"
    ? "portal"
    : "essentials";
}

export function NavModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<NavMode>(readStoredMode);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const toggleMode = () => setMode((current) => (current === "essentials" ? "portal" : "essentials"));

  return (
    <NavModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </NavModeContext.Provider>
  );
}
