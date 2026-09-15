// MOCK DATA — replace with real API responses

export type FixedAssetTransaction = {
  id: string;
  fixedAssetId: string;
  /** ISO date string */
  date: string;
  transactionType: string;
  amountGbp: number;
  currentNetBookValueGbp: number;
  postJournalEntry: string;
};

export const fixedAssetTransactions: FixedAssetTransaction[] = [
  {
    id: "fat-001",
    fixedAssetId: "fa-001",
    date: "2025-03-04",
    transactionType: "Acquisition of new fixed asset",
    amountGbp: 507.0,
    currentNetBookValueGbp: 507.0,
    postJournalEntry: "",
  },
];
