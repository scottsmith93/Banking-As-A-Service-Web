// MOCK DATA — replace with real API responses

export type PurchaseReceiptStatus = "created" | "invoiced" | "returned";

export type PurchaseReceiptLineStatus = "created" | "invoiced" | "returned";

export type PurchaseReceiptLine = {
  id: string;
  status: PurchaseReceiptLineStatus;
  /** The purchase order this line was received against. */
  origin: string;
  itemName: string;
  itemId: string;
  quantityPurchaseUnit: number;
  grossPriceGbp: number;
  netPriceGbp: number;
  totalTaxGbp: number;
  totalIncludingTaxGbp: number;
};

export type PurchaseReceipt = {
  id: string;
  receiptId: string;
  supplier: string;
  /** ISO date string */
  receiptDate: string;
  receivingSite: string;
  totalIncludingTaxGbp: number;
  status: PurchaseReceiptStatus;
  lines: PurchaseReceiptLine[];
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

const receivingSites = ["London DC", "Manchester Hub", "Bristol Warehouse", "Leeds Depot"] as const;

const itemsBySupplier: Record<(typeof suppliers)[number], { name: string; id: string }[]> = {
  "Air France": [
    { name: "Business class ticket - London/Paris", id: "ITM-2001" },
    { name: "Excess baggage allowance", id: "ITM-2002" },
  ],
  SFR: [
    { name: "Business mobile plan - 20 lines", id: "ITM-2101" },
    { name: "Fibre broadband installation", id: "ITM-2102" },
  ],
  Airbnb: [
    { name: "Corporate housing - 2 week stay", id: "ITM-2201" },
    { name: "Turnover cleaning service", id: "ITM-2202" },
  ],
  "British Telecom": [
    { name: "Business broadband line", id: "ITM-2301" },
    { name: "VoIP handset", id: "ITM-2302" },
  ],
  "Amazon Web Services": [
    { name: "EC2 reserved instance - 1yr", id: "ITM-2401" },
    { name: "S3 storage capacity", id: "ITM-2402" },
  ],
  "Office Supplies Direct": [
    { name: "A4 copier paper - box of 5", id: "ITM-2501" },
    { name: "Toner cartridge - black", id: "ITM-2502" },
  ],
  "National Grid": [
    { name: "Electricity supply - quarterly", id: "ITM-2601" },
    { name: "Half-hourly metering service", id: "ITM-2602" },
  ],
  "FedEx France SAS": [
    { name: "Express freight - pallet", id: "ITM-2701" },
    { name: "Customs clearance service", id: "ITM-2702" },
  ],
  "Adobe Systems": [
    { name: "Creative Cloud licence - annual", id: "ITM-2801" },
    { name: "Acrobat Pro licence", id: "ITM-2802" },
  ],
  "Sage Software": [
    { name: "Sage 200 user licence", id: "ITM-2901" },
    { name: "Implementation support hours", id: "ITM-2902" },
  ],
};

/** Distribution across the receipt lifecycle: 22 / 20 / 8 in 50 */
const statuses: PurchaseReceiptStatus[] = [
  ...Array<PurchaseReceiptStatus>(22).fill("created"),
  ...Array<PurchaseReceiptStatus>(20).fill("invoiced"),
  ...Array<PurchaseReceiptStatus>(8).fill("returned"),
];

const RECEIPT_VAT_RATE = 0.2;

function buildLines(
  index: number,
  supplier: (typeof suppliers)[number],
  year: string,
  status: PurchaseReceiptStatus,
): PurchaseReceiptLine[] {
  const items = itemsBySupplier[supplier];
  const lineCount = (index % 3) + 1;
  const origin = `PO-${year}-${1000 + index}`;

  return Array.from({ length: lineCount }, (_, lineIndex) => {
    const quantityPurchaseUnit = 1 + ((index + lineIndex * 3) % 10);
    const grossPriceGbp = Number((45 + (index % 5) * 15 + lineIndex * 10).toFixed(2));
    // A small per-line discount on some lines, matching real receipts where
    // not every line gets one.
    const discount = lineIndex % 3 === 0 ? 0.05 : 0;
    const netPriceGbp = Number((grossPriceGbp * (1 - discount)).toFixed(2));
    const totalTaxGbp = Number((quantityPurchaseUnit * netPriceGbp * RECEIPT_VAT_RATE).toFixed(2));
    const totalIncludingTaxGbp = Number(
      (quantityPurchaseUnit * netPriceGbp + totalTaxGbp).toFixed(2),
    );
    const item = items[lineIndex % items.length];

    // Only fully-returned receipts show a returned line; otherwise a line
    // mirrors the receipt's own status.
    const lineStatus: PurchaseReceiptLineStatus =
      status === "returned" && lineIndex === 0 ? "returned" : status === "returned" ? "invoiced" : status;

    return {
      id: `purchase-receipt-${String(index + 1).padStart(3, "0")}-line-${lineIndex + 1}`,
      status: lineStatus,
      origin,
      itemName: item.name,
      itemId: item.id,
      quantityPurchaseUnit,
      grossPriceGbp,
      netPriceGbp,
      totalTaxGbp,
      totalIncludingTaxGbp,
    };
  });
}

function buildPurchaseReceipt(index: number): PurchaseReceipt {
  const supplier = suppliers[index % suppliers.length];
  const receivingSite = receivingSites[index % receivingSites.length];
  const status = statuses[index % statuses.length];
  const day = String((index % 28) + 1).padStart(2, "0");
  const month = String((index % 12) + 1).padStart(2, "0");
  const year = index % 5 === 0 ? "2025" : "2026";
  const receiptDate = `${year}-${month}-${day}`;

  const lines = buildLines(index, supplier, year, status);
  const totalIncludingTaxGbp = Number(
    lines.reduce((sum, line) => sum + line.totalIncludingTaxGbp, 0).toFixed(2),
  );

  return {
    id: `purchase-receipt-${String(index + 1).padStart(3, "0")}`,
    receiptId: `PR-${year}-${String(1000 + index)}`,
    supplier,
    receiptDate,
    receivingSite,
    totalIncludingTaxGbp,
    status,
    lines,
  };
}

export const purchaseReceipts: PurchaseReceipt[] = Array.from({ length: 50 }, (_, index) =>
  buildPurchaseReceipt(index),
);

export type CreatePurchaseReceiptLineInput = {
  /** The purchase order this line was received against, e.g. its orderId. */
  origin: string;
  itemName: string;
  itemId: string;
  quantityPurchaseUnit: number;
  grossPriceGbp: number;
  netPriceGbp: number;
};

export type CreatePurchaseReceiptInput = {
  supplier: string;
  receivingSite: string;
  /** ISO date string */
  receiptDate: string;
  lines: CreatePurchaseReceiptLineInput[];
};

/** Builds a new "created" receipt (e.g. from confirming a receive-goods side panel) and adds it to the in-memory list. */
export function createPurchaseReceipt(input: CreatePurchaseReceiptInput): PurchaseReceipt {
  const index = purchaseReceipts.length;
  const year = String(new Date(input.receiptDate).getFullYear());

  const lines: PurchaseReceiptLine[] = input.lines.map((line, lineIndex) => {
    const totalTaxGbp = Number(
      (line.quantityPurchaseUnit * line.netPriceGbp * RECEIPT_VAT_RATE).toFixed(2),
    );
    const totalIncludingTaxGbp = Number(
      (line.quantityPurchaseUnit * line.netPriceGbp + totalTaxGbp).toFixed(2),
    );

    return {
      id: `purchase-receipt-${String(index + 1).padStart(3, "0")}-line-${lineIndex + 1}`,
      status: "created",
      origin: line.origin,
      itemName: line.itemName,
      itemId: line.itemId,
      quantityPurchaseUnit: line.quantityPurchaseUnit,
      grossPriceGbp: line.grossPriceGbp,
      netPriceGbp: line.netPriceGbp,
      totalTaxGbp,
      totalIncludingTaxGbp,
    };
  });

  const totalIncludingTaxGbp = Number(
    lines.reduce((sum, line) => sum + line.totalIncludingTaxGbp, 0).toFixed(2),
  );

  const receipt: PurchaseReceipt = {
    id: `purchase-receipt-${String(index + 1).padStart(3, "0")}`,
    receiptId: `PR-${year}-${String(1000 + index)}`,
    supplier: input.supplier,
    receiptDate: input.receiptDate,
    receivingSite: input.receivingSite,
    totalIncludingTaxGbp,
    status: "created",
    lines,
  };

  purchaseReceipts.push(receipt);
  return receipt;
}

const STATUS_STEPS: PurchaseReceiptStatus[] = ["created", "invoiced", "returned"];

const STATUS_STEP_LABELS: Record<PurchaseReceiptStatus, string> = {
  created: "Create",
  invoiced: "Invoice",
  returned: "Return",
};

export function getReceiptStatusSteps(status: PurchaseReceiptStatus) {
  const currentIndex = STATUS_STEPS.indexOf(status);

  return STATUS_STEPS.map((step, index) => ({
    label: STATUS_STEP_LABELS[step],
    complete: index < currentIndex,
    current: index === currentIndex,
  }));
}

export function getReceiptTotals(receipt: PurchaseReceipt) {
  const netTotalGbp = receipt.lines.reduce(
    (sum, line) => sum + line.quantityPurchaseUnit * line.netPriceGbp,
    0,
  );
  const vatTotalGbp = receipt.lines.reduce((sum, line) => sum + line.totalTaxGbp, 0);

  return {
    netTotalGbp: Number(netTotalGbp.toFixed(2)),
    vatTotalGbp: Number(vatTotalGbp.toFixed(2)),
    grandTotalGbp: Number((netTotalGbp + vatTotalGbp).toFixed(2)),
  };
}

export type PurchaseReceiptTimelineEvent = {
  label: string;
  /** ISO date string */
  date: string;
};

export function getReceiptTimeline(receipt: PurchaseReceipt): PurchaseReceiptTimelineEvent[] {
  const events: PurchaseReceiptTimelineEvent[] = [
    { label: "Goods received", date: receipt.receiptDate },
  ];

  if (receipt.status === "invoiced" || receipt.status === "returned") {
    events.push({ label: "Invoice generated", date: receipt.receiptDate });
  }
  if (receipt.status === "returned") {
    events.push({ label: "Return processed", date: receipt.receiptDate });
  }

  return events;
}
