import type { QuoteLineItem } from "../data/salesQuoteForm";

const FRENCH_STANDARD_VAT_RATE = 0.2;

export type QuoteTotals = {
  taxableAmountGbp: number;
  vatAmountGbp: number;
  totalGbp: number;
};

export function calculateQuoteTotals(lineItems: QuoteLineItem[]): QuoteTotals {
  const taxableAmountGbp = lineItems.reduce((sum, item) => {
    const lineTotal =
      item.quantity * item.unitPriceGbp * (1 - item.discountPercent / 100);
    return sum + lineTotal;
  }, 0);

  const vatAmountGbp = taxableAmountGbp * FRENCH_STANDARD_VAT_RATE;
  const totalGbp = taxableAmountGbp + vatAmountGbp;

  return { taxableAmountGbp, vatAmountGbp, totalGbp };
}
