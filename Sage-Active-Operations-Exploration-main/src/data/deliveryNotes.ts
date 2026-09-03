// MOCK DATA — replace with real API responses

export type DeliveryNoteStatus = "pending" | "closed";

export type DeliveryNote = {
  id: string;
  status: DeliveryNoteStatus;
  /** ISO date string */
  deliveryNoteDate: string;
  deliveryNoteNumber: string;
  reference: string;
  customerCode: string;
  customerName: string;
  totalGbp: number;
  taxableAmountGbp: number;
};

const customers = [
  { code: "AMAZON", name: "Amazon UK Services Ltd" },
  { code: "ABCPORTAGE", name: "ABC Portage Services" },
  { code: "COD01", name: "Almacenes la Central" },
  { code: "C01", name: "Northbridge Office Supplies Ltd" },
  { code: "C02", name: "Cedar & Co. Chartered Accountants" },
  { code: "BHCAPITAL", name: "BH Capital Partners" },
  { code: "C03", name: "Willowbrook Veterinary Practice" },
] as const;

const statuses: DeliveryNoteStatus[] = [
  "pending",
  "closed",
  "pending",
  "closed",
  "pending",
  "closed",
  "pending",
];

function buildDeliveryNote(index: number): DeliveryNote {
  const customer = customers[index % customers.length];
  const status = statuses[index % statuses.length];
  const deliveryNoteNumber = String(7 - index).padStart(4, "0");
  const day = String(28 - index).padStart(2, "0");
  const month = "05";
  const year = "2025";

  const totalGbp = Number((12360 - index * 1840.5).toFixed(2));
  const taxableAmountGbp = Number((totalGbp / 1.2).toFixed(2));

  return {
    id: `dn-${deliveryNoteNumber}`,
    status,
    deliveryNoteDate: `${year}-${month}-${day}`,
    deliveryNoteNumber,
    reference: index % 3 === 0 ? `DN-REF-${deliveryNoteNumber}` : "",
    customerCode: customer.code,
    customerName: customer.name,
    totalGbp,
    taxableAmountGbp,
  };
}

export const deliveryNotes: DeliveryNote[] = Array.from({ length: 7 }, (_, index) =>
  buildDeliveryNote(index),
);
