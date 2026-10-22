import type { BankPurchaseInvoice, BankTransaction } from "../data/bankingTransactions";
import { needsCategory, needsInvoice, suggestedInvoices, type RejectedSuggestions } from "./transactionMatching";

export type TransactionProposal = { kind: "invoice" | "multiple" | "difference" | "missing" | "category" | "complete"; invoices: BankPurchaseInvoice[] };
const normaliseSupplier = (value: string) => value.trim().toLocaleLowerCase("en-GB").replace(/[^\p{L}\p{N}]/gu, "");

// API boundary: eligible proposals reuse the matching guards; related documents never become eligible automatically.
export function transactionProposal(transaction: BankTransaction, invoices: BankPurchaseInvoice[], transactions: BankTransaction[], rejected: RejectedSuggestions = {}): TransactionProposal {
  if (needsCategory(transaction)) return { kind: "category", invoices: [] };
  if (!needsInvoice(transaction)) return { kind: "complete", invoices: [] };
  const eligible = suggestedInvoices(transaction, invoices, transactions, rejected);
  if (eligible.length) return { kind: eligible.length === 1 ? "invoice" : "multiple", invoices: eligible };
  const related = invoices.filter(invoice => {
    const days = (Date.parse(transaction.date) - Date.parse(invoice.date)) / 86400000;
    return normaliseSupplier(invoice.supplier) === normaliseSupplier(transaction.merchant) && days >= 0 && days <= 31
      && !transactions.some(row => row.invoiceId === invoice.id) && !rejected[transaction.id]?.includes(invoice.id);
  }).sort((a, b) => b.date.localeCompare(a.date));
  return { kind: related.length ? "difference" : "missing", invoices: related };
}
