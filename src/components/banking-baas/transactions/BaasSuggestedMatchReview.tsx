import { useEffect, useRef, useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button, { type ButtonHandle } from "carbon-react/lib/components/button/__next__";
import Message from "carbon-react/lib/components/message";
import Sidebar from "carbon-react/lib/components/sidebar";
import Typography from "carbon-react/lib/components/typography";
import { useBankingTransactions } from "../../../context/useBankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { suggestedInvoices } from "../../../utils/transactionMatching";
import { interpolate } from "../../../utils/interpolate";
import type { BankPurchaseInvoice, BankTransaction } from "../../../data/bankingTransactions";
import BaasInvoiceSearch from "./BaasInvoiceSearch";
import BaasTransactionSummary from "./BaasTransactionSummary";

// A stable oldest-first work queue. Table filters never hide tasks from this explicit review action.
export default function BaasSuggestedMatchReview({ rows, onClose }: { rows: BankTransaction[]; onClose: () => void }) {
  const { copy, invoiceSummary, money } = useTransactionPresentation();
  const { transactions, invoices, rejectedSuggestions, rejectSuggestion, matchInvoice } = useBankingTransactions();
  const [ids] = useState(() => [...rows].sort((a, b) => a.date.localeCompare(b.date)).map(row => row.id));
  const [manual, setManual] = useState(false);
  const [error, setError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [rejectedCount, setRejectedCount] = useState(0);
  const confirmRef = useRef<ButtonHandle>(null);
  const remaining = ids.map(id => transactions.find(row => row.id === id)).filter((row): row is BankTransaction => Boolean(row && suggestedInvoices(row, invoices, transactions, rejectedSuggestions).length));
  const transaction = remaining[0];
  const choices = transaction ? suggestedInvoices(transaction, invoices, transactions, rejectedSuggestions) : [];
  const invoice = choices[0];
  useEffect(() => {
    if (!manual) confirmRef.current?.focusButton();
  }, [transaction?.id, invoice?.id, manual]);
  const confirm = (choice: BankPurchaseInvoice) => {
    const result = matchInvoice(transaction.id, choice);
    if (result) { setError(copy.errors[result]); return; }
    setAnnouncement(interpolate(copy.matchSuccess, { reference: choice.reference, merchant: transaction.merchant }));
    setManual(false); setError("");
  };
  const reject = () => {
    rejectSuggestion(transaction.id, invoice.id);
    setRejectedCount(count => count + 1); setError("");
  };
  return <Sidebar className="baasTransactionDrawer" open width="480px" onCancel={onClose} header={<Typography variant="h2" as="h2">{copy.reviewTitle}</Typography>} aria-label={copy.reviewTitle}>
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="small" as="p" role="status">{interpolate(copy.reviewProgress, { remaining: remaining.length })}</Typography>
      {error && <Message variant="error">{error}</Message>}
      {transaction && invoice ? <div key={transaction.id} className="baasSuggestedReview">
        <Typography variant="h3" as="h3">{transaction.merchant}</Typography>
        <BaasTransactionSummary transaction={transaction} />
        <Typography variant="small" as="p">{transaction.reference}</Typography>
        {manual || choices.length > 1 ? <>
          {choices.length === 1 && <Button variantType="tertiary" iconType="chevron_left" iconPosition="before" onClick={() => { setManual(false); setError(""); }}>{copy.back}</Button>}
          {choices.length > 1 && <Typography variant="small" as="p">{copy.workbench.chooseInvoice}</Typography>}
          <BaasInvoiceSearch key={transaction.id} transaction={transaction} onMatch={confirm} />
        </> : <>
          <section className="baasInvoiceSuggestion baasSuggestedReview" aria-label={copy.suggestion}>
            <Typography variant="h3" as="h3">{copy.suggestion}</Typography>
            <Typography variant="strong" as="p">{invoice.reference}</Typography>
            <Typography variant="p" as="p">{invoice.supplier}</Typography>
            <div className="baasLinkedInvoice__top"><Typography variant="small" as="span">{invoiceSummary(invoice, transaction)}</Typography><Typography variant="strong" as="span">{money(invoice.amount, invoice.currency)}</Typography></div>
            <Typography variant="small" as="p">{copy.exactMatch}</Typography>
          </section>
          <div className="baasSuggestedReview__actions">
            <Button ref={confirmRef} variantType="primary" iconType="tick" iconPosition="before" onClick={() => confirm(invoice)}>{copy.confirmNext}</Button>
            <Button variantType="secondary" onClick={reject}>{copy.rejectNext}</Button>
          </div>
          <Button variantType="tertiary" iconType="connect" iconPosition="before" onClick={() => setManual(true)}>{copy.chooseAnother}</Button>
        </>}
      </div> : <>
        <Message variant="success-subtle">{copy.reviewDone}</Message>
        <Typography variant="p" as="p">{copy.reviewDoneHint}</Typography>
        {rejectedCount > 0 && <Typography variant="p" as="p">{interpolate(copy.reviewRejected, { count: rejectedCount })}</Typography>}
        <Button ref={confirmRef} variantType="secondary" onClick={onClose}>{copy.reviewClose}</Button>
      </>}
      <span className="baasTransactionLiveStatus" role="status" aria-live="polite">{announcement}</span>
    </Box>
  </Sidebar>;
}
