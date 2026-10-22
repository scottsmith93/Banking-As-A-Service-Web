import { useEffect, useRef, useState, type FormEvent } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import DateInput from "carbon-react/lib/components/date";
import Decimal from "carbon-react/lib/components/decimal";
import Loader from "carbon-react/lib/components/loader/__next__";
import Message from "carbon-react/lib/components/message";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { interpolate } from "../../../utils/interpolate";
import type { BankPurchaseInvoice, BankTransaction } from "../../../data/bankingTransactions";

export default function BaasInvoiceUpload({ transaction, file, onMatch }: { transaction: BankTransaction; file: File; onMatch: (invoice: BankPurchaseInvoice) => void }) {
  const { copy, locale, money } = useTransactionPresentation();
  const [extracting, setExtracting] = useState(true);
  const [dateText, setDateText] = useState(transaction.date);
  // PROTOTYPE: the OCR endpoint is simulated, and explicitly identified as a demo in the review UI.
  const [draft, setDraft] = useState({ supplier: transaction.merchant, reference: file.name.replace(/\.[^.]+$/, ""), date: transaction.date, amount: String(Math.abs(transaction.amount)) });
  const supplierRef = useRef<HTMLInputElement>(null);
  useEffect(() => { const timer = window.setTimeout(() => setExtracting(false), 1100); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { if (!extracting) supplierRef.current?.focus(); }, [extracting]);
  const difference = (Math.round(Number(draft.amount) * 100) - Math.round(Math.abs(transaction.amount) * 100)) / 100;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onMatch({ id: `uploaded-${crypto.randomUUID()}`, reference: draft.reference.trim(), supplier: draft.supplier.trim(), date: draft.date, amount: Number(draft.amount), currency: "EUR", fileName: file.name, source: "upload" });
  };
  if (extracting) return <Box className="baasInvoiceExtraction" role="status" aria-live="polite"><Loader loaderType="ring" size="medium" loaderLabel={copy.extracting} showLabel /></Box>;
  return <form className="baasInvoiceReviewForm" onSubmit={submit}>
    <Typography variant="h3" as="h3">{copy.reviewInvoice}</Typography>
    <Typography variant="small" as="p" className="baasInvoiceFilename">{file.name}</Typography>
    <Message variant="info-subtle">{copy.extractionDemo}</Message>
    <Textbox ref={supplierRef} id="baas-extracted-supplier" label={copy.supplier} required value={draft.supplier} onChange={event => setDraft(current => ({ ...current, supplier: event.target.value }))} />
    <Textbox id="baas-extracted-reference" label={copy.invoiceReference} required value={draft.reference} onChange={event => setDraft(current => ({ ...current, reference: event.target.value }))} />
    <DateInput id="baas-extracted-date" label={copy.invoiceDate} value={dateText} required maxDate={transaction.date} onChange={event => { setDateText(event.target.value.formattedValue); setDraft(current => ({ ...current, date: event.target.value.rawValue ?? "" })); }} />
    <Decimal id="baas-extracted-total" label={copy.invoiceTotal} locale={locale} required value={draft.amount} onChange={event => setDraft(current => ({ ...current, amount: event.target.value.rawValue }))} />
    <Message variant={difference === 0 ? "success-subtle" : "warning-subtle"}>{difference === 0 ? copy.exactMatch : interpolate(copy.difference, { amount: money(difference) })}</Message>
    <Button type="submit" variantType="primary" disabled={!draft.amount || !Number.isFinite(difference) || difference !== 0}>{copy.confirmMatch}</Button>
  </form>;
}
