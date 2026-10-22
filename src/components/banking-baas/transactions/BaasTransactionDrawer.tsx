import { useRef, useState, type ChangeEvent } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Message from "carbon-react/lib/components/message";
import Sidebar from "carbon-react/lib/components/sidebar";
import Typography from "carbon-react/lib/components/typography";
import { useBankingTransactions } from "../../../context/useBankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { matchingState, needsInvoice, requiresCategory } from "../../../utils/transactionMatching";
import { interpolate } from "../../../utils/interpolate";
import type { BankPurchaseInvoice, BankTransaction } from "../../../data/bankingTransactions";
import BaasInvoiceSearch from "./BaasInvoiceSearch";
import BaasInvoiceUpload from "./BaasInvoiceUpload";
import BaasTransactionLocation from "./BaasTransactionLocation";
import BaasTransactionSummary from "./BaasTransactionSummary";
import BaasTransactionFacts from "./BaasTransactionFacts";
import BaasLinkedInvoice from "./BaasLinkedInvoice";
import BaasCategoryJustification from "./BaasCategoryJustification";
import BaasInvoiceProposals from "./BaasInvoiceProposals";

export default function BaasTransactionDrawer({ transaction, next, onNext, onClose }: { transaction: BankTransaction; next?: BankTransaction; onNext: (transaction: BankTransaction) => void; onClose: () => void }) {
  const { copy } = useTransactionPresentation();
  const { invoices, transactions, matchInvoice, rejectedSuggestions } = useBankingTransactions();
  const [view, setView] = useState<"details" | "existing" | "upload">("details");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const state = matchingState(transaction, invoices, transactions, rejectedSuggestions);
  const linkedInvoice = invoices.find(invoice => invoice.id === transaction.invoiceId);
  const complete = (invoice: BankPurchaseInvoice) => {
    const result = matchInvoice(transaction.id, invoice);
    if (result) { setError(copy.errors[result]); return; }
    setError(""); setView("details"); setFile(null);
  };
  const upload = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    event.target.value = "";
    if (!selected) return;
    if (!["application/pdf", "image/jpeg", "image/png"].includes(selected.type) || selected.size > 10 * 1024 * 1024 || selected.size === 0) { setError(copy.fileError); return; }
    setFile(selected); setError(""); setView("upload");
  };
  return <Sidebar className="baasTransactionDrawer" open width="480px" onCancel={onClose} header={<Typography variant="h2" as="h2">{transaction.merchant}</Typography>} aria-label={copy.details}>
    <Box display="flex" flexDirection="column" gap={3}>
      <BaasTransactionSummary transaction={transaction} />
      {error && <div role="alert"><Message variant="error">{error}</Message></div>}
      {view !== "details" && <Button variantType="tertiary" iconType="chevron_left_thick" iconPosition="before" onClick={() => { setView("details"); setError(""); }}>{copy.back}</Button>}
      {view === "existing" && <BaasInvoiceSearch transaction={transaction} onMatch={complete} />}
      {view === "upload" && file && <BaasInvoiceUpload file={file} transaction={transaction} onMatch={complete} />}
      {view === "details" && <>
        <section className="baasTransactionInvoice" aria-label={requiresCategory(transaction) ? copy.justification.title : copy.invoiceTitle}>
          <Typography variant="h3" as="h3">{requiresCategory(transaction) ? copy.justification.title : copy.invoiceTitle}</Typography>
          {linkedInvoice ? <>
            <Message variant="success-subtle">{copy.matchComplete}</Message>
            <BaasLinkedInvoice invoice={linkedInvoice} />
          </> : needsInvoice(transaction) ? <>
            <Typography variant="p" as="p">{copy.noInvoiceText}</Typography>
            <div className="baasTransactionInvoiceActions">
              <Button variantType="secondary" iconType="upload" iconPosition="before" onClick={() => inputRef.current?.click()}>{copy.uploadInvoice}</Button>
              <Button variantType="secondary" iconType="connect" iconPosition="before" onClick={() => { setError(""); setView("existing"); }}>{copy.linkExisting}</Button>
            </div>
            {/* The Carbon CTA opens the native file chooser. No file is sent to a server in this prototype. */}
            <input ref={inputRef} type="file" hidden accept="application/pdf,image/jpeg,image/png" onChange={upload} aria-label={copy.uploadInvoice} />
            <Typography variant="small" as="p">{copy.fileHint}</Typography>
            <BaasInvoiceProposals transaction={transaction} onMatch={complete} />
          </> : requiresCategory(transaction) ? <BaasCategoryJustification transaction={transaction} /> : <Typography variant="p" as="p">{state === "waiting" ? copy.waitingInvoice : copy.noInvoiceNeeded}</Typography>}
        </section>
        <BaasTransactionFacts transaction={transaction} />
        <BaasTransactionLocation transaction={transaction} />
        <Box className="baasTransactionDrawer__next" display="flex" flexDirection="column" gap={2}>
          {next ? <Button variantType="secondary" onClick={() => onNext(next)}>{copy.nextTransaction}</Button> : <Typography variant="small" as="p">{copy.noMoreTasks}</Typography>}
        </Box>
      </>}
    </Box>
    <span className="baasTransactionLiveStatus" role="status" aria-live="polite">{linkedInvoice ? interpolate(copy.matchSuccess, { reference: linkedInvoice.reference, merchant: transaction.merchant }) : ""}</span>
  </Sidebar>;
}
