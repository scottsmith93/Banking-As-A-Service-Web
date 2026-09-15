import Box from "carbon-react/lib/components/box";
import FooterKpiTile from "../FooterKpiTile";
import type { PurchaseReceipt } from "../../data/purchaseReceipts";
import { formatCurrencyGbp, formatListingDate } from "../sales-listing/salesGridShared";

type PurchaseReceiptKpiTilesProps = {
  receipt: PurchaseReceipt;
};

export default function PurchaseReceiptKpiTiles({ receipt }: PurchaseReceiptKpiTilesProps) {
  return (
    <Box className="purchaseOrderDetail__kpis" display="flex" gap={2}>
      <FooterKpiTile amount={String(receipt.lines.length)} label="Number of items" />
      <FooterKpiTile amount={formatListingDate(receipt.receiptDate)} label="Receipt date" />
      <FooterKpiTile amount={formatCurrencyGbp(receipt.totalIncludingTaxGbp)} label="Receipt total" />
    </Box>
  );
}
