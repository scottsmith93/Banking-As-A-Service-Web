import { useContext } from "react";
import { BankingTransactionsContext } from "./bankingTransactionsContext";

export function useBankingTransactions() {
  const store = useContext(BankingTransactionsContext);
  if (!store) throw new Error("useBankingTransactions requires BankingTransactionsProvider");
  return store;
}
