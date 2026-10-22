import { useLocation, useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Message from "carbon-react/lib/components/message";
import Pill from "carbon-react/lib/components/pill";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import { useBankingTransactions } from "../../context/useBankingTransactions";
import { useTransactionPresentation } from "../../hooks/useTransactionPresentation";
import type { BankPurchaseInvoice } from "../../data/bankingTransactions";
import "../banking-baas/transactions/transactions.css";

// Same Purchases detail route and document/form composition; never reinterpret the legacy GBP fixtures as EUR.
// PROTOTYPE: the invoice API snapshot has no original document or VAT breakdown. Do not invent either.
export default function MatchedPurchaseInvoiceDetail({ invoice }: { invoice: BankPurchaseInvoice }) {
  const { copy, money, date } = useTransactionPresentation();
  const navigate = useNavigate();
  const { transactions } = useBankingTransactions();
  const linked = transactions.some(row => row.invoiceId === invoice.id);
  const { state } = useLocation();
  const returnTo = typeof state?.returnTo === "string" && (state.returnTo.startsWith("/banking/bank-movements?") || state.returnTo.startsWith("/banking/baas/accounts/")) ? state.returnTo : null;
  return <Box className="pageContent purchaseInvoiceDetail baasMatchedPurchaseInvoice">
    <div className="purchaseInvoiceDetail__header">
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Button variantType="tertiary" iconType="chevron_left" iconPosition="before" onClick={() => navigate("/purchases/invoices")}>{copy.backToInvoices}</Button>
        {returnTo && <Button variantType="tertiary" iconType="connect" iconPosition="before" onClick={() => navigate(returnTo)}>{copy.backToTransactions}</Button>}
      </Box>
      <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <Typography variant="h1" as="h1">{copy.invoiceDetails}</Typography>
        <Pill pillRole="status" colorVariant={linked ? "positive" : "neutral"}>{linked ? copy.matchComplete : copy.workbench.proposedInvoice}</Pill>
      </Box>
    </div>
    <Box className="purchaseInvoiceDetail__content" display="flex" gap={2}>
      <section className="purchaseInvoiceDetail__preview" aria-label={copy.document}>
        <div className="purchaseInvoiceDetail__previewCanvas"><div className="purchaseInvoiceDetail__previewPage">
          <Typography variant="h2" as="h2">{invoice.supplier}</Typography>
          <Typography variant="h3" as="h3">{copy.invoiceTitle}</Typography>
          <dl className="baasTransactionFacts">
            <div><dt>{copy.invoiceReference}</dt><dd>{invoice.reference}</dd></div>
            <div><dt>{copy.invoiceDate}</dt><dd>{date(invoice.date)}</dd></div>
            <div className="baasTransactionFacts__full"><dt>{copy.invoiceTotal}</dt><dd className="numericValue">{money(invoice.amount, invoice.currency)}</dd></div>
          </dl>
          <Typography variant="small" as="p">{invoice.fileName}</Typography>
          <Message variant="info-subtle">{copy.previewNotice}</Message>
        </div></div>
      </section>
      <section className="purchaseInvoiceDetail__form baasMatchedPurchaseInvoice__fields" aria-label={copy.invoiceDetails}>
        <Message variant="info-subtle">{copy.invoiceReadOnly}</Message>
        <Textbox label={copy.supplier} value={invoice.supplier} readOnly onChange={() => {}} />
        <Textbox label={copy.invoiceReference} value={invoice.reference} readOnly onChange={() => {}} />
        <Textbox label={copy.invoiceDate} value={date(invoice.date)} readOnly onChange={() => {}} />
        <Textbox label={copy.invoiceTotal} value={money(invoice.amount, invoice.currency)} align="right" readOnly onChange={() => {}} />
      </section>
    </Box>
  </Box>;
}
