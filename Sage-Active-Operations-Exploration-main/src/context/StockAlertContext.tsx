import { useMemo, useState, type ReactNode } from "react";
import { StockAlertContext } from "./stockAlertStore";
import { lowStockItem } from "../data/stockAlerts";

// Starts below the reorder threshold so the dashboard alert shows by
// default — receiving stock through the purchase receipt flow raises it
// back above the threshold, which is what makes the alert disappear.
const INITIAL_STOCK = 8;

export function StockAlertProvider({ children }: { children: ReactNode }) {
  const [currentStock, setCurrentStock] = useState(INITIAL_STOCK);

  const value = useMemo(
    () => ({
      currentStock,
      reorderThreshold: lowStockItem.reorderThreshold,
      isLowStock: currentStock < lowStockItem.reorderThreshold,
      receiveStock: (quantity: number) => setCurrentStock((current) => current + quantity),
    }),
    [currentStock],
  );

  return <StockAlertContext.Provider value={value}>{children}</StockAlertContext.Provider>;
}
