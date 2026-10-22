import { useLocation, useNavigate } from "react-router-dom";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { interpolate } from "../../../utils/interpolate";
import type { BankPurchaseInvoice } from "../../../data/bankingTransactions";

export default function BaasLinkedInvoice({ invoice }: { invoice: BankPurchaseInvoice }) {
  const { copy, money, date } = useTransactionPresentation();
  const navigate = useNavigate();
  const location = useLocation();
  const href = `/purchases/invoices/${encodeURIComponent(invoice.id)}`;
  return <div className="baasLinkedInvoice">
    <Button fullWidth variantType="secondary" href={href} aria-label={interpolate(copy.viewInvoice, { reference: invoice.reference })} onClick={event => {
      event.preventDefault(); navigate(href, { state: { returnTo: location.pathname + location.search } });
    }}>
      <span className="baasLinkedInvoice__content">
        <span className="baasLinkedInvoice__top"><strong>{invoice.reference}</strong><Icon type="chevron_right" aria-hidden /></span>
        <span>{invoice.supplier}</span>
        <span className="baasLinkedInvoice__top"><span>{date(invoice.date)}</span><strong>{money(invoice.amount, invoice.currency)}</strong></span>
        <span className="baasInvoiceFilename">{invoice.fileName}</span>
      </span>
    </Button>
  </div>;
}
