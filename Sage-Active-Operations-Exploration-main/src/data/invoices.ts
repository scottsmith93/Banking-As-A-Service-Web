// MOCK DATA — replace with real API responses

export type SalesInvoiceStatus = "draft" | "unposted" | "overdue";

export type EInvoiceStatus = "rejected" | null;

export type SalesInvoiceType = "invoice" | "credit-note";

export type Invoice = {
  id: string;
  status: SalesInvoiceStatus;
  eInvoiceStatus: EInvoiceStatus;
  /** ISO date string */
  invoiceDate: string;
  invoiceNumber: string;
  reference: string;
  customerCode: string;
  customerName: string;
  totalGbp: number;
  taxableAmountGbp: number;
  outstandingAmountGbp: number;
  type: SalesInvoiceType;
  /** Used by invoice detail view */
  issueDate: string;
  dueDate: string;
  amountGbp: number;
};

const customers = [
  { code: "ABCPORTAGE", name: "ABC Portage Services" },
  { code: "BHCAPITAL", name: "BH Capital Partners" },
  { code: "AMAZON", name: "Amazon UK Services Ltd" },
  { code: "C01", name: "Northbridge Office Supplies Ltd" },
  { code: "C02", name: "Cedar & Co. Chartered Accountants" },
  { code: "C03", name: "Willowbrook Veterinary Practice" },
  { code: "C04", name: "Harbour Lane Property Management" },
  { code: "C05", name: "Brightfield Marketing Collective" },
] as const;

const references = [
  "REF-4421",
  "",
  "PO-9910",
  "WK-3304",
  "APR-2201",
  "",
  "RET-8821",
  "PROJ-5540",
] as const;

const statuses: SalesInvoiceStatus[] = [
  "draft",
  "unposted",
  "overdue",
  "draft",
  "unposted",
  "overdue",
  "draft",
  "unposted",
];

const types: SalesInvoiceType[] = [
  "invoice",
  "invoice",
  "credit-note",
  "invoice",
  "invoice",
  "credit-note",
  "invoice",
  "invoice",
];

function buildInvoice(index: number): Invoice {
  const customer = customers[index % customers.length];
  const status = statuses[index % statuses.length];
  const type = types[index % types.length];
  const invoiceNumber = `139-${String(index + 1).padStart(3, "0")}`;
  const day = String((index % 28) + 1).padStart(2, "0");
  const month = String((index % 12) + 1).padStart(2, "0");
  const year = index % 4 === 0 ? "2025" : "2026";
  const invoiceDate = `${year}-${month}-${day}`;
  const dueMonth = String(Math.min(12, Number(month) + 1)).padStart(2, "0");

  const baseTotal = Number((1176.6 + index * 214.35).toFixed(2));
  const totalGbp = type === "credit-note" ? -baseTotal : baseTotal;
  const taxableAmountGbp = Number((Math.abs(totalGbp) / 1.2).toFixed(2)) * (type === "credit-note" ? -1 : 1);
  const outstandingAmountGbp =
    status === "draft" ? 0 : Number((totalGbp * (status === "overdue" ? 1 : 0.65)).toFixed(2));

  return {
    id: `inv-${String(index + 1).padStart(3, "0")}`,
    status,
    eInvoiceStatus: index % 5 === 2 ? "rejected" : null,
    invoiceDate,
    invoiceNumber,
    reference: references[index % references.length],
    customerCode: customer.code,
    customerName: customer.name,
    totalGbp,
    taxableAmountGbp,
    outstandingAmountGbp,
    type,
    issueDate: invoiceDate,
    dueDate: `${year}-${dueMonth}-${day}`,
    amountGbp: totalGbp,
  };
}

export const invoices: Invoice[] = Array.from({ length: 36 }, (_, index) =>
  buildInvoice(index),
);
