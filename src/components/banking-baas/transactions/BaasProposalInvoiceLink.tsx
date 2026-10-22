import { useLocation, useNavigate } from "react-router-dom";
import Link from "carbon-react/lib/components/link";
import type { BankPurchaseInvoice } from "../../../data/bankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { interpolate } from "../../../utils/interpolate";

export default function BaasProposalInvoiceLink({ invoice }: { invoice: BankPurchaseInvoice }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { copy } = useTransactionPresentation();
  const href = `/purchases/invoices/${encodeURIComponent(invoice.id)}`;
  const open = () => navigate(href, { state: { returnTo: location.pathname + location.search } });
  return <Link href={href} ariaLabel={interpolate(copy.viewInvoice, { reference: invoice.reference })}
    onClick={event => { event.preventDefault(); event.stopPropagation(); open(); }}
    onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); event.stopPropagation(); open(); } }}
  >{invoice.reference}</Link>;
}
