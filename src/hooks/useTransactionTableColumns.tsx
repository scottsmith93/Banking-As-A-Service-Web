import type { ReactNode } from "react";
import Pill from "../components/status-pill/StatusPill";
import Typography from "carbon-react/lib/components/typography";
import BaasTransactionSource from "../components/banking-baas/transactions/BaasTransactionSource";
import BaasTransactionJustification from "../components/banking-baas/transactions/BaasTransactionJustification";
import BaasTransactionType from "../components/banking-baas/transactions/BaasTransactionType";
import type { BankTransaction } from "../data/bankingTransactions";
import { useTransactionPresentation } from "./useTransactionPresentation";
import { useBankingTransactions } from "../context/useBankingTransactions";
import { matchingState } from "../utils/transactionMatching";
import { transactionSource } from "../utils/transactionSource";
import MoneyValue from "../components/money-value/MoneyValue";
import { interpolate } from "../utils/interpolate";

type TransactionColumn = {
  id: string; label: string; width: number; align?: "right";
  render: (transaction: BankTransaction) => ReactNode;
  value: (transaction: BankTransaction) => string | number;
};

// Single presentation contract for Carbon's recent FlatTable and the full SageDataGrid.
// Change column order, copy, cell layout or formatting here to update both surfaces.
export function useTransactionTableColumns({ overview = false, summary = false }: { overview?: boolean; summary?: boolean } = {}): TransactionColumn[] {
  const { copy, locale, date } = useTransactionPresentation();
  const { invoices, transactions, rejectedSuggestions } = useBankingTransactions();
  const columns: TransactionColumn[] = [
    { id: "source", label: copy.movements.source, width: 240, value: row => { const source = transactionSource(row); return source.isSage ? copy.movements.sageBank : source.bank?.name ?? source.account; }, render: row => <BaasTransactionSource transaction={row} hideBank={overview} /> },
    { id: "date", label: copy.movements.date, width: 135, value: row => row.date, render: row => date(row.date) },
    { id: "merchant", label: copy.movements.description, width: 220, value: row => row.merchant, render: row => <Typography variant="p" as="span" m={0}>{row.type === "invoicePayment" ? interpolate(copy.invoicePaymentDescription, { reference: row.reference }) : row.merchant}</Typography> },
    { id: "type", label: copy.type, width: 160, value: row => copy.types[row.type], render: row => <BaasTransactionType type={row.type} /> },
    { id: "paymentStatus", label: copy.paymentStatus, width: 130, value: row => copy.paymentStatuses[row.paymentStatus], render: row => <Pill pillRole="status" size="S" wrapText colorVariant={row.paymentStatus === "completed" ? "positive" : row.paymentStatus === "failed" ? "negative" : "neutral"}>{copy.paymentStatuses[row.paymentStatus]}</Pill> },
    { id: "amount", label: copy.amount, width: 130, align: "right", value: row => row.amount, render: row => <MoneyValue amount={row.amount} currency={row.currency} locale={locale} signed /> },
    { id: "invoiceStatus", label: copy.justification.title, width: 180, value: row => row.invoiceId ?? row.salesInvoiceId ?? copy.matchingStates[matchingState(row, invoices, transactions, rejectedSuggestions)], render: row => <BaasTransactionJustification transaction={row} completedOnly={overview || summary} /> },
  ];
  // Browsing summaries omit processing status; details and the Justified view still expose it.
  return overview || summary ? columns.filter(column => column.id !== "paymentStatus") : columns;
}
