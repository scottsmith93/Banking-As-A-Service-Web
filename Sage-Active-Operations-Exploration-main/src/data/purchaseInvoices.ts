// MOCK DATA — replace with real API responses

export type PurchaseInvoiceStatus =
  | "overdue"
  | "pending"
  | "paid"
  | "partially-overdue";

export type PurchaseInvoiceListCategory =
  | "requires-attention"
  | "awaiting-payment"
  | "refused"
  | "paid";

export type PurchaseInvoice = {
  id: string;
  /** ISO date string */
  importDate: string;
  fileName: string;
  status: PurchaseInvoiceStatus;
  listCategory: PurchaseInvoiceListCategory;
  description: string;
  supplier: string;
  /** ISO date string */
  invoiceDate: string;
  invoiceNumber: string;
  totalGbp: number;
  outstandingAmountGbp: number;
  /** ISO date string */
  paymentDueDate: string;
};

const suppliers = [
  "Air France",
  "SFR",
  "Airbnb",
  "British Telecom",
  "Amazon Web Services",
  "Office Supplies Direct",
  "National Grid",
  "FedEx France SAS",
  "Adobe Systems",
  "Sage Software",
] as const;

const descriptions = [
  "The invoice is posted.",
  "Data extraction complete. Review required.",
  "Awaiting supplier confirmation.",
  "Payment scheduled for next run.",
  "Duplicate check passed.",
  "Manual review requested.",
  "Posted to accounts payable.",
  "Outstanding balance remains.",
] as const;

const fileNames = [
  "00312026A10-invoice.pdf",
  "air-france-feb-2026.pdf",
  "sfr-monthly-march.pdf",
  "airbnb-receipt-4421.pdf",
  "bt-business-line-882.pdf",
  "aws-invoice-q1.pdf",
  "office-supplies-2201.pdf",
  "national-grid-utilities.pdf",
  "fedex-shipping-991.pdf",
  "adobe-creative-cloud.pdf",
] as const;

const statuses: PurchaseInvoiceStatus[] = [
  "overdue",
  "pending",
  "paid",
  "partially-overdue",
  "overdue",
  "pending",
  "paid",
  "partially-overdue",
];

/** Distribution tuned to match design badge counts: 17 / 25 / 0 / 8 paid in 50 */
const listCategories: PurchaseInvoiceListCategory[] = [
  ...Array<PurchaseInvoiceListCategory>(17).fill("requires-attention"),
  ...Array<PurchaseInvoiceListCategory>(25).fill("awaiting-payment"),
  ...Array<PurchaseInvoiceListCategory>(8).fill("paid"),
];

function buildPurchaseInvoice(index: number): PurchaseInvoice {
  const supplier = suppliers[index % suppliers.length];
  const status = statuses[index % statuses.length];
  const listCategory = listCategories[index % listCategories.length];
  const day = String((index % 28) + 1).padStart(2, "0");
  const month = String((index % 12) + 1).padStart(2, "0");
  const year = index % 5 === 0 ? "2025" : "2026";
  const importDate = `${year}-${month}-${day}`;
  const invoiceDay = String(((index + 3) % 28) + 1).padStart(2, "0");
  const invoiceDate = `${year}-${month}-${invoiceDay}`;
  const dueMonth = String(Math.min(12, Number(month) + 1)).padStart(2, "0");
  const totalGbp = Number((120 + index * 34.5 + (index % 7) * 18.25).toFixed(2));

  const outstandingAmountGbp =
    status === "paid"
      ? 0
      : status === "partially-overdue"
        ? Number((totalGbp * 0.45).toFixed(2))
        : totalGbp;

  return {
    id: `purchase-inv-${String(index + 1).padStart(3, "0")}`,
    importDate,
    fileName: fileNames[index % fileNames.length],
    status,
    listCategory,
    description: descriptions[index % descriptions.length],
    supplier,
    invoiceDate,
    invoiceNumber: index % 4 === 0 ? "N Test" : `ABC-${String(1000 + index)}`,
    totalGbp,
    outstandingAmountGbp,
    paymentDueDate: `${year}-${dueMonth}-${invoiceDay}`,
  };
}

