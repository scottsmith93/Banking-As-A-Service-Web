// MOCK DATA — replace with the card-spend API, not the bounded recent-transaction sample.
// Current card.monthlySpendEur values cover 1–23 October 2026; previous amounts
// cover 1–23 September, so month-to-date comparisons use equal elapsed periods.
export const cardSpendAccountId = "sage-operating-account";
export const cardSpendSnapshots: Record<string, { transactionCount: number; topMerchant: string; previousPeriodSpendEur: number }> = {
  "card-jamie": { transactionCount: 8, topMerchant: "Metro Office Supplies", previousPeriodSpendEur: 2185.08 },
  "card-jamie-travel": { transactionCount: 0, topMerchant: "—", previousPeriodSpendEur: 90 },
  "card-morgan": { transactionCount: 7, topMerchant: "Adobe", previousPeriodSpendEur: 1450 },
  "card-alex": { transactionCount: 5, topMerchant: "IKEA", previousPeriodSpendEur: 800 },
};
