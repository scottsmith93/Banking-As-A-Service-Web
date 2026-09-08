// MOCK DATA — replace with real API responses

export type OrderStatus = "pending" | "closed";

export type SalesOrder = {
  id: string;
  status: OrderStatus;
  /** ISO date string */
  orderDate: string;
  orderNumber: string;
  reference: string;
  customerCode: string;
  customerName: string;
  totalGbp: number;
  taxableAmountGbp: number;
};

const customers = [
  { code: "001", name: "Anna Marti" },
  { code: "AMAZON", name: "Amazon France SAS" },
  { code: "C0001", name: "Almacenes Central Ltd" },
  { code: "ABCPORTAGE", name: "ABC Portage Services" },
  { code: "BHCAPITAL", name: "BH Capital Partners" },
  { code: "C02", name: "Cedar & Co. Chartered Accountants" },
  { code: "C03", name: "Willowbrook Veterinary Practice" },
  { code: "C04", name: "Harbour Lane Property Management" },
] as const;

const references = [
  "REF1245",
  "PO-8821",
  "SO-4410",
  "",
  "WK-3304",
  "APR-2201",
  "RET-8821",
  "PROJ-5540",
] as const;

const statuses: OrderStatus[] = [
  "pending",
  "closed",
  "pending",
  "closed",
  "pending",
  "closed",
  "pending",
  "closed",
];

function buildOrder(index: number): SalesOrder {
  const customer = customers[index % customers.length];
  const status = statuses[index % statuses.length];
  const year = index % 3 === 0 ? "2025" : "2026";
  const orderNumber = `${year}/${String(index + 1).padStart(6, "0")}`;
  const day = String((index % 28) + 1).padStart(2, "0");
  const month = String((index % 12) + 1).padStart(2, "0");

  const totalGbp = Number((2339.5 - index * 127.35 + (index % 4) * 89.2).toFixed(2));
  const taxableAmountGbp = Number((totalGbp / 1.2).toFixed(2));

  return {
    id: `order-${orderNumber.replace("/", "-")}`,
    status,
    orderDate: `${year}-${month}-${day}`,
    orderNumber,
    reference: references[index % references.length],
    customerCode: customer.code,
    customerName: customer.name,
    totalGbp,
    taxableAmountGbp,
  };
}

export const salesOrders: SalesOrder[] = Array.from({ length: 16 }, (_, index) =>
  buildOrder(index),
);
