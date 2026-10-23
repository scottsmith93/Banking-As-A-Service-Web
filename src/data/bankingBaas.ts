// MOCK DATA — replace with real API responses

export type BaaSAccountStatus = "pending" | "active";

export const baasBusinessProfile = {
  businessName: "Northstar Cycle & Coffee Ltd",
  businessOwner: "Jamie Taylor",
  ownerEmail: "jamie.taylor@northstarcyclecoffee.co.uk",
  entityType: "organization",
} as const;

export type BaaSAccount = {
  id: string;
  name: string;
  status: BaaSAccountStatus;
  accountEnding: string;
  balanceEur: number;
  monthlyInEur: number;
  monthlyOutEur: number;
  pendingEur: number;
};

export type LegacyBankAccount = {
  id: string;
  name: string;
  accountNumber: string;
  ledgerAccount: string;
  balanceEur: number;
  lastUpdated: string;
  kind: "bank" | "cash";
};

export type DebitCardStatus = "issued" | "ordered" | "deactivated";

export type DebitCard = {
  id: string;
  cardholder: string;
  lastFour: string;
  status: DebitCardStatus;
  monthlySpendEur: number;
  validThrough: string;
  colour: "sage" | "night" | "plum";
  nickname: string;
  type: "virtual" | "physical";
  // Sage Wallet issues Mastercard only.
  network: "mastercard";
};

export type BaaSTransaction = {
  id: string;
  date: string;
  description: string;
  cardholder: string;
  cardNetwork?: "mastercard";
  type: "cardPurchase" | "refund" | "transfer";
  invoiceId: string | null;
  status: "completed" | "failed" | "cancelled";
  amountEur: number;
};

export const legacyBankAccounts: LegacyBankAccount[] = [
  {
    id: "legacy-business-account",
    name: "Northstar Business Bank",
    accountNumber: "ES7921000813610123456789",
    ledgerAccount: "57200000",
    balanceEur: 24580.4,
    lastUpdated: "20 Oct 2026, 12:45",
    kind: "bank",
  },
  {
    id: "legacy-cash-account",
    name: "Petty cash",
    accountNumber: "",
    ledgerAccount: "57000000",
    balanceEur: 1240,
    lastUpdated: "20 Oct 2026",
    kind: "cash",
  },
];

export const stagedBaasAccounts: BaaSAccount[] = [
  {
    id: "sage-operating-account",
    name: "Sage business account",
    status: "active",
    accountEnding: "8842",
    balanceEur: 100000,
    monthlyInEur: 18240,
    monthlyOutEur: 12480,
    pendingEur: 860,
  },
  {
    id: "sage-card-account",
    name: "Sage card account",
    status: "pending",
    accountEnding: "2197",
    balanceEur: 0,
    monthlyInEur: 0,
    monthlyOutEur: 0,
    pendingEur: 0,
  },
];

export const debitCards: DebitCard[] = [
  {
    id: "card-jamie",
    cardholder: "Jamie Taylor",
    lastFour: "1234",
    status: "issued",
    monthlySpendEur: 2840.6,
    validThrough: "09/29",
    colour: "sage",
    nickname: "Everyday spending",
    type: "virtual",
    network: "mastercard",
  },
  {
    id: "card-jamie-travel",
    cardholder: "Jamie Taylor",
    lastFour: "6048",
    status: "issued",
    monthlySpendEur: 0,
    validThrough: "10/29",
    colour: "night",
    nickname: "Travel expenses",
    type: "physical",
    network: "mastercard",
  },
  {
    id: "card-morgan",
    cardholder: "Morgan Hughes",
    lastFour: "7781",
    status: "issued",
    monthlySpendEur: 1320.45,
    validThrough: "03/30",
    colour: "night",
    nickname: "Team expenses",
    type: "virtual",
    network: "mastercard",
  },
  {
    id: "card-alex",
    cardholder: "Alex Morgan",
    lastFour: "4608",
    status: "issued",
    monthlySpendEur: 944.2,
    validThrough: "11/29",
    colour: "plum",
    nickname: "Studio supplies",
    type: "physical",
    network: "mastercard",
  },
  {
    id: "card-sam",
    cardholder: "Sam Carter",
    lastFour: "9912",
    status: "deactivated",
    monthlySpendEur: 0,
    validThrough: "06/28",
    colour: "night",
    nickname: "Former team card",
    type: "physical",
    network: "mastercard",
  },
];

// Countries a physical card can be posted to.
export const cardIssueShippingCountries = ["BE", "FR", "DE", "IE", "IT", "NL", "PT", "ES", "GB"] as const;

export const baasTransactions: BaaSTransaction[] = [
  {
    id: "transaction-001",
    invoiceId: "PI-10482",
    date: "2026-10-20",
    description: "Office supplies — invoice PI-10482",
    cardholder: "Jamie Taylor •••• 1234",
    cardNetwork: "mastercard",
    type: "cardPurchase",
    status: "completed",
    amountEur: -45.3,
  },
  {
    id: "transaction-002",
    invoiceId: null,
    date: "2026-10-19",
    description: "Online subscription",
    cardholder: "Morgan Hughes •••• 7781",
    cardNetwork: "mastercard",
    type: "cardPurchase",
    status: "failed",
    amountEur: -55.2,
  },
  {
    id: "transaction-003",
    invoiceId: "CN-10316",
    date: "2026-10-18",
    description: "Customer refund",
    cardholder: "Alex Morgan •••• 4608",
    cardNetwork: "mastercard",
    type: "refund",
    status: "completed",
    amountEur: 135.5,
  },
  {
    id: "transaction-004",
    invoiceId: null,
    date: "2026-10-17",
    description: "Transfer from Northstar Business Bank",
    cardholder: "—",
    type: "transfer",
    status: "cancelled",
    amountEur: 7040.4,
  },
  {
    id: "transaction-005",
    invoiceId: null,
    date: "2026-10-16",
    description: "Equipment purchase",
    cardholder: "Jamie Taylor •••• 1234",
    cardNetwork: "mastercard",
    type: "cardPurchase",
    status: "completed",
    amountEur: -860.6,
  },
];

// MOCK DATA — monthly activity summaries, separate from the five recent transactions.
export const baasCardholderActivity: Record<string, { transactionCount: number; topMerchant: string }> = {
  "Jamie Taylor": { transactionCount: 8, topMerchant: "Metro Office Supplies" },
  "Morgan Hughes": { transactionCount: 7, topMerchant: "Adobe" },
  "Alex Morgan": { transactionCount: 5, topMerchant: "IKEA" },
};
