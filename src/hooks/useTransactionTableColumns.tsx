import type { ReactNode } from "react";
import Pill from "carbon-react/lib/components/pill";
import Typography from "carbon-react/lib/components/typography";
import BaasTransactionSource from "../components/banking-baas/transactions/BaasTransactionSource";
import BaasTransactionJustification from "../components/banking-baas/transactions/BaasTransactionJustification";
import BaasTransactionType from "../components/banking-baas/transactions/BaasTransactionType";
import type { BankTransaction } from "../data/bankingTransactions";
import { useTransactionPresentation } from "./useTransactionPresentation";
import { useBankingTransactions } from "../context/useBankingTransactions";
import { matchingState } from "../utils/transactionMatching";
import { transactionSource } from "../utils/transactionSource";

type TransactionColumn = {
  id: string; label: string; width: number; align?: "right";
  render: (transaction: BankTransaction) => ReactNode;
  value: (transaction: BankTransaction) => string | number;
};

// Single presentation contract for Carbon's recent FlatTable and the full SageDataGrid.
// Change column order, copy, cell layout or formatting here to update both surfaces.
export function useTransactionTableColumns({ cashFlowColours = false }: { cashFlowColours?: boolean } = {}): TransactionColumn[] {
  const { copy, transactionMoney, date } = useTransactionPresentation();
  const { invoices, transactions, rejectedSuggestions } = useBankingTransactions();
  return [
    { id: "source", label: copy.movements.source, width: 110, value: row => { const source = transactionSource(row); return source.isSage ? copy.movements.sageBank : source.bank?.name ?? source.account; }, render: row => <BaasTransactionSource transaction={row} /> },
    { id: "date", label: copy.movements.date, width: 135, value: row => row.date, render: row => date(row.date) },
    { id: "merchant", label: copy.movements.description, width: 220, value: row => row.merchant, render: row => <Typography variant="p" as="span" m={0}>{row.merchant}</Typography> },
    { id: "type", label: copy.type, width: 160, value: row => copy.types[row.type], render: row => <BaasTransactionType type={row.type} /> },
    { id: "paymentStatus", label: copy.paymentStatus, width: 130, value: row => copy.paymentStatuses[row.paymentStatus], render: row => <Pill pillRole="status" size="S" wrapText colorVariant={row.paymentStatus === "completed" ? "positive" : row.paymentStatus === "failed" ? "negative" : "neutral"}>{copy.paymentStatuses[row.paymentStatus]}</Pill> },
    { id: "amount", label: copy.amount, width: 130, align: "right", value: row => row.amount, render: row => <span className={`numericValue baasTransactionAmount${cashFlowColours && row.amount !== 0 ? row.amount > 0 ? " baasTransactionAmount--in" : " baasTransactionAmount--out" : ""}`}>{transactionMoney(row.amount, row.currency)}</span> },
    { id: "invoiceStatus", label: copy.justification.title, width: 180, value: row => row.invoiceId ?? copy.matchingStates[matchingState(row, invoices, transactions, rejectedSuggestions)], render: row => <BaasTransactionJustification transaction={row} /> },
  ];
}
