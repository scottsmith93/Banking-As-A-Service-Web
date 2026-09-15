import Box from "carbon-react/lib/components/box";
import Divider from "carbon-react/lib/components/divider";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import { formatCurrencyGbp } from "../sales-listing/salesGridShared";

type PurchaseInvoiceTotalsPanelProps = {
  totalTaxableAmountGbp: number;
  totalVatAmountGbp: number;
  totalIncludingTaxes: string;
  onTotalIncludingTaxesChange: (value: string) => void;
};

export default function PurchaseInvoiceTotalsPanel({
  totalTaxableAmountGbp,
  totalVatAmountGbp,
  totalIncludingTaxes,
  onTotalIncludingTaxesChange,
}: PurchaseInvoiceTotalsPanelProps) {
  return (
    <Box className="purchaseInvoiceDetail__totalsPanel">
      <Typography variant="h3" as="p" className="purchaseInvoiceDetail__totalsHeading">
        Totals
      </Typography>

      <Box className="purchaseInvoiceDetail__totalsRow" display="flex" justifyContent="space-between">
        <Typography variant="strong" as="span">
          Total taxable amount
        </Typography>
        <Typography variant="p" as="span">
          {formatCurrencyGbp(totalTaxableAmountGbp)}
        </Typography>
      </Box>

      <Box className="purchaseInvoiceDetail__totalsRow" display="flex" justifyContent="space-between">
        <Typography variant="strong" as="span">
          Total VAT amount
        </Typography>
        <Typography variant="p" as="span">
          {formatCurrencyGbp(totalVatAmountGbp)}
        </Typography>
      </Box>

      <Divider type="horizontal" mt={0} mb={0} />

      <Box className="purchaseInvoiceDetail__totalsInput">
        <Textbox
          id="purchase-invoice-total-including-taxes"
          label="Total (Including taxes)"
          required
          align="right"
          value={totalIncludingTaxes}
          onChange={(event) => onTotalIncludingTaxesChange(event.target.value)}
        />
      </Box>
    </Box>
  );
}
