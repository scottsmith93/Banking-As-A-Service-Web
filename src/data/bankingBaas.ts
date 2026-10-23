// MOCK DATA — replace with real API responses

export type BaaSAccountStatus = "pending" | "active";

export const baasBusinessProfile = {
  businessName: "Northstar Cycle & Coffee Ltd",
  businessOwner: "Jamie Taylor",
  ownerEmail: "jamie.taylor@northstarcyclecoffee.co.uk",
  entityType: "organization",
} as const;

export const baasOnboardingDemoAnswers = {
  formFields: {
    "baas-form-1-0": "Northstar Cycle & Coffee Ltd",
    "baas-form-1-1": "Northstar Cycles",
    "baas-form-1-2": "09482716",
    "baas-form-1-3": "United Kingdom",
    "baas-form-1-4-year": "2019",
    "baas-form-1-4-month": "06",
    "baas-form-1-4-day": "14",
    "baas-form-1-6": "jamie.taylor@northstarcyclecoffee.co.uk",
    "baas-form-1-7": "+44 20 7946 0182",
    "baas-form-1-9": "18 Market Street",
    "baas-form-1-10": "Unit 4",
    "baas-form-1-11": "Bristol",
    "baas-form-1-12": "Bristol",
    "baas-form-1-13": "BS1 4QA",
    "baas-form-1-14": "United Kingdom",
    "baas-form-1-15": "true",
    "baas-form-2-0": "United Kingdom",
    "baas-form-2-1": "Company Registration Number",
    "baas-form-2-2": "09482716",
    "baas-form-2-3": "Yes",
    "baas-form-2-4": "GB381492573",
    "baas-form-3-0": "Bicycle retailer and café",
    "baas-form-3-1": "5940 — Bicycle shops",
    "baas-form-3-2": "Retail store and online shop",
    "baas-form-3-3": "https://northstarcyclecoffee.co.uk",
    "baas-form-4-0": "Revenue from trading",
    "baas-form-4-1": "€180,000 per year",
    "baas-form-4-2": "Revenue from bicycle sales, repairs, coffee and online orders.",
    "baas-form-5-1": "Jamie Taylor",
    "baas-form-5-2": "Director and majority owner",
    "baas-form-6-2": "Open Banking account connection",
    "baas-form-6-3": "IBAN ending 8842; recent statement attached",
    "baas-form-6-7": "Certificate of incorporation",
  },
  reviewSections: [
    ["Organization"],
    [
      "Northstar Cycle & Coffee Ltd",
      "Northstar Cycles",
      "09482716",
      "United Kingdom",
      "14 Jun 2019",
      "jamie.taylor@northstarcyclecoffee.co.uk",
      "+44 20 7946 0182",
      null,
      "18 Market Street",
      "Unit 4",
      "Bristol",
      "Bristol",
      "BS1 4QA",
      "United Kingdom",
    ],
    ["United Kingdom", "Company Registration Number", "09482716", "Yes", "GB381492573"],
    ["Bicycle retailer and café", "5940 — Bicycle shops", "Retail store and online shop", "https://northstarcyclecoffee.co.uk"],
    ["Revenue from trading", "€180,000 per year", "Revenue from bicycle sales, repairs, coffee and online orders."],
    ["Jamie Taylor", "Director and majority owner", "Morgan Hughes", "Director and 30% shareholder"],
    ["Jamie_Taylor_Passport.pdf", "Northstar_Certificate_of_Incorporation.pdf"],
  ],
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

// PROTOTYPE: option values represent the API-provided restrictions currently shown in the card-issuing UI.
export const cardIssueRegionOptions = ["France", "Germany", "Ireland", "Spain", "United Kingdom"];
export const cardIssueShippingCountries = ["BE", "FR", "DE", "IE", "IT", "NL", "PT", "ES", "GB"] as const;
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
