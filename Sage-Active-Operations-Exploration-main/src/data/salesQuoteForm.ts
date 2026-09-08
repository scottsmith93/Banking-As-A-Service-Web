// MOCK DATA — replace with real API responses

export const quotePrefixOptions = [
  { text: "N/A", value: "na" },
  { text: "TOP", value: "top" },
  { text: "QTE", value: "qte" },
  { text: "EST", value: "est" },
] as const;

export const quoteCountryOptions = [
  { text: "FR - France", value: "GB" },
  { text: "FR - FR", value: "FR" },
  { text: "IE - IE", value: "IE" },
] as const;

export type QuoteLineItem = {
  id: string;
  productOrService: string;
  description: string;
  quantity: number;
  unitPriceGbp: number;
  discountPercent: number;
};
