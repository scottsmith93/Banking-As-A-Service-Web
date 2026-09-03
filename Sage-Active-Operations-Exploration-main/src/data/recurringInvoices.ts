// MOCK DATA — replace with real API responses

export type RecurringInvoiceStatus = "complete" | "active";

export type RecurringInvoiceFrequency =
  | "Daily"
  | "Monthly"
  | "Weekly"
  | "Yearly"
  | "Custom"
  | "Last day of every month";

export type RecurringInvoice = {
  id: string;
  customerName: string;
  frequency: RecurringInvoiceFrequency;
  /** ISO date string */
  startDate: string;
  /** ISO date string — empty string when open-ended */
  endDate: string;
  recurrences: string;
  /** ISO date string */
  nextInvoiceDate: string;
  invoiceTotalGbp: number;
  taxableAmountGbp: number;
  status: RecurringInvoiceStatus;
};

const customers = [
  "ABC Portage Services",
  "Northbridge Office Supplies Ltd",
  "Cedar & Co. Chartered Accountants",
  "Amazon UK Services Ltd",
  "Willowbrook Veterinary Practice",
  "Harbour Lane Property Management",
  "Brightfield Marketing Collective",
  "Red Kite Engineering Services",
  "Summit Legal Partners LLP",
  "Greenway Garden Centre",
  "Lakeside IT Consultancy",
  "Oak & Ash Furniture Makers",
] as const;

const frequencies: RecurringInvoiceFrequency[] = [
  "Daily",
  "Monthly",
  "Weekly",
  "Yearly",
  "Custom",
  "Last day of every month",
  "Monthly",
  "Weekly",
  "Yearly",
  "Monthly",
  "Custom",
  "Daily",
];

const statuses: RecurringInvoiceStatus[] = [
  "complete",
  "active",
  "active",
  "complete",
  "active",
  "active",
  "complete",
  "active",
  "active",
  "complete",
  "active",
  "active",
];

function buildRecurringInvoice(index: number): RecurringInvoice {
  const startDay = String((index % 28) + 1).padStart(2, "0");
  const startMonth = String((index % 12) + 1).padStart(2, "0");
  const endDay = String(((index + 10) % 28) + 1).padStart(2, "0");
  const endMonth = String(((index + 4) % 12) + 1).padStart(2, "0");
  const hasEndDate = index % 4 !== 2;
  const invoiceTotalGbp = Number((233.2 + index * 41.75).toFixed(2));
  const taxableAmountGbp = Number((invoiceTotalGbp / 1.2).toFixed(2));

  return {
    id: `recurring-${String(index + 1).padStart(3, "0")}`,
    customerName: customers[index % customers.length],
    frequency: frequencies[index % frequencies.length],
    startDate: `2025-${startMonth}-${startDay}`,
    endDate: hasEndDate ? `2026-${endMonth}-${endDay}` : "",
    recurrences: "",
    nextInvoiceDate: index % 5 === 0 ? "9999-12-31" : `2026-06-${String((index % 28) + 1).padStart(2, "0")}`,
    invoiceTotalGbp,
    taxableAmountGbp,
    status: statuses[index % statuses.length],
  };
}

export const recurringInvoices: RecurringInvoice[] = Array.from(
  { length: 12 },
  (_, index) => buildRecurringInvoice(index),
);
