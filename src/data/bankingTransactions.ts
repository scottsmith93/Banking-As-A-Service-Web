// MOCK DATA — replace with real API responses. EUR invoice records represent the purchase-invoice search API.
import { connectedBankTransactions } from "./bankAccountConnections";
export type PaymentStatus = "completed" | "pending" | "failed" | "cancelled" | "disputed";
export type PaymentMethod = "applePay" | "googlePay" | "card" | "bankTransfer" | "directDebit";
export type TransactionCategory = "supplies" | "software" | "equipment" | "travel" | "utilities" | "fees" | "transfers" | "refund" | "cash" | "uncategorised";
export type MatchingState = "missing" | "suggested" | "matched" | "notRequired" | "waiting" | "categoryNeeded" | "categorised";
export type BankTransaction = {
  id: string;
  accountId: string;
  transactionId: string;
  reference: string;
  date: string;
  merchant: string;
  amount: number;
  currency: "EUR";
  category: TransactionCategory;
  type: "cardPurchase" | "transfer" | "refund" | "fee" | "directDebit" | "atmWithdrawal";
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  cardholder: string | null;
  lastFour: string | null;
  network: "mastercard" | null;
  invoiceRequired: boolean;
  invoiceId: string | null;
  location: { address: string; latitude: number; longitude: number } | null;
};
export type BankPurchaseInvoice = {
  id: string;
  reference: string;
  supplier: string;
  date: string;
  amount: number;
  currency: "EUR";
  fileName: string;
  source: "existing" | "upload";
};

type TransactionSeed = [merchant: string, amount: number, category: TransactionCategory, method: PaymentMethod, person: string | null, status?: PaymentStatus, invoiceId?: string];
const transactionSeeds: TransactionSeed[] = [
  ["Metro Office Supplies", -45.3, "supplies", "applePay", "Jamie Taylor", "completed", "PI-10482"],
  ["Adobe Systems", -55.2, "software", "card", "Morgan Hughes", "failed"],
  ["CycleTech Wholesale", 135.5, "refund", "card", "Alex Morgan"],
  ["Northstar Business Bank", 7040.4, "transfers", "bankTransfer", null, "cancelled"],
  ["Bristol Cycle Works", -860.6, "equipment", "card", "Jamie Taylor"],
  ["Adobe Systems", -55.2, "software", "card", "Morgan Hughes"],
  ["IKEA Bristol", -189, "equipment", "googlePay", "Alex Morgan"],
  ["Origin Coffee", -124.8, "supplies", "applePay", "Jamie Taylor"],
  ["National Grid", -241.6, "utilities", "directDebit", null, "completed", "PI-10468"],
  ["Great Western Railway", -68.5, "travel", "applePay", "Morgan Hughes"],
  ["Metro Office Supplies", -92.4, "supplies", "googlePay", "Alex Morgan"],
  ["CycleTech Wholesale", -1240, "equipment", "bankTransfer", null],
  ["Amazon Web Services", -84.32, "software", "card", "Jamie Taylor", "completed", "PI-10465"],
  ["Sage Banking", -8, "fees", "bankTransfer", null],
  ["Bristol Cycle Works", -215.75, "equipment", "card", "Jamie Taylor"],
  ["Origin Coffee", -164.4, "supplies", "applePay", "Alex Morgan"],
  ["British Telecom", -48, "utilities", "directDebit", null],
  ["FedEx France SAS", -32.7, "travel", "card", "Morgan Hughes"],
  ["IKEA Bristol", -74.95, "equipment", "googlePay", "Alex Morgan", "completed", "PI-10460"],
  ["Northstar Savings", -1500, "transfers", "bankTransfer", null],
  ["Metro Office Supplies", -28.6, "supplies", "card", "Jamie Taylor"],
  ["Great Western Railway", -42, "travel", "applePay", "Morgan Hughes"],
  ["Origin Coffee", -96, "supplies", "card", "Alex Morgan"],
  ["CycleTech Wholesale", -640.8, "equipment", "bankTransfer", null, "completed", "PI-10455"],
  ["Bristol Cycle Works", -325, "equipment", "card", "Jamie Taylor", "pending"],
  ["Adobe Systems", -55.2, "software", "card", "Morgan Hughes", "disputed"],
  ["Metro Office Supplies", -19.8, "supplies", "googlePay", "Alex Morgan"],
  ["Origin Coffee", 24, "refund", "card", "Jamie Taylor"],
];
const merchantLocations: Record<string, BankTransaction["location"]> = {
  "Metro Office Supplies": { address: "Broadmead, Bristol BS1 3XD, United Kingdom", latitude: 51.4585, longitude: -2.5896 },
  "Bristol Cycle Works": { address: "Whiteladies Road, Bristol BS8 2NN, United Kingdom", latitude: 51.4655, longitude: -2.6103 },
  "IKEA Bristol": { address: "Eastgate Road, Bristol BS5 6XX, United Kingdom", latitude: 51.4748, longitude: -2.5613 },
  "Origin Coffee": { address: "Victoria Street, Bristol BS1 6AA, United Kingdom", latitude: 51.452, longitude: -2.5883 },
  "Great Western Railway": { address: "Bristol Temple Meads, Bristol BS1 6QF, United Kingdom", latitude: 51.4492, longitude: -2.5813 },
};
const atmTransactions: BankTransaction[] = [
  { id: "transaction-atm-001", accountId: "sage-operating-account", transactionId: "EVJN26ATM0014608EUR", reference: "ATM-2026-001", date: "2026-10-22", merchant: "Broadmead ATM", amount: -200, currency: "EUR", category: "cash", type: "atmWithdrawal", paymentMethod: "card", paymentStatus: "completed", cardholder: "Alex Morgan", lastFour: "4608", network: "mastercard", invoiceRequired: false, invoiceId: null, location: merchantLocations["Metro Office Supplies"] },
  { id: "transaction-atm-002", accountId: "sage-operating-account", transactionId: "EVJN26ATM0024608EUR", reference: "ATM-2026-002", date: "2026-10-21", merchant: "Temple Meads ATM", amount: -120, currency: "EUR", category: "uncategorised", type: "atmWithdrawal", paymentMethod: "card", paymentStatus: "completed", cardholder: "Alex Morgan", lastFour: "4608", network: "mastercard", invoiceRequired: false, invoiceId: null, location: merchantLocations["Great Western Railway"] },
];
export const bankTransactions: BankTransaction[] = [...atmTransactions, ...transactionSeeds.map(([merchant, amount, category, method, person, status = "completed", invoiceId], index): BankTransaction => {
  const number = String(index + 1).padStart(3, "0");
  const date = new Date(Date.UTC(2026, 9, 20 - index)).toISOString().slice(0, 10);
  return {
    id: `transaction-${number}`, accountId: "sage-operating-account", transactionId: `EVJN26SAGE${number}8842EUR`,
    reference: `SAGE-2026-${number}`, date, merchant, amount, currency: "EUR", category, paymentMethod: method,
    type: category === "refund" ? "refund" : category === "fees" ? "fee" : method === "bankTransfer" ? "transfer" : method === "directDebit" ? "directDebit" : "cardPurchase",
    paymentStatus: status, cardholder: person,
    lastFour: person === "Jamie Taylor" ? "1234" : person === "Morgan Hughes" ? "7781" : person ? "4608" : null,
    network: person ? "mastercard" : null,
    invoiceRequired: amount < 0 && category !== "fees" && category !== "transfers",
    invoiceId: invoiceId ?? null,
    location: method === "directDebit" || method === "bankTransfer" ? null : merchantLocations[merchant] ?? null,
  };
}), ...connectedBankTransactions];

