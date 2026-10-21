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

export type DebitCardStatus = "issued" | "deactivated";

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
  network: "visa" | "mastercard";
};

export type BaaSTransaction = {
  id: string;
  date: string;
  description: string;
  cardholder: string;
  cardNetwork?: "visa" | "mastercard";
  type: string;
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
    network: "visa",
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
    network: "visa",
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
    network: "visa",
  },
];

// PROTOTYPE: option values represent the API-provided restrictions currently shown in the card-issuing UI.
export const cardIssueRegionOptions = ["France", "Germany", "Ireland", "Spain", "United Kingdom"];
export const cardIssueCategoryOptions = [
  "Gambling",
  "Cash advances",
  "Money transfers",
  "Securities / investments",
  "Pawn shops",
  "Adult entertainment",
  "Alcohol",
  "Tobacco",
  "Lottery",
];

export const baasTransactions: BaaSTransaction[] = [
  {
    id: "transaction-001",
    date: "20 Oct 2026",
    description: "Office supplies — invoice PI-10482",
    cardholder: "Jamie Taylor •••• 1234",
    cardNetwork: "visa",
    type: "Card purchase",
    status: "completed",
    amountEur: -45.3,
  },
  {
    id: "transaction-002",
    date: "19 Oct 2026",
    description: "Online subscription — invoice PI-10479",
    cardholder: "Morgan Hughes •••• 7781",
    cardNetwork: "mastercard",
    type: "Card purchase",
    status: "failed",
    amountEur: -55.2,
  },
  {
    id: "transaction-003",
    date: "18 Oct 2026",
    description: "Customer refund",
    cardholder: "Alex Morgan •••• 4608",
    cardNetwork: "visa",
    type: "Refund",
    status: "completed",
    amountEur: 135.5,
  },
  {
    id: "transaction-004",
    date: "17 Oct 2026",
    description: "Transfer from Northstar Business Bank",
    cardholder: "—",
    type: "Transfer",
    status: "cancelled",
    amountEur: 7040.4,
  },
  {
    id: "transaction-005",
    date: "16 Oct 2026",
    description: "Equipment purchase — invoice PI-10471",
    cardholder: "Jamie Taylor •••• 1234",
    cardNetwork: "mastercard",
    type: "Card purchase",
    status: "completed",
    amountEur: -860.6,
  },
];
