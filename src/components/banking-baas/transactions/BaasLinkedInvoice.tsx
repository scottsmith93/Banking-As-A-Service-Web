import { useLocation, useNavigate } from "react-router-dom";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { interpolate } from "../../../utils/interpolate";
import type { BankPurchaseInvoice } from "../../../data/bankingTransactions";
import type { Invoice } from "../../../data/invoices";

export default function BaasLinkedInvoice(props: { invoice: BankPurchaseInvoice } | { salesInvoice: Invoice }) {
  const { copy, money, date } = useTransactionPresentation();
  const navigate = useNavigate();
  const location = useLocation();
  const salesInvoice = "salesInvoice" in props ? props.salesInvoice : null;
  const invoice = "invoice" in props ? props.invoice : null;
  const document = salesInvoice
    ? { id: salesInvoice.id, reference: salesInvoice.invoiceNumber, counterparty: salesInvoice.customerName, date: salesInvoice.invoiceDate, amount: salesInvoice.totalGbp, currency: "EUR", fileName: null }
    : { ...invoice!, counterparty: invoice!.supplier };
  const href = `/${salesInvoice ? "sales" : "purchases"}/invoices/${encodeURIComponent(document.id)}`;
  return <div className="baasLinkedInvoice">
    <Button fullWidth variantType="secondary" href={href} aria-label={interpolate(salesInvoice ? copy.viewSalesInvoice : copy.viewInvoice, { reference: document.reference })} onClick={event => {
      event.preventDefault(); navigate(href, { state: { returnTo: location.pathname + location.search } });
    }}>
      <span className="baasLinkedInvoice__content">
        <span>{salesInvoice ? copy.salesLabel : copy.purchaseLabel}</span>
        <span className="baasLinkedInvoice__top"><strong>{document.reference}</strong><Icon type="chevron_right" aria-hidden /></span>
        <span>{document.counterparty}</span>
        <span className="baasLinkedInvoice__top"><span>{date(document.date)}</span><strong>{money(document.amount, document.currency)}</strong></span>
        {document.fileName && <span className="baasInvoiceFilename">{document.fileName}</span>}
      </span>
    </Button>
  </div>;
}
