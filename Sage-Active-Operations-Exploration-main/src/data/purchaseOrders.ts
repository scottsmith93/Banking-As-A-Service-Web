// MOCK DATA — replace with real API responses

export type PurchaseOrderStatus =
  | "awaiting-approval"
  | "approved"
  | "partially-received"
  | "received";

export type PurchaseOrderLineStatus = "available" | "backordered" | "received";

export type PurchaseOrderLine = {
  id: string;
  itemCode: string;
  designation: string;
  quantity: number;
  netPriceGbp: number;
  deliverySite: string;
  /** ISO date string */
  expectedDate: string;
  status: PurchaseOrderLineStatus;
};

export type PurchaseOrder = {
  id: string;
  orderId: string;
  supplier: string;
  /** ISO date string */
  orderDate: string;
  purchasingSite: string;
  totalIncludingTaxGbp: number;
  /** ISO date string */
  earliestExpectedDate: string;
  status: PurchaseOrderStatus;
  buyerReference: string;
  lines: PurchaseOrderLine[];
};

const suppliers = [
  "Air France",
  "SFR",
  "Airbnb",
  "British Telecom",
  "Amazon Web Services",
  "Office Supplies Direct",
  "National Grid",
  "FedEx UK",
  "Adobe Systems",
  "Sage Software",
] as const;

const purchasingSites = [
  "London DC",
  "Manchester Hub",
  "Bristol Warehouse",
  "Leeds Depot",
] as const;

const lineDesignationsBySupplier: Record<(typeof suppliers)[number], string[]> = {
  "Air France": ["Business class ticket - London/Paris", "Excess baggage allowance"],
  SFR: ["Business mobile plan - 20 lines", "Fibre broadband installation"],
  Airbnb: ["Corporate housing - 2 week stay", "Turnover cleaning service"],
  "British Telecom": ["Business broadband line", "VoIP handset"],
  "Amazon Web Services": ["EC2 reserved instance - 1yr", "S3 storage capacity"],
  "Office Supplies Direct": ["A4 copier paper - box of 5", "Toner cartridge - black"],
  "National Grid": ["Electricity supply - quarterly", "Half-hourly metering service"],
  "FedEx UK": ["Express freight - pallet", "Customs clearance service"],
  "Adobe Systems": ["Creative Cloud licence - annual", "Acrobat Pro licence"],
  "Sage Software": ["Sage 200 user licence", "Implementation support hours"],
};

/** Distribution across the order lifecycle: 9 / 14 / 6 / 21 in 50 */
const statuses: PurchaseOrderStatus[] = [
  ...Array<PurchaseOrderStatus>(9).fill("awaiting-approval"),
  ...Array<PurchaseOrderStatus>(14).fill("approved"),
  ...Array<PurchaseOrderStatus>(6).fill("partially-received"),
  ...Array<PurchaseOrderStatus>(21).fill("received"),
];

function buildLineStatus(
  orderStatus: PurchaseOrderStatus,
  lineIndex: number,
): PurchaseOrderLineStatus {
  if (orderStatus === "received") return "received";
  if (orderStatus === "partially-received") return lineIndex === 0 ? "received" : "available";
  return "available";
}

function buildLines(
  index: number,
  supplier: (typeof suppliers)[number],
  purchasingSite: string,
  earliestExpectedDate: string,
  status: PurchaseOrderStatus,
): PurchaseOrderLine[] {
  const designations = lineDesignationsBySupplier[supplier];
  const lineCount = (index % 3) + 1;

  return Array.from({ length: lineCount }, (_, lineIndex) => {
    const quantity = 1 + ((index + lineIndex * 3) % 10);
    const netPriceGbp = Number((40 + (index % 5) * 15 + lineIndex * 10).toFixed(2));

    return {
      id: `purchase-order-${String(index + 1).padStart(3, "0")}-line-${lineIndex + 1}`,
      itemCode: `ITM-${1000 + index * 10 + lineIndex}`,
      designation: designations[lineIndex % designations.length],
      quantity,
      netPriceGbp,
      deliverySite: purchasingSite,
      expectedDate: earliestExpectedDate,
      status: buildLineStatus(status, lineIndex),
    };
  });
}

const UK_VAT_RATE = 0.2;

export function getLineAmountWithVat(line: PurchaseOrderLine) {
  return Number((line.quantity * line.netPriceGbp * (1 + UK_VAT_RATE)).toFixed(2));
}

export function getOrderTotals(order: PurchaseOrder) {
  const netTotalGbp = order.lines.reduce(
    (sum, line) => sum + line.quantity * line.netPriceGbp,
    0,
  );
  const vatTotalGbp = netTotalGbp * UK_VAT_RATE;

  return {
    netTotalGbp: Number(netTotalGbp.toFixed(2)),
    vatTotalGbp: Number(vatTotalGbp.toFixed(2)),
    grandTotalGbp: Number((netTotalGbp + vatTotalGbp).toFixed(2)),
  };
}

