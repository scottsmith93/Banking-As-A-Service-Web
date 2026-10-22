import { useEffect, useRef, useState } from "react";
import type { BankPurchaseInvoice, BankTransaction } from "../data/bankingTransactions";
import { useBankingTransactions } from "../context/useBankingTransactions";
import { useTransactionPresentation } from "./useTransactionPresentation";
import { transactionProposal } from "../utils/transactionProposals";
import { interpolate } from "../utils/interpolate";
import type { InvoiceMatchError } from "../utils/transactionMatching";

export function useInlineJustification() {
  const { copy } = useTransactionPresentation();
  const { transactions, invoices, rejectedSuggestions, matchInvoice } = useBankingTransactions();
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [noticeDetails, setNotice] = useState<{ merchant: string; reference: string; accountId: string } | null>(null);
  const [errorKey, setError] = useState<InvoiceMatchError | "changedSuggestion" | "">("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const justify = (transaction: BankTransaction, invoice: BankPurchaseInvoice) => {
    const latest = transactions.find(row => row.id === transaction.id);
    const proposal = latest && transactionProposal(latest, invoices, transactions, rejectedSuggestions);
    if (!latest || proposal?.kind !== "invoice" || proposal.invoices[0].id !== invoice.id) { setError("changedSuggestion"); return; }
    const result = matchInvoice(latest.id, invoice);
    if (result) { setError(result); return; }
    setError(""); setCompletedIds(current => [...current, latest.id]);
    setNotice({ merchant: latest.merchant, reference: invoice.reference, accountId: latest.accountId });
    // UX feedback, not API latency: keep the completed row briefly so users can see the result before it leaves the queue.
    timers.current.push(setTimeout(() => setCompletedIds(current => current.filter(id => id !== latest.id)), 1200));
  };
  const clearFeedback = () => { setNotice(null); setError(""); setCompletedIds([]); };
  const notice = noticeDetails ? interpolate(copy.workbench.justifiedNotice, noticeDetails) : "";
  const error = errorKey ? errorKey === "changedSuggestion" ? copy.workbench.changedSuggestion : copy.errors[errorKey] : "";
  return { completedIds, notice, noticeAccountId: noticeDetails?.accountId, error, justify, clearFeedback };
}
