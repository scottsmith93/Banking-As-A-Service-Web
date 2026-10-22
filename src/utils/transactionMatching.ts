import type { BankPurchaseInvoice, BankTransaction, MatchingState } from "../data/bankingTransactions";

const normalise = (value: string) => value.trim().toLocaleLowerCase("en-GB").replace(/[^\p{L}\p{N}]/gu, "");
export const requiresInvoice = (transaction: BankTransaction) => transaction.type !== "atmWithdrawal" && transaction.invoiceRequired;
export const needsInvoice = (transaction: BankTransaction) => requiresInvoice(transaction) && transaction.amount < 0 && transaction.paymentStatus === "completed" && !transaction.invoiceId;
// Evidence rules are API-owned in production. This prototype distinguishes invoice matching from accounting categorisation.
export const requiresCategory = (transaction: BankTransaction) => !requiresInvoice(transaction) && transaction.paymentStatus === "completed";
export const needsCategory = (transaction: BankTransaction) => requiresCategory(transaction) && transaction.category === "uncategorised";
export const needsJustification = (transaction: BankTransaction) => needsInvoice(transaction) || needsCategory(transaction);
export const isJustified = (transaction: BankTransaction) => Boolean(transaction.invoiceId) || (requiresCategory(transaction) && !needsCategory(transaction));
export const amountDifference = (transaction: BankTransaction, invoice: BankPurchaseInvoice) => (Math.round(invoice.amount * 100) - Math.round(Math.abs(transaction.amount) * 100)) / 100;
export function canLinkInvoice(transaction: BankTransaction, invoice: BankPurchaseInvoice, transactions: BankTransaction[]) {
  return needsInvoice(transaction) && invoice.currency === transaction.currency && amountDifference(transaction, invoice) === 0
    && invoice.date <= transaction.date
    && normalise(transaction.merchant) === normalise(invoice.supplier)
    && !transactions.some(row => row.invoiceId === invoice.id);
}
export type RejectedSuggestions = Record<string, string[]>;
export function suggestedInvoices(transaction: BankTransaction, invoices: BankPurchaseInvoice[], transactions: BankTransaction[], rejected: RejectedSuggestions = {}) {
  return invoices.filter(invoice => {
    const days = (Date.parse(transaction.date) - Date.parse(invoice.date)) / 86400000;
    return !rejected[transaction.id]?.includes(invoice.id) && canLinkInvoice(transaction, invoice, transactions) && days >= 0 && days <= 31;
  }).sort((first, second) => second.date.localeCompare(first.date));
}
export function matchingState(transaction: BankTransaction, invoices: BankPurchaseInvoice[], transactions: BankTransaction[], rejected: RejectedSuggestions = {}): MatchingState {
  if (transaction.invoiceId) return "matched";
  if (transaction.invoiceRequired && ["pending", "disputed"].includes(transaction.paymentStatus)) return "waiting";
  if (needsCategory(transaction)) return "categoryNeeded";
  if (requiresCategory(transaction)) return "categorised";
  if (!needsInvoice(transaction)) return "notRequired";
  return suggestedInvoices(transaction, invoices, transactions, rejected).length ? "suggested" : "missing";
}
export type InvoiceMatchError = "notEligible" | "mismatch" | "alreadyLinked" | "duplicateInvoice";
export function validateInvoiceMatch(transaction: BankTransaction, invoice: BankPurchaseInvoice, transactions: BankTransaction[], invoices: BankPurchaseInvoice[]): InvoiceMatchError | null {
  if (!needsInvoice(transaction)) return "notEligible";
  if (transactions.some(row => row.invoiceId === invoice.id)) return "alreadyLinked";
  if (invoice.source === "upload" && invoices.some(existing => normalise(existing.reference) === normalise(invoice.reference) && normalise(existing.supplier) === normalise(invoice.supplier))) return "duplicateInvoice";
  if (!invoice.reference.trim() || !invoice.supplier.trim() || !Number.isFinite(invoice.amount) || !Number.isFinite(Date.parse(invoice.date)) || invoice.date > transaction.date || !canLinkInvoice(transaction, invoice, transactions)) return "mismatch";
  return null;
}
