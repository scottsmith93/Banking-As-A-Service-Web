import { useContext } from "react";
import { StockAlertContext, type StockAlertContextValue } from "./stockAlertStore";

export function useStockAlert(): StockAlertContextValue {
  const context = useContext(StockAlertContext);
  if (!context) {
    throw new Error("useStockAlert must be used within a StockAlertProvider");
  }
  return context;
}
