import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Pill from "carbon-react/lib/components/pill";
import Typography from "carbon-react/lib/components/typography";
import HeaderBackLink from "../HeaderBackLink";

type PurchaseInvoiceDetailHeaderProps = {
  statusLabel: string;
  statusColorVariant: "information" | "positive" | "negative" | "neutral";
  onBack: () => void;
};

export default function PurchaseInvoiceDetailHeader({
  statusLabel,
  statusColorVariant,
  onBack,
}: PurchaseInvoiceDetailHeaderProps) {
  return (
    <Box className="purchaseInvoiceDetail__header">
      <HeaderBackLink label="Purchase invoices" onClick={onBack} />

      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h1" as="h1" className="purchaseInvoiceDetail__title">
            Purchase invoice details
          </Typography>
          <Pill pillRole="status" colorVariant={statusColorVariant} fill>
            {statusLabel}
          </Pill>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="gradient"
            variantType="secondary"
            iconType="filter_new"
            iconPosition="before"
          >
            Smart split
          </Button>
          <Button variantType="tertiary" iconType="link" iconPosition="before">
            Connection data
          </Button>
          <Button variantType="tertiary" iconType="files_leaning" iconPosition="before">
            View received files
          </Button>
          <Button variantType="tertiary" iconType="chat" iconPosition="before">
            View comments
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
