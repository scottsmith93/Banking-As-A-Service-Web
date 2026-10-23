import { useLocation, useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Typography from "carbon-react/lib/components/typography";
import { Dl, Dt, Dd } from "carbon-react/lib/components/definition-list";
import Pill from "../status-pill/StatusPill";
import type { Invoice } from "../../data/invoices";
import { useTransactionPresentation } from "../../hooks/useTransactionPresentation";

// The same paid Sales record is visible from the Sales listing and the bank's evidence link.
// PROTOTYPE: document data is read-only; no original PDF or new payment is fabricated.
export default function MatchedSalesInvoiceDetail({ invoice }: { invoice: Invoice }) {
  const { copy, date, money } = useTransactionPresentation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const returnTo = typeof state?.returnTo === "string" && state.returnTo.startsWith("/banking/") ? state.returnTo : null;
  return <Box className="pageContent" display="flex" flexDirection="column" gap={3}>
    <Box display="flex" gap={2} flexWrap="wrap">
      <Button variantType="tertiary" iconType="chevron_left" iconPosition="before" onClick={() => navigate("/sales/invoices")}>{copy.backToSalesInvoices}</Button>
      {returnTo && <Button variantType="tertiary" iconType="connect" iconPosition="before" onClick={() => navigate(returnTo)}>{copy.backToTransactions}</Button>}
    </Box>
    <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
      <Typography variant="h1" as="h1">{copy.salesInvoiceTitle} {invoice.invoiceNumber}</Typography>
      <Pill pillRole="status" colorVariant="positive">{copy.paid}</Pill>
    </Box>
    <Dl>
      <Dt>{copy.customer}</Dt><Dd>{invoice.customerName}</Dd>
      <Dt>{copy.invoiceDate}</Dt><Dd>{date(invoice.issueDate)}</Dd>
      <Dt>{copy.dueDate}</Dt><Dd>{date(invoice.dueDate)}</Dd>
      <Dt>{copy.invoiceTotal}</Dt><Dd><Typography variant="p" as="span" className="numericValue">{money(invoice.amountGbp)}</Typography></Dd>
    </Dl>
  </Box>;
}
