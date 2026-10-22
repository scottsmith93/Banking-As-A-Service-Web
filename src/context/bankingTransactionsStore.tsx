import { useState, type ReactNode } from "react";
import { bankTransactions, bankPurchaseInvoices, type BankPurchaseInvoice, type TransactionCategory } from "../data/bankingTransactions";
import { requiresCategory, validateInvoiceMatch, type InvoiceMatchError, type RejectedSuggestions } from "../utils/transactionMatching";
import { BankingTransactionsContext } from "./bankingTransactionsContext";

export function BankingTransactionsProvider({ children }: { children: ReactNode }) {
  // PROTOTYPE: a shared API-shaped snapshot; route changes preserve matches, refresh resets the demonstration.
  const [state, setState] = useState({ transactions: bankTransactions, invoices: bankPurchaseInvoices });
  const [rejectedSuggestions, setRejectedSuggestions] = useState<RejectedSuggestions>({});
  const categoriseTransaction = (transactionId: string, category: TransactionCategory) => {
    if (category === "uncategorised") return;
    setState(current => ({ ...current, transactions: current.transactions.map(row => row.id === transactionId && requiresCategory(row) ? { ...row, category } : row) }));
  };
  // Reject the proposed association, not the purchase or invoice. Manual linking remains available.
  const rejectSuggestion = (transactionId: string, invoiceId: string) => setRejectedSuggestions(current => ({
    ...current, [transactionId]: [...new Set([...(current[transactionId] ?? []), invoiceId])],
  }));
  const matchInvoice = (transactionId: string, invoice: BankPurchaseInvoice): InvoiceMatchError | null => {
    const transaction = state.transactions.find(row => row.id === transactionId);
    if (!transaction) return "notEligible";
    const error = validateInvoiceMatch(transaction, invoice, state.transactions, state.invoices);
    if (error) return error;
    setState(current => {
      const latest = current.transactions.find(row => row.id === transactionId);
      if (!latest || validateInvoiceMatch(latest, invoice, current.transactions, current.invoices)) return current;
      return {
        transactions: current.transactions.map(row => row.id === transactionId ? { ...row, invoiceId: invoice.id } : row),
        invoices: current.invoices.some(row => row.id === invoice.id) ? current.invoices : [invoice, ...current.invoices],
      };
    });
    return null;
  };
  return <BankingTransactionsContext.Provider value={{ ...state, rejectedSuggestions, rejectSuggestion, matchInvoice, categoriseTransaction }}>{children}</BankingTransactionsContext.Provider>;
}
