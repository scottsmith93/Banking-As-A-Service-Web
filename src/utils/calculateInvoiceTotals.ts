import type { InvoiceLineItem } from "../data/invoiceCreateForm";

export type InvoiceVatBreakdownRow = {
  vatPercent: number;
  taxableAmountGbp: number;
  vatAmountGbp: number;
};

export type InvoiceSummary = {
  totalBeforeProductDiscount: number;
  totalProductDiscount: number;
  totalBeforeCustomerDiscount: number;
  customerDiscountAmount: number;
  taxableAmountGbp: number;
  vatAmountGbp: number;
  totalGbp: number;
  vatBreakdown: InvoiceVatBreakdownRow[];
};

export function calculateLineTaxableAmount(
  item: Pick<InvoiceLineItem, "quantity" | "unitPriceGbp" | "discountPercent">,
): number {
  return item.quantity * item.unitPriceGbp * (1 - item.discountPercent / 100);
}

export function calculateInvoiceSummary(
  lineItems: InvoiceLineItem[],
  customerDiscountPercent: number,
): InvoiceSummary {
  const totalBeforeProductDiscount = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPriceGbp,
    0,
  );
  const totalProductDiscount = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPriceGbp * (item.discountPercent / 100),
    0,
  );
  const totalBeforeCustomerDiscount = totalBeforeProductDiscount - totalProductDiscount;
  const customerDiscountAmount = totalBeforeCustomerDiscount * (customerDiscountPercent / 100);
  const taxableAmountGbp = totalBeforeCustomerDiscount - customerDiscountAmount;
  const customerDiscountFactor = 1 - customerDiscountPercent / 100;

  const vatByRate = new Map<number, { taxableAmountGbp: number; vatAmountGbp: number }>();
  let vatAmountGbp = 0;

  lineItems.forEach((item) => {
    const lineTaxableAmount = calculateLineTaxableAmount(item) * customerDiscountFactor;
    const lineVatAmount = lineTaxableAmount * (item.vatPercent / 100);
    vatAmountGbp += lineVatAmount;

    const existing = vatByRate.get(item.vatPercent) ?? { taxableAmountGbp: 0, vatAmountGbp: 0 };
    vatByRate.set(item.vatPercent, {
      taxableAmountGbp: existing.taxableAmountGbp + lineTaxableAmount,
      vatAmountGbp: existing.vatAmountGbp + lineVatAmount,
    });
  });

  const vatBreakdown = Array.from(vatByRate.entries())
    .map(([vatPercent, totals]) => ({ vatPercent, ...totals }))
    .sort((a, b) => b.vatPercent - a.vatPercent);

  return {
    totalBeforeProductDiscount,
    totalProductDiscount,
    totalBeforeCustomerDiscount,
    customerDiscountAmount,
    taxableAmountGbp,
    vatAmountGbp,
    totalGbp: taxableAmountGbp + vatAmountGbp,
    vatBreakdown,
  };
}
