import { useContext } from "react";
import { BankingBaasContext } from "./bankingBaasStore";

export function useBankingBaas() {
  const context = useContext(BankingBaasContext);
  if (!context) throw new Error("useBankingBaas must be used within BankingBaasProvider");
  return context;
}
