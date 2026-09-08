// MOCK DATA — replace with real API responses

export type QuoteStatus = "pending" | "closed" | "declined";

export type Quote = {
  id: string;
  status: QuoteStatus;
  /** ISO date string */
  quoteDate: string;
  quoteNumber: string;
  reference: string;
  customerCode: string;
  customerName: string;
  /** Total quote value in EUR */
  totalGbp: number;
  /** Taxable amount in EUR (ex-VAT where applicable) */
  taxableAmountGbp: number;
};

const customers = [
  { code: "C01", name: "Northbridge Office Supplies Ltd" },
  { code: "C02", name: "Cedar & Co. Chartered Accountants" },
  { code: "C03", name: "Willowbrook Veterinary Practice" },
  { code: "C04", name: "Harbour Lane Property Management" },
  { code: "C05", name: "Brightfield Marketing Collective" },
  { code: "AMAZON", name: "Amazon France SAS" },
  { code: "C06", name: "Red Kite Engineering Services" },
  { code: "C07", name: "Elm Street Bakery (Trading as Elm Street)" },
  { code: "C08", name: "Summit Legal Partners LLP" },
  { code: "C09", name: "Greenway Garden Centre" },
  { code: "C10", name: "Lakeside IT Consultancy" },
  { code: "C11", name: "Oak & Ash Furniture Makers" },
] as const;

const references = [
  "PO-4421",
  "REF-7782",
  "QTE-9910",
  "APR-2201",
  "SO-1188",
  "WK-3304",
  "",
  "PROJ-5540",
  "RET-8821",
  "ANN-2026",
  "MNT-4410",
  "",
] as const;

const statuses: QuoteStatus[] = [
  "pending",
  "closed",
  "declined",
  "pending",
  "closed",
  "pending",
  "closed",
  "declined",
  "pending",
  "closed",
  "pending",
  "closed",
];

function buildQuote(index: number): Quote {
  const customer = customers[index % customers.length];
  const status = statuses[index % statuses.length];
  const quoteNumber = String(38 - index).padStart(4, "0");
  const day = String((index % 28) + 1).padStart(2, "0");
  const month = String((index % 12) + 1).padStart(2, "0");
  const year = index % 3 === 0 ? "2025" : "2026";

  const totalGbp = Number(
    (12 + (index % 9) * 18.5 + (index % 5) * 42.75).toFixed(2),
  );
  const taxableAmountGbp =
    index % 4 === 0
      ? totalGbp
      : Number((totalGbp / 1.2).toFixed(2));

  return {
    id: `quote-${quoteNumber}`,
    status,
    quoteDate: `${year}-${month}-${day}`,
    quoteNumber,
    reference: references[index % references.length],
    customerCode: customer.code,
    customerName: customer.name,
    totalGbp,
    taxableAmountGbp,
  };
}

export const quotes: Quote[] = Array.from({ length: 36 }, (_, index) =>
  buildQuote(index),
);
