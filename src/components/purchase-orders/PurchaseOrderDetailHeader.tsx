import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Pill from "../status-pill/StatusPill";
import Typography from "carbon-react/lib/components/typography";
import HeaderBackLink from "../HeaderBackLink";
import type { PurchaseOrderStatus } from "../../data/purchaseOrders";

type PurchaseOrderDetailHeaderProps = {
  orderId: string;
  status: PurchaseOrderStatus;
  onBack: () => void;
};

function getStatusColorVariant(status: PurchaseOrderStatus) {
  if (status === "awaiting-approval") return "warning" as const;
  if (status === "approved") return "information" as const;
  if (status === "partially-received") return "warning" as const;
  return "positive" as const;
}

function getStatusLabel(status: PurchaseOrderStatus) {
  if (status === "awaiting-approval") return "Awaiting approval";
  if (status === "approved") return "Approved";
  if (status === "partially-received") return "Partially received";
  return "Received";
}

export default function PurchaseOrderDetailHeader({
  orderId,
  status,
  onBack,
}: PurchaseOrderDetailHeaderProps) {
  return (
    <Box className="purchaseOrderDetail__header">
      <HeaderBackLink label="Purchase orders" onClick={onBack} />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h1" as="h1" className="purchaseOrderDetail__title">
            Purchase order {orderId}
          </Typography>
          <Pill pillRole="status" colorVariant={getStatusColorVariant(status)} fill>
            {getStatusLabel(status)}
          </Pill>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variantType="tertiary"
            iconType="duplicate"
            aria-label="Duplicate purchase order"
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
