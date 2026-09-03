import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Form from "carbon-react/lib/components/form";
import Typography from "carbon-react/lib/components/typography";
import PurchaseInvoiceDetailFooter from "../../components/purchase-invoices/PurchaseInvoiceDetailFooter";
import PurchaseInvoiceDetailForm from "../../components/purchase-invoices/PurchaseInvoiceDetailForm";
import PurchaseInvoiceDetailHeader from "../../components/purchase-invoices/PurchaseInvoiceDetailHeader";
import PurchaseInvoiceDocumentPreview from "../../components/purchase-invoices/PurchaseInvoiceDocumentPreview";
import {
  getPurchaseInvoiceDetail,
  purchaseInvoices,
  type PurchaseInvoiceListCategory,
} from "../../data/purchaseInvoices";
import { ROUTES } from "../../routes";

const STATUS_BY_LIST_CATEGORY: Record<
  PurchaseInvoiceListCategory,
  { label: string; colorVariant: "information" | "positive" | "negative" | "neutral" }
> = {
  "requires-attention": { label: "Awaiting decision", colorVariant: "information" },
  "awaiting-payment": { label: "Posted, awaiting payment", colorVariant: "neutral" },
  paid: { label: "Posted", colorVariant: "positive" },
  refused: { label: "Refused", colorVariant: "negative" },
};

export default function PurchaseInvoiceDetailPage() {
  const navigate = useNavigate();
  const { invoiceId } = useParams<{ invoiceId: string }>();

  const invoice = useMemo(
    () => purchaseInvoices.find((item) => item.id === invoiceId),
    [invoiceId],
  );

  const detail = useMemo(() => (invoice ? getPurchaseInvoiceDetail(invoice) : null), [invoice]);

  const handleBack = () => navigate(ROUTES.purchases.invoices);

  if (!invoice || !detail) {
    return (
      <Box className="pageContent">
        <Typography variant="h1" as="h1">
          Purchase invoice not found
        </Typography>
        <Typography variant="p" as="p">
          We could not find this purchase invoice in the prototype data set.
        </Typography>
        <Box>
          <Button variantType="secondary" onClick={handleBack}>
            Back to purchase invoices
          </Button>
        </Box>
      </Box>
    );
  }

  const status = STATUS_BY_LIST_CATEGORY[invoice.listCategory];

  return (
    <Box className="pageContent purchaseInvoiceDetail">
      <Form
        stickyFooter
        stickyFooterVariant="light"
        height="100%"
        footerPadding={{ py: 0, px: 3 }}
        footerChildren={<PurchaseInvoiceDetailFooter onCancel={handleBack} />}
      >
        <PurchaseInvoiceDetailHeader
          statusLabel={status.label}
          statusColorVariant={status.colorVariant}
          onBack={handleBack}
        />

        <Box className="purchaseInvoiceDetail__content" display="flex" gap={2}>
          <PurchaseInvoiceDocumentPreview invoice={invoice} detail={detail} />
          <PurchaseInvoiceDetailForm invoice={invoice} detail={detail} />
        </Box>
      </Form>
    </Box>
  );
}
