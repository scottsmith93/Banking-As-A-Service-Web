// MOCK DATA — replace with real bank connection, balance, and transaction API responses.
import type { BankTransaction } from "./bankingTransactions";

export const connectedBanks = [
  { id: "santander", name: "Santander", logo: "https://www.santander.com/content/dam/santander-com/resources/favicon/favicon-192x192.png", source: "https://www.santander.com/en/home" },
  { id: "credit-mutuel", name: "Crédit Mutuel", logo: "https://cdnsi.e-i.com/INGR/sd/cm_2015/61.130.4/fr/images/css/env/logo_mini.svg", source: "https://www.creditmutuel.fr/home/index.html" },
  { id: "barclays", name: "Barclays", logo: "https://home.barclays/content/dam/home-barclays/images/generic/barclays-eagle.svg", source: "https://home.barclays/" },
  { id: "bbva", name: "BBVA", logo: "https://www.bbva.com/wp-content/themes/coronita-bbvacom/assets/images/comun/favicon.ico", source: "https://www.bbva.com/en/" },
  { id: "caixa", name: "CaixaBank", logo: "https://www.caixabank.com/favicon.ico", source: "https://www.caixabank.com/en/home.html" },
] as const;
export type ConnectedBankAccount = {
  id: string; bankId: string; name: string; accountNumber: string; balanceEur: number; lastSyncedAt: string | null;
};
export const connectedBankAccounts: ConnectedBankAccount[] = [
  { id: "santander-current", bankId: "santander", name: "Business current", accountNumber: "•••• 4105", balanceEur: 16751.04, lastSyncedAt: "2026-10-23T08:50:00Z" },
  { id: "santander-reserve", bankId: "santander", name: "Tax reserve", accountNumber: "•••• 7945", balanceEur: 8240, lastSyncedAt: "2026-10-23T08:50:00Z" },
  { id: "credit-mutuel-current", bankId: "credit-mutuel", name: "Compte professionnel", accountNumber: "•••• 6321", balanceEur: 12860.5, lastSyncedAt: "2026-10-23T08:40:00Z" },
  { id: "barclays-operating", bankId: "barclays", name: "Business operating", accountNumber: "•••• 8294", balanceEur: 9420.6, lastSyncedAt: "2026-10-23T08:35:00Z" },
  { id: "bbva-trading", bankId: "bbva", name: "European trading", accountNumber: "•••• 2846", balanceEur: 18450.25, lastSyncedAt: "2026-10-23T08:30:00Z" },
  { id: "caixa-trading", bankId: "caixa", name: "Northstar — European trading account", accountNumber: "•••• 6789", balanceEur: 24580.4, lastSyncedAt: "2026-10-23T08:20:00Z" },
];

// Outstanding counts in the list are derived from these same rows, never hand-maintained badges.
const transactionSeeds: [string, string, number, BankTransaction["category"], string, BankTransaction["type"], BankTransaction["paymentMethod"]][] = [
  ["santander-current", "Metro Office Supplies", -138.6, "supplies", "2026-10-23", "cardPurchase", "card"],
  ["credit-mutuel-current", "Maison Dupont", 1860, "sales", "2026-10-22", "transfer", "bankTransfer"],
  ["barclays-operating", "British Telecom", -52.8, "utilities", "2026-10-23", "directDebit", "directDebit"],
  ["bbva-trading", "Origin Coffee", -97.5, "supplies", "2026-10-22", "transfer", "bankTransfer"],
  ["caixa-trading", "IKEA Bristol", -256.8, "equipment", "2026-10-21", "cardPurchase", "card"],
  ["santander-reserve", "Northstar Business Bank", 1200, "transfers", "2026-10-21", "transfer", "bankTransfer"],
  ["credit-mutuel-current", "Adobe Systems", -55.2, "software", "2026-10-20", "directDebit", "directDebit"],
  ["barclays-operating", "Origin Coffee", -96, "supplies", "2026-10-20", "transfer", "bankTransfer"],
  ["bbva-trading", "BBVA", -8, "fees", "2026-10-21", "fee", "bankTransfer"],
  ["caixa-trading", "Origin Coffee", 24, "refund", "2026-10-20", "refund", "card"],
];
export const connectedBankTransactions: BankTransaction[] = transactionSeeds.map(([accountId, merchant, amount, category, date, type, paymentMethod], index) => ({
  id: `connected-transaction-${index + 1}`, accountId, transactionId: `BANK-${date.replaceAll("-", "")}-${index + 1}`, reference: `NS-2026-${1200 + index}`,
  date, merchant, amount, currency: "EUR", category,
  type, paymentMethod, paymentStatus: "completed", cardholder: null, lastFour: null, network: null,
  invoiceRequired: amount < 0 && category !== "fees", invoiceId: null, location: null,
}));
