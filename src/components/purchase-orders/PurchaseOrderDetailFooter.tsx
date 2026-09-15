import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import PurchaseOrderKpiTiles from "./PurchaseOrderKpiTiles";
import type { PurchaseOrder } from "../../data/purchaseOrders";

type PurchaseOrderDetailFooterProps = {
  order: PurchaseOrder;
  onCancel: () => void;
  onReject: () => void;
  onApprove: () => void;
  onGenerateReceipt: () => void;
};

export default function PurchaseOrderDetailFooter({
  order,
  onCancel,
  onReject,
  onApprove,
  onGenerateReceipt,
}: PurchaseOrderDetailFooterProps) {
  const { status } = order;

  return (
    <Box
      className="purchaseOrderDetail__footer"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
    >
      <Box display="flex" alignItems="center">
        <PurchaseOrderKpiTiles order={order} />
      </Box>

      <Box className="purchaseOrderDetail__footerActions" display="flex" alignItems="center" gap={2}>
        <Button variantType="tertiary" onClick={onCancel}>
          Cancel
        </Button>
        {status === "awaiting-approval" && (
          <>
            <Button variantType="secondary" onClick={onReject}>
              Reject
            </Button>
            <Button variantType="primary" onClick={onApprove}>
              Approve
            </Button>
          </>
        )}
        {(status === "approved" || status === "partially-received") && (
          <Button variantType="primary" onClick={onGenerateReceipt}>
            Generate purchase receipt
          </Button>
        )}
      </Box>
    </Box>
  );
}
