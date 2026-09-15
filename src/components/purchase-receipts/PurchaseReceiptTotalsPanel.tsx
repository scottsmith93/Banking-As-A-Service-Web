import Box from "carbon-react/lib/components/box";
import Divider from "carbon-react/lib/components/divider";
import Typography from "carbon-react/lib/components/typography";
import { getReceiptTotals, type PurchaseReceipt } from "../../data/purchaseReceipts";
import { formatCurrencyGbp } from "../sales-listing/salesGridShared";

type PurchaseReceiptTotalsPanelProps = {
  receipt: PurchaseReceipt;
};

export default function PurchaseReceiptTotalsPanel({ receipt }: PurchaseReceiptTotalsPanelProps) {
  const totals = getReceiptTotals(receipt);

  return (
    <Box className="purchaseOrderDetail__totalsPanel">
      <Box className="purchaseOrderDetail__totalsRow" display="flex" justifyContent="space-between">
        <Typography variant="strong" as="span">
          Net total
        </Typography>
        <Typography variant="p" as="span">
          {formatCurrencyGbp(totals.netTotalGbp)}
        </Typography>
      </Box>

      <Box className="purchaseOrderDetail__totalsRow" display="flex" justifyContent="space-between">
        <Typography variant="strong" as="span">
          VAT total
        </Typography>
        <Typography variant="p" as="span">
          {formatCurrencyGbp(totals.vatTotalGbp)}
        </Typography>
      </Box>

      <Divider type="horizontal" mt={0} mb={0} />

      <Box className="purchaseOrderDetail__totalsRow" display="flex" justifyContent="space-between">
        <Typography variant="strong" as="span" className="purchaseOrderDetail__totalsGrandLabel">
          Receipt total
        </Typography>
        <Typography variant="strong" as="span" className="purchaseOrderDetail__totalsGrandValue">
          {formatCurrencyGbp(totals.grandTotalGbp)}
        </Typography>
      </Box>
    </Box>
  );
}