// Issue dates intentionally precede bank payment dates; same-day, earlier-date and ambiguous cases exercise matching.
const invoiceSeeds: [string, string, string, number][] = [
  ["PI-10482", "Metro Office Supplies", "2026-10-19", 45.3],
  ["PI-10471", "Bristol Cycle Works", "2026-10-15", 860.6],
  ["PI-10470", "Adobe Systems", "2026-10-14", 55.2],
  ["PI-10469", "IKEA Bristol", "2026-10-13", 189],
  ["PI-10468", "National Grid", "2026-10-10", 241.6],
  ["PI-10467", "Great Western Railway", "2026-10-10", 68.5],
  ["PI-10466", "CycleTech Wholesale", "2026-10-08", 1240],
  ["PI-10465", "Amazon Web Services", "2026-10-07", 84.32],
  ["PI-10462", "British Telecom", "2026-10-03", 48],
  // Ambiguous supplier/amount fixture: requires an explicit invoice choice, never one-click selection.
  ["PI-10463", "British Telecom", "2026-10-02", 48],
  ["PI-10461", "FedEx France SAS", "2026-10-02", 32.7],
  ["PI-10460", "IKEA Bristol", "2026-10-01", 74.95],
  ["PI-10455", "CycleTech Wholesale", "2026-09-26", 640.8],
  ["PI-10449", "Origin Coffee", "2026-09-25", 148.8],
  ["PI-10448", "Metro Office Supplies", "2026-09-24", 61.2],
];
export const bankPurchaseInvoices: BankPurchaseInvoice[] = invoiceSeeds.map(([id, supplier, date, amount]) => ({
  id, reference: id, supplier, date, amount, currency: "EUR", fileName: `${id.toLowerCase()}.pdf`, source: "existing",
}));
