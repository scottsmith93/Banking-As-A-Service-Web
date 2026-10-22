// MOCK DATA — replace with real bank connection, balance, and transaction API responses.
import type { BankTransaction } from "./bankingTransactions";

export const connectedBanks = [
  { id: "bnp", name: "BNP Paribas", logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/BNP_Paribas_logo.svg", source: "https://commons.wikimedia.org/wiki/File:BNP_Paribas_logo.svg" },
  { id: "caixa", name: "CaixaBank", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Logo_CaixaBank.svg", source: "https://commons.wikimedia.org/wiki/File:Logo_CaixaBank.svg" },
] as const;
export type ConnectedBankAccount = {
  id: string; bankId: string; name: string; accountNumber: string; balanceEur: number; lastSyncedAt: string | null;
};
export const connectedBankAccounts: ConnectedBankAccount[] = [
  { id: "bnp-current", bankId: "bnp", name: "Northstar — Business current account", accountNumber: "•••• 4105", balanceEur: 16751.04, lastSyncedAt: "2026-10-21T21:08:00Z" },
  { id: "bnp-reserve", bankId: "bnp", name: "Northstar — Tax reserve", accountNumber: "•••• 7945", balanceEur: 8240, lastSyncedAt: "2026-10-21T21:08:00Z" },
  { id: "caixa-trading", bankId: "caixa", name: "Northstar — European trading account", accountNumber: "•••• 6789", balanceEur: 24580.4, lastSyncedAt: "2026-10-21T20:45:00Z" },
];

// Outstanding counts in the list are derived from these same rows, never hand-maintained badges.
const transactionSeeds: [string, string, number, BankTransaction["category"]][] = [
  ["bnp-current", "Metro Office Supplies", -138.6, "supplies"],
  ["bnp-current", "British Telecom", -52.8, "utilities"],
  ["bnp-current", "Origin Coffee", -97.5, "supplies"],
  ["bnp-reserve", "Northstar Business Bank", 1200, "transfers"],
  ["caixa-trading", "IKEA Bristol", -256.8, "equipment"],
  ["caixa-trading", "Adobe Systems", -55.2, "software"],
];
export const connectedBankTransactions: BankTransaction[] = transactionSeeds.map(([accountId, merchant, amount, category], index) => ({
  id: `connected-transaction-${index + 1}`, accountId, transactionId: `BANK-20261021-${index + 1}`, reference: `NS-2026-${1200 + index}`,
  date: `2026-10-${String(20 - index).padStart(2, "0")}`, merchant, amount, currency: "EUR", category,
  type: "transfer", paymentMethod: "bankTransfer", paymentStatus: "completed", cardholder: null, lastFour: null, network: null,
  invoiceRequired: amount < 0, invoiceId: null, location: null,
}));
