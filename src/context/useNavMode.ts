import { useContext } from "react";
import { NavModeContext, type NavModeContextValue } from "./navModeStore";

export function useNavMode(): NavModeContextValue {
  const context = useContext(NavModeContext);
  if (!context) {
    throw new Error("useNavMode must be used within a NavModeProvider");
  }
  return context;
}
