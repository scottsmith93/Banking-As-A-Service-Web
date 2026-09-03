// MOCK DATA — replace with real API responses

export const invoiceDocumentPrefixOptions = [
  { text: "INV", value: "inv" },
  { text: "CN", value: "cn" },
  { text: "N/A", value: "na" },
] as const;

export type InvoiceLineItem = {
  id: string;
  productOrServiceId: string;
  quantity: number;
  unitPriceGbp: number;
  discountPercent: number;
  vatPercent: number;
};

export const paymentTerms = [
  {
    label: "1st due date",
    text: "[X %] payable by [Payment method]. Due on the next payment date more than [X] days after the invoice date.",
  },
  {
    label: "2nd due date",
    text: "[X %] payable by [Payment method]. Due on the next payment date more than [X] days after the invoice date.",
  },
];

export const defaultIntroductoryNotes = [
  "Pas d’escompte accordé pour paiement anticipé.",
  "En cas de non-paiement à la date d’échéance des pénalités calculées à trois fois le taux d’intérêt légal seront appliquées.",
  "Tout retard de paiement entraînera une indemnité forfaitaire pour frais de recouvrement de 40€.",
];

export const defaultFinalInvoiceNotes = [
  "Thank you for your business. For any question regarding this invoice, please contact us at contact@company.com",
  "[customer specific extra conditions]",
];
