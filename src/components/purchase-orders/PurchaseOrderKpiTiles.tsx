import Box from "carbon-react/lib/components/box";
import FooterKpiTile from "../FooterKpiTile";
import type { PurchaseOrder } from "../../data/purchaseOrders";
import { formatCurrencyGbp, formatListingDate } from "../sales-listing/salesGridShared";

type PurchaseOrderKpiTilesProps = {
  order: PurchaseOrder;
};

export default function PurchaseOrderKpiTiles({ order }: PurchaseOrderKpiTilesProps) {
  return (
    <Box className="purchaseOrderDetail__kpis" display="flex" gap={2}>
      <FooterKpiTile amount={String(order.lines.length)} label="Number of items" />
      <FooterKpiTile
        amount={formatListingDate(order.earliestExpectedDate)}
        label="Earliest expected date"
      />
      <FooterKpiTile amount={formatCurrencyGbp(order.totalIncludingTaxGbp)} label="Order total" />
    </Box>
  );
}