function buildPurchaseOrder(index: number): PurchaseOrder {
  const supplier = suppliers[index % suppliers.length];
  const purchasingSite = purchasingSites[index % purchasingSites.length];
  const status = statuses[index % statuses.length];
  const day = String((index % 28) + 1).padStart(2, "0");
  const month = String((index % 12) + 1).padStart(2, "0");
  const year = index % 5 === 0 ? "2025" : "2026";
  const orderDate = `${year}-${month}-${day}`;
  const expectedDay = String(((index + 10) % 28) + 1).padStart(2, "0");
  const expectedMonth = String(Math.min(12, Number(month) + 1)).padStart(2, "0");
  const earliestExpectedDate = `${year}-${expectedMonth}-${expectedDay}`;

  const lines = buildLines(index, supplier, purchasingSite, earliestExpectedDate, status);
  const netTotalGbp = lines.reduce((sum, line) => sum + line.quantity * line.netPriceGbp, 0);
  const totalIncludingTaxGbp = Number((netTotalGbp * (1 + UK_VAT_RATE)).toFixed(2));

  return {
    id: `purchase-order-${String(index + 1).padStart(3, "0")}`,
    orderId: `PO-${year}-${String(1000 + index)}`,
    supplier,
    orderDate,
    purchasingSite,
    totalIncludingTaxGbp,
    earliestExpectedDate,
    status,
    buyerReference: `REQ-${year}-${String(4000 + index)}`,
    lines,
  };
}

export const purchaseOrders: PurchaseOrder[] = Array.from({ length: 50 }, (_, index) =>
  buildPurchaseOrder(index),
);

export type CreatePurchaseOrderInput = {
  supplier: string;
  purchasingSite: string;
  /** ISO date string */
  orderDate: string;
  /** ISO date string */
  earliestExpectedDate: string;
  lines: { itemCode: string; designation: string; quantity: number; netPriceGbp: number }[];
};

/** Builds a new "awaiting approval" order from a create-flow submission and adds it to the in-memory list. */
export function createPurchaseOrder(input: CreatePurchaseOrderInput): PurchaseOrder {
  const index = purchaseOrders.length;
  const year = String(new Date(input.orderDate).getFullYear());

  const lines: PurchaseOrderLine[] = input.lines.map((line, lineIndex) => ({
    id: `purchase-order-${String(index + 1).padStart(3, "0")}-line-${lineIndex + 1}`,
    itemCode: line.itemCode,
    designation: line.designation,
    quantity: line.quantity,
    netPriceGbp: line.netPriceGbp,
    deliverySite: input.purchasingSite,
    expectedDate: input.earliestExpectedDate,
    status: "available",
  }));

  const netTotalGbp = lines.reduce((sum, line) => sum + line.quantity * line.netPriceGbp, 0);
  const totalIncludingTaxGbp = Number((netTotalGbp * (1 + UK_VAT_RATE)).toFixed(2));

  const order: PurchaseOrder = {
    id: `purchase-order-${String(index + 1).padStart(3, "0")}`,
    orderId: `PO-${year}-${String(1000 + index)}`,
    supplier: input.supplier,
    orderDate: input.orderDate,
    purchasingSite: input.purchasingSite,
    totalIncludingTaxGbp,
    earliestExpectedDate: input.earliestExpectedDate,
    status: "awaiting-approval",
    buyerReference: `REQ-${year}-${String(4000 + index)}`,
    lines,
  };

  purchaseOrders.push(order);
  return order;
}

const STATUS_STEPS: PurchaseOrderStatus[] = [
  "awaiting-approval",
  "approved",
  "partially-received",
  "received",
];

const STATUS_STEP_LABELS: Record<PurchaseOrderStatus, string> = {
  "awaiting-approval": "Awaiting approval",
  approved: "Approved",
  "partially-received": "Partially received",
  received: "Received",
};

export function getOrderStatusSteps(status: PurchaseOrderStatus) {
  const currentIndex = STATUS_STEPS.indexOf(status);

  return STATUS_STEPS.map((step, index) => ({
    label: STATUS_STEP_LABELS[step],
    complete: index < currentIndex,
    current: index === currentIndex,
  }));
}

export type PurchaseOrderTimelineEvent = {
  label: string;
  /** ISO date string */
  date: string;
};

export function getOrderTimeline(order: PurchaseOrder): PurchaseOrderTimelineEvent[] {
  const events: PurchaseOrderTimelineEvent[] = [
    { label: "Order created", date: order.orderDate },
    { label: "Submitted for approval", date: order.orderDate },
  ];

  if (order.status !== "awaiting-approval") {
    events.push({ label: "Approved", date: order.orderDate });
  }
  if (order.status === "partially-received" || order.status === "received") {
    events.push({ label: "Partially received", date: order.earliestExpectedDate });
  }
  if (order.status === "received") {
    events.push({ label: "Fully received", date: order.earliestExpectedDate });
  }

  return events;
}
