// MOCK DATA — replace with real API responses
import type { BankTransaction } from "./bankingTransactions";

// Earlier retail settlements make the daily demo realistic without replacing the ten newest rows.
// Both the chart and transaction workspace consume these same completed movements.
const dailySettlements = [840, 320, 1240, 480, 680, 940, 420, 1180, 560, 760, 980, 360, 1120];
const dailyProcessingFees = [12.6, 4.8, 18.6, 7.2, 10.2, 14.1, 6.3, 17.7, 8.4, 11.4, 14.7, 5.4, 16.8];

export const bankDailyActivity: BankTransaction[] = dailySettlements.flatMap((amount, index) => {
  const day = String(index + 1).padStart(2, "0");
  const common = {
    accountId: "sage-operating-account", date: `2026-10-${day}`, currency: "EUR" as const,
    paymentMethod: "bankTransfer" as const, paymentStatus: "completed" as const,
    cardholder: null, lastFour: null, network: null, invoiceRequired: false, invoiceId: null, location: null,
  };
  return [
    { ...common, id: `transaction-settlement-${day}`, transactionId: `ADYEN26SETTLEMENT${day}EUR`, reference: `ADY-SET-202610${day}`, merchant: "Adyen retail card settlement", amount, category: "sales" as const, type: "transfer" as const },
    { ...common, id: `transaction-processing-${day}`, transactionId: `ADYEN26PROCESSING${day}EUR`, reference: `ADY-FEE-202610${day}`, merchant: "Adyen card processing", amount: -dailyProcessingFees[index], category: "fees" as const, type: "fee" as const },
  ];
});