export const purchaseInvoices: PurchaseInvoice[] = Array.from({ length: 50 }, (_, index) =>
  buildPurchaseInvoice(index),
);

export function getPurchaseInvoiceFilterCounts() {
  return {
    all: purchaseInvoices.length,
    requiresAttention: purchaseInvoices.filter(
      (item) => item.listCategory === "requires-attention",
    ).length,
    awaitingPayment: purchaseInvoices.filter(
      (item) => item.listCategory === "awaiting-payment",
    ).length,
    refused: purchaseInvoices.filter((item) => item.listCategory === "refused").length,
    paid: purchaseInvoices.filter((item) => item.listCategory === "paid").length,
  };
}

export type PurchaseType = "invoice" | "receipt";

export type PurchaseInvoiceVatRow = {
  id: string;
  taxRatePercent: number;
  taxableAmountGbp: number;
  vatAmountGbp: number;
  category: string;
};

export type PurchaseInvoiceDetail = {
  purchaseType: PurchaseType;
  supplierAddressLines: string[];
  supplierCityCountry: string;
  cashVat: boolean;
  totalPreviewPages: number;
  vatRows: PurchaseInvoiceVatRow[];
};

const supplierDetails: Record<
  (typeof suppliers)[number],
  { addressLines: string[]; cityCountry: string; category: string }
> = {
  "Air France": {
    addressLines: ["45 Rue de Paris", "Zone Aéroportuaire Roissy"],
    cityCountry: "Tremblay-en-France, France",
    category: "Travel",
  },
  SFR: {
    addressLines: ["16 Rue Léon Renault"],
    cityCountry: "Vincennes, France",
    category: "Telecoms",
  },
  Airbnb: {
    addressLines: ["8 Hanover Quay"],
    cityCountry: "Dublin, Ireland",
    category: "Travel",
  },
  "British Telecom": {
    addressLines: ["1 Braham Street"],
    cityCountry: "Paris, France",
    category: "Telecoms",
  },
  "Amazon Web Services": {
    addressLines: ["38 Avenue John F. Kennedy"],
    cityCountry: "Luxembourg City, Luxembourg",
    category: "Software",
  },
  "Office Supplies Direct": {
    addressLines: ["Unit 4, Brunswick Business Park"],
    cityCountry: "Lyon, France",
    category: "Office supplies",
  },
  "National Grid": {
    addressLines: ["1-3 Strand"],
    cityCountry: "Marseille, France",
    category: "Utilities",
  },
  "FedEx France SAS": {
    addressLines: ["Fedex House, Garston Lane"],
    cityCountry: "Lille, France",
    category: "Shipping",
  },
  "Adobe Systems": {
    addressLines: ["4-6 Riverwalk, Citywest Business Campus"],
    cityCountry: "Dublin, Ireland",
    category: "Software",
  },
  "Sage Software": {
    addressLines: ["North Park, Newcastle Business Park"],
    cityCountry: "Toulouse, France",
    category: "Software",
  },
};

const FRENCH_STANDARD_VAT_RATE = 0.2;

export function getPurchaseInvoiceDetail(invoice: PurchaseInvoice): PurchaseInvoiceDetail {
  const supplier = supplierDetails[invoice.supplier as (typeof suppliers)[number]];
  const taxableAmountGbp = Number((invoice.totalGbp / (1 + FRENCH_STANDARD_VAT_RATE)).toFixed(2));
  const vatAmountGbp = Number((invoice.totalGbp - taxableAmountGbp).toFixed(2));
  const invoiceIndex = purchaseInvoices.findIndex((item) => item.id === invoice.id);

  return {
    purchaseType: invoice.totalGbp <= 150 ? "receipt" : "invoice",
    supplierAddressLines: supplier.addressLines,
    supplierCityCountry: supplier.cityCountry,
    cashVat: false,
    totalPreviewPages: (invoiceIndex % 4) + 1,
    vatRows: [
      {
        id: `${invoice.id}-vat-1`,
        taxRatePercent: FRENCH_STANDARD_VAT_RATE * 100,
        taxableAmountGbp,
        vatAmountGbp,
        category: supplier.category,
      },
    ],
  };
}
