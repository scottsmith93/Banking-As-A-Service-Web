import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import PurchaseReceiptKpiTiles from "./PurchaseReceiptKpiTiles";
import type { PurchaseReceipt } from "../../data/purchaseReceipts";

type PurchaseReceiptDetailFooterProps = {
  receipt: PurchaseReceipt;
  onCancel: () => void;
  onCreateInvoice: () => void;
  onProcessReturn: () => void;
};

export default function PurchaseReceiptDetailFooter({
  receipt,
  onCancel,
  onCreateInvoice,
  onProcessReturn,
}: PurchaseReceiptDetailFooterProps) {
  const { status } = receipt;

  return (
    <Box
      className="purchaseOrderDetail__footer"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
    >
      <Box display="flex" alignItems="center">
        <PurchaseReceiptKpiTiles receipt={receipt} />
      </Box>

      <Box className="purchaseOrderDetail__footerActions" display="flex" alignItems="center" gap={2}>
        <Button variantType="tertiary" onClick={onCancel}>
          Cancel
        </Button>
        {status !== "returned" && (
          <Button variantType="secondary" onClick={onProcessReturn}>
            Process return
          </Button>
        )}
        {status === "created" && (
          <Button variantType="primary" onClick={onCreateInvoice}>
            Create Purchase Invoice
          </Button>
        )}
      </Box>
    </Box>
  );
}
