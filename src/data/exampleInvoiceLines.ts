// MOCK DATA — replace with real API responses

export type ExampleInvoiceLine = {
  id: string;
  description: string;
  quantity: number;
  /** Amount in EUR for one unit */
  unitAmountGbp: number;
};

/** Small sample list for demos — totals are consistent if you sum qty × unit. */
export const exampleInvoiceLines: ExampleInvoiceLine[] = [
  {
    id: "line-1",
    description: "Cloud subscription — Sage Business Cloud Accounting (Mar 2026)",
    quantity: 1,
    unitAmountGbp: 33.0,
  },
  {
    id: "line-2",
    description: "Payroll add-on (per payslip)",
    quantity: 12,
    unitAmountGbp: 1.25,
  },
  {
    id: "line-3",
    description: "Bank feeds connector — annual",
    quantity: 1,
    unitAmountGbp: 48.0,
  },
];
