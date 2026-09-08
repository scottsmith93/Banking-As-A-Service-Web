// MOCK DATA — replace with real API responses

import type { PurchaseReceipt } from "./purchaseReceipts";

export type JournalEntryLine = {
  id: string;
  number: string;
  journal: string;
  /** ISO date string */
  date: string;
  documentNumber: string;
  /** ISO date string */
  documentDate: string;
  status: string;
  account: string;
  thirdParty: string;
  description: string;
  debitGbp: number;
  creditGbp: number;
  currency: string;
  month: string;
};

export const journalEntryLines: JournalEntryLine[] = [
  {
    id: "je-001",
    number: "36",
    journal: "VTE",
    date: "2026-06-10",
    documentNumber: "143-",
    documentDate: "2026-06-10",
    status: "",
    account: "411100 - Trade debtors EU",
    thirdParty: "ABC Portage Services",
    description: "Invoice no. 143- 10/06/2026",
    debitGbp: 21.48,
    creditGbp: 0,
    currency: "EUR",
    month: "June",
  },
  {
    id: "je-002",
    number: "",
    journal: "",
    date: "",
    documentNumber: "",
    documentDate: "",
    status: "",
    account: "70600000 - Services rendered",
    thirdParty: "",
    description: "",
    debitGbp: 0,
    creditGbp: 17.9,
    currency: "EUR",
    month: "June",
  },
  {
    id: "je-003",
    number: "",
    journal: "",
    date: "",
    documentNumber: "",
    documentDate: "",
    status: "",
    account: "44571400 - VAT collected",
    thirdParty: "",
    description: "",
    debitGbp: 0,
    creditGbp: 3.58,
    currency: "EUR",
    month: "June",
  },
];

/**
 * Books the stock movement for a confirmed purchase receipt: debits the
 * stock asset account and credits "suppliers - invoices not received"
 * (goods received, not yet invoiced), and adds the pair to the in-memory
 * ledger.
 */
export function createStockReceiptJournalEntries(receipt: PurchaseReceipt): JournalEntryLine[] {
  const netTotalGbp = Number(
    receipt.lines.reduce((sum, line) => sum + line.quantityPurchaseUnit * line.netPriceGbp, 0).toFixed(2),
  );
  const month = new Date(receipt.receiptDate).toLocaleDateString("fr-FR", { month: "long" });

  const entries: JournalEntryLine[] = [
    {
      id: `je-${receipt.id}-stock`,
      number: String(journalEntryLines.length + 1),
      journal: "ACH",
      date: receipt.receiptDate,
      documentNumber: receipt.receiptId,
      documentDate: receipt.receiptDate,
      status: "",
      account: "37100000 - Goods for resale",
      thirdParty: receipt.supplier,
      description: `Stock receipt ${receipt.receiptId} — ${receipt.supplier}`,
      debitGbp: netTotalGbp,
      creditGbp: 0,
      currency: "EUR",
      month,
    },
    {
      id: `je-${receipt.id}-grni`,
      number: "",
      journal: "",
      date: "",
      documentNumber: "",
      documentDate: "",
      status: "",
      account: "40810000 - Suppliers - invoices not received",
      thirdParty: "",
      description: "",
      debitGbp: 0,
      creditGbp: netTotalGbp,
      currency: "EUR",
      month,
    },
  ];

  journalEntryLines.push(...entries);
  return entries;
}
