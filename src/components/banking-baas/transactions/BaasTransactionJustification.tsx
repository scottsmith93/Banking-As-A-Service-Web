import { useNavigate } from "react-router-dom";
import Icon from "carbon-react/lib/components/icon";
import Link from "carbon-react/lib/components/link";
import Pill from "carbon-react/lib/components/pill";
import Typography from "carbon-react/lib/components/typography";
import { useBankingTransactions } from "../../../context/useBankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { matchingState, requiresCategory } from "../../../utils/transactionMatching";
import { interpolate } from "../../../utils/interpolate";
import type { BankTransaction } from "../../../data/bankingTransactions";
import "./justification.css";
import { bankMovementsHref } from "../../../utils/bankMovementNavigation";

// Shared evidence presentation: a payment's processing status never substitutes for justification.
export default function BaasTransactionJustification({ transaction }: { transaction: BankTransaction }) {
  const { copy } = useTransactionPresentation();
  const { invoices, transactions, rejectedSuggestions } = useBankingTransactions();
  const navigate = useNavigate();
  const invoice = invoices.find(item => item.id === transaction.invoiceId);
  const state = matchingState(transaction, invoices, transactions, rejectedSuggestions);
  const openInvoice = () => {
    if (invoice) navigate(`/purchases/invoices/${encodeURIComponent(invoice.id)}`, { state: { returnTo: bankMovementsHref(transaction.accountId, { transaction: transaction.id }) } });
  };
  if (invoice) return <span className="baasJustification" title={invoice.reference}>
    <Icon type="tick_thick" color="--colorsSemanticPositive500" aria-hidden />
    <Link href={`/purchases/invoices/${encodeURIComponent(invoice.id)}`} ariaLabel={interpolate(copy.viewInvoice, { reference: invoice.reference })} onKeyDown={event => {
      // AG Grid can consume native Enter activation; preserve the link's explicit keyboard action.
      if (event.key === "Enter") { event.preventDefault(); event.stopPropagation(); openInvoice(); }
      if (event.key === " ") event.stopPropagation();
    }} onClick={event => {
      event.preventDefault(); event.stopPropagation();
      openInvoice();
    }}>{invoice.reference}</Link>
  </span>;
  if (requiresCategory(transaction) && state === "categorised") return <span className="baasJustification baasJustification--category">
    <Icon type="tick_thick" color="--colorsSemanticPositive500" aria-hidden />
    <span className="baasJustification__categoryLabels">
      <span className="baasJustification__label">{copy.justification.categorised}</span>
      <Typography variant="small" as="span">{copy.categories[transaction.category]}</Typography>
    </span>
  </span>;
  if (["missing", "suggested", "categoryNeeded"].includes(state)) return <Pill pillRole="status" size="S" wrapText maxWidth="100%" colorVariant="warning">{state === "categoryNeeded" ? copy.justification.categoryNeeded : copy.justification.invoiceNeeded}</Pill>;
  if (state === "notRequired") return <span className="baasJustification__muted" aria-label={copy.matchingStates.notRequired} title={copy.matchingStates.notRequired}>—</span>;
  return <Typography variant="small" as="span" className="baasJustification__muted">{copy.matchingStates[state]}</Typography>;
}
