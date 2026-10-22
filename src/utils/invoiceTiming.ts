// Invoice issue date and bank transaction date are distinct API fields, compared as UTC calendar days.
export function invoiceDaysBeforeTransaction(invoiceDate: string, transactionDate: string): number | null {
  const days = (Date.parse(transactionDate) - Date.parse(invoiceDate)) / 86400000;
  return Number.isFinite(days) ? days : null;
}
