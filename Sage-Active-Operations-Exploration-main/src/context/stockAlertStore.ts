import { createContext } from "react";

export type StockAlertContextValue = {
  currentStock: number;
  reorderThreshold: number;
  /** True while currentStock is below the reorder threshold. */
  isLowStock: boolean;
  /** Adds received quantity to stock on hand (e.g. after confirming a purchase receipt). */
  receiveStock: (quantity: number) => void;
};

export const StockAlertContext = createContext<StockAlertContextValue | undefined>(undefined);
