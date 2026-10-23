import { useLocation, useNavigate } from "react-router-dom";
import Icon from "carbon-react/lib/components/icon";
import Link from "carbon-react/lib/components/link";
import Pill from "../../status-pill/StatusPill";
import Typography from "carbon-react/lib/components/typography";
import { useBankingTransactions } from "../../../context/useBankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { matchingState, requiresCategory } from "../../../utils/transactionMatching";
import { interpolate } from "../../../utils/interpolate";
import type { BankTransaction } from "../../../data/bankingTransactions";
import { bankPaidSalesInvoice } from "../../../data/invoices";
import "./justification.css";

// Shared evidence presentation: a payment's processing status never substitutes for justification.
export default function BaasTransactionJustification({ transaction, completedOnly = false }: { transaction: BankTransaction; completedOnly?: boolean }) {
  const { copy } = useTransactionPresentation();
  const { invoices, transactions, rejectedSuggestions } = useBankingTransactions();
  const navigate = useNavigate();
  const location = useLocation();
  const invoice = invoices.find(item => item.id === transaction.invoiceId);
  const salesInvoice = transaction.salesInvoiceId === bankPaidSalesInvoice.id ? bankPaidSalesInvoice : undefined;
  const reference = salesInvoice?.invoiceNumber ?? invoice?.reference;
  const href = salesInvoice ? `/sales/invoices/${encodeURIComponent(salesInvoice.id)}` : invoice ? `/purchases/invoices/${encodeURIComponent(invoice.id)}` : "";
  const state = matchingState(transaction, invoices, transactions, rejectedSuggestions);
  const openInvoice = () => {
    if (href) navigate(href, { state: { returnTo: location.pathname + location.search } });
  };
  if (reference) return <span className="baasJustification baasJustification--invoice" title={reference}>
    <Icon type="tick_thick" color="--colorsSemanticPositive500" aria-hidden />
    <span className="baasJustification__invoiceLabels">
    <Typography variant="small" as="span">{salesInvoice ? copy.salesLabel : copy.purchaseLabel}</Typography>
    <Link href={href} ariaLabel={interpolate(salesInvoice ? copy.viewSalesInvoice : copy.viewInvoice, { reference })} onKeyDown={event => {
      // AG Grid can consume native Enter activation; preserve the link's explicit keyboard action.
      if (event.key === "Enter") { event.preventDefault(); event.stopPropagation(); openInvoice(); }
      if (event.key === " ") event.stopPropagation();
    }} onClick={event => {
      event.preventDefault(); event.stopPropagation();
      openInvoice();
    }}>{reference}</Link>
    </span>
  </span>;
  if (requiresCategory(transaction) && state === "categorised") return <span className="baasJustification baasJustification--category">
    <Icon type="tick_thick" color="--colorsSemanticPositive500" aria-hidden />
    <span className="baasJustification__categoryLabels">
      <Typography variant="small" as="span">{copy.categories[transaction.category]}</Typography>
    </span>
  </span>;
  // Overview is a summary, not the justification workbench: only completed evidence is shown.
  if (completedOnly) return null;
  if (["missing", "suggested", "categoryNeeded"].includes(state)) return <Pill pillRole="status" size="S" wrapText maxWidth="100%" colorVariant="warning">{state === "categoryNeeded" ? copy.justification.categoryNeeded : copy.justification.invoiceNeeded}</Pill>;
  if (state === "notRequired") return <span className="baasJustification__muted" aria-label={copy.matchingStates.notRequired} title={copy.matchingStates.notRequired}>—</span>;
  return <Typography variant="small" as="span" className="baasJustification__muted">{copy.matchingStates[state]}</Typography>;
}
