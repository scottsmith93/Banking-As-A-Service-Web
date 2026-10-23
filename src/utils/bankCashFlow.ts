import type { BankTransaction } from "../data/bankingTransactions";

export type CashFlowPeriod = { from: string; to: string; moneyIn: number; moneyOut: number; closingBalance: number };

// Only completed account movements are cash flow. Integer cents avoid rounding drift.
// The current-month chart and its KPI values are derived together, not separate mock totals.
export function bankCashFlow(transactions: BankTransaction[], accountId: string, asOf: string, closingBalance = 0) {
  const month = asOf.slice(0, 7);
  const accountRows = transactions.filter(row => row.accountId === accountId && row.date <= asOf);
  const rows = accountRows.filter(row => row.date.startsWith(month));
  const completed = rows.filter(row => row.paymentStatus === "completed");
  const incoming = completed.filter(row => row.amount > 0);
  const outgoing = completed.filter(row => row.amount < 0);
  // Outstanding payments remain pending even when initiated before the current chart month.
  const pending = accountRows.filter(row => row.paymentStatus === "pending");
  const sum = (items: BankTransaction[]) => items.reduce((total, row) => total + Math.round(Math.abs(row.amount) * 100), 0) / 100;
  const day = Number(asOf.slice(8));
  // PROTOTYPE: reconstruct daily closing balances from the API's final balance and completed
  // movements. Production should supply historical ledger balances (including any holds).
  const openingBalanceCents = Math.round(closingBalance * 100) - Math.round(sum(incoming) * 100) + Math.round(sum(outgoing) * 100);
  let runningBalanceCents = openingBalanceCents;
  const periods: CashFlowPeriod[] = Array.from({ length: day }, (_, index) => {
    const date = `${month}-${String(index + 1).padStart(2, "0")}`;
    const moneyIn = sum(incoming.filter(row => row.date === date));
    const moneyOut = sum(outgoing.filter(row => row.date === date));
    runningBalanceCents += Math.round(moneyIn * 100) - Math.round(moneyOut * 100);
    return { from: date, to: date, moneyIn, moneyOut, closingBalance: runningBalanceCents / 100 };
  });
  return { periods, openingBalance: openingBalanceCents / 100, moneyIn: sum(incoming), moneyOut: sum(outgoing), pending: sum(pending), incomingCount: incoming.length, outgoingCount: outgoing.length, pendingCount: pending.length };
}
