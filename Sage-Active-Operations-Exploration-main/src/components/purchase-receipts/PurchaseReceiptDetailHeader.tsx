import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Pill from "carbon-react/lib/components/pill";
import Typography from "carbon-react/lib/components/typography";
import HeaderBackLink from "../HeaderBackLink";
import type { PurchaseReceiptStatus } from "../../data/purchaseReceipts";

type PurchaseReceiptDetailHeaderProps = {
  receiptId: string;
  status: PurchaseReceiptStatus;
  onBack: () => void;
};

function getStatusColorVariant(status: PurchaseReceiptStatus) {
  if (status === "created") return "information" as const;
  if (status === "invoiced") return "positive" as const;
  return "negative" as const;
}

function getStatusLabel(status: PurchaseReceiptStatus) {
  if (status === "created") return "Created";
  if (status === "invoiced") return "Invoiced";
  return "Returned";
}

export default function PurchaseReceiptDetailHeader({
  receiptId,
  status,
  onBack,
}: PurchaseReceiptDetailHeaderProps) {
  return (
    <Box className="purchaseOrderDetail__header">
      <HeaderBackLink label="Purchase receipts" onClick={onBack} />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h1" as="h1" className="purchaseOrderDetail__title">
            Purchase receipt {receiptId}
          </Typography>
          <Pill pillRole="status" colorVariant={getStatusColorVariant(status)} fill>
            {getStatusLabel(status)}
          </Pill>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variantType="tertiary"
            iconType="duplicate"
            aria-label="Duplicate purchase receipt"
            onClick={() => {
              // PROTOTYPE: wire to duplicate flow when available
            }}
          />
          <Button
            variantType="tertiary"
            iconType="ellipsis_vertical"
            aria-label="More actions"
            onClick={() => {
              // PROTOTYPE: wire to a more-actions menu when available
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
