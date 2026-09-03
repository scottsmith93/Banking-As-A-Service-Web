// MOCK DATA — replace with real API responses

export type BankAccountType = "connected" | "manual" | "cash";

export type BankAccount = {
  id: string;
  name: string;
  type: BankAccountType;
  /** Short account reference shown on connected cards (e.g. FR999). */
  accountNumber?: string;
  balanceEur: number;
  ledgerAccount: string;
  lastUpdated?: string;
  /** Connected bank feed logo (matches Sage Active cardView image column). */
  providerIconSrc?: string;
};

export const bankAccounts: BankAccount[] = [
  {
    id: "bank-001",
    name: "Anna's Bank",
    type: "connected",
    accountNumber: "FR999",
    balanceEur: 0,
    ledgerAccount: "51211000",
    lastUpdated: "10/01/2023",
    providerIconSrc: "/banking/sage-demo-bank-icon.svg",
  },
  {
    id: "bank-002",
    name: "Bank account111",
    type: "connected",
    balanceEur: 0,
    ledgerAccount: "51211000",
    lastUpdated: "",
    providerIconSrc: "/banking/sage-demo-bank-icon.svg",
  },
  {
    id: "bank-003",
    name: "CaixaBank",
    type: "connected",
    balanceEur: 0,
    ledgerAccount: "512000000",
    lastUpdated: "17/09/2025",
    providerIconSrc: "/banking/sage-demo-bank-icon.svg",
  },
  {
    id: "bank-004",
    name: "Bank account DEMO",
    type: "manual",
    balanceEur: 0,
    ledgerAccount: "51211000",
    lastUpdated: "",
  },
  {
    id: "bank-005",
    name: "Compte bancaire",
    type: "manual",
    accountNumber: "FR7612345678901234567890123",
    balanceEur: 0,
    ledgerAccount: "51211000",
    lastUpdated: "",
  },
  {
    id: "bank-006",
    name: "New fy26 Bank account",
    type: "manual",
    balanceEur: 0,
    ledgerAccount: "51211000",
    lastUpdated: "",
  },
  {
    id: "bank-007",
    name: "Cash",
    type: "cash",
    balanceEur: -2350.23,
    ledgerAccount: "53110000",
  },
];

/** Format balances to match Sage Active bank accounts listing (EUR). */
export function formatBankBalanceEur(amount: number): string {
  const formatted = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${formatted}\u00a0€`;
}
