import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import Button from "carbon-react/lib/components/button/__next__";
import Pill from "../components/status-pill/StatusPill";
import {
  Dl,
  Dt,
  Dd,
} from "carbon-react/lib/components/definition-list";
import { invoices, type SalesInvoiceStatus } from "../data/invoices";
import { ROUTES } from "../routes";
import MatchedSalesInvoiceDetail from "../components/sales-invoices/MatchedSalesInvoiceDetail";

const gbpFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function getStatusLabel(status: SalesInvoiceStatus) {
  if (status === "draft") return "Draft";
  if (status === "unposted") return "Unposted";
  return "Overdue";
}

function getStatusVariant(status: SalesInvoiceStatus) {
  if (status === "overdue") return "negative" as const;
  if (status === "unposted") return "warning" as const;
  return undefined;
}

export default function InvoiceDetailPage() {
  const navigate = useNavigate();
  const { invoiceId } = useParams<{ invoiceId: string }>();

  const invoice = useMemo(
    () => invoices.find((item) => item.id === invoiceId),
    [invoiceId],
  );

  if (invoice?.status === "paid") return <MatchedSalesInvoiceDetail invoice={invoice} />;
  if (!invoice) {
    return (
      <Box className="pageContent">
        <Typography variant="h1" as="h1">
          Invoice not found
        </Typography>
        <Typography variant="p" as="p">
          We could not find this invoice in the prototype data set.
        </Typography>
        <Box>
          <Button variantType="secondary" onClick={() => navigate(ROUTES.sales.invoices)}>
            Back to invoice listing
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="pageContent">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h1" as="h1">
          Invoice {invoice.invoiceNumber}
        </Typography>
        <Button variantType="secondary" onClick={() => navigate(ROUTES.sales.invoices)}>
          Back to invoice listing
        </Button>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h3" as="h2">
          {invoice.customerName}
        </Typography>
        <Pill pillRole="status" colorVariant={getStatusVariant(invoice.status)}>
          {getStatusLabel(invoice.status)}
        </Pill>
      </Box>

      <Dl>
        <Dt>Issue date</Dt>
        <Dd>{dateFormatter.format(new Date(invoice.issueDate))}</Dd>
        <Dt>Due date</Dt>
        <Dd>{dateFormatter.format(new Date(invoice.dueDate))}</Dd>
        <Dt>Amount</Dt>
        <Dd>
          <Typography variant="p" as="span" className="numericValue">
            {gbpFormatter.format(invoice.amountGbp)}
          </Typography>
        </Dd>
      </Dl>
    </Box>
  );
}
