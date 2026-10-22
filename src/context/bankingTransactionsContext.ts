import { createContext } from "react";
import type { BankTransaction, BankPurchaseInvoice, TransactionCategory } from "../data/bankingTransactions";
import type { InvoiceMatchError, RejectedSuggestions } from "../utils/transactionMatching";

type TransactionStore = {
  transactions: BankTransaction[];
  invoices: BankPurchaseInvoice[];
  rejectedSuggestions: RejectedSuggestions;
  rejectSuggestion: (transactionId: string, invoiceId: string) => void;
  matchInvoice: (transactionId: string, invoice: BankPurchaseInvoice) => InvoiceMatchError | null;
  categoriseTransaction: (transactionId: string, category: TransactionCategory) => void;
};
export const BankingTransactionsContext = createContext<TransactionStore | undefined>(undefined);
