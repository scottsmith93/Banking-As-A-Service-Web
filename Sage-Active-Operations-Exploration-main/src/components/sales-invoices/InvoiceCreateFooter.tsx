import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import SplitButton from "carbon-react/lib/components/split-button";
import FooterKpiTile from "../FooterKpiTile";
import type { InvoiceSummary } from "../../utils/calculateInvoiceTotals";

const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
});

type InvoiceCreateFooterProps = {
  summary: InvoiceSummary;
  onCancel: () => void;
  onCreate: () => void;
  showPreview: boolean;
  onTogglePreview: () => void;
};

export default function InvoiceCreateFooter({
  summary,
  onCancel,
  onCreate,
  showPreview,
  onTogglePreview,
}: InvoiceCreateFooterProps) {
  return (
    <Box
      className="salesInvoiceCreate__footer"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Button
        variantType="tertiary"
        iconType="view"
        iconPosition="before"
        onClick={onTogglePreview}
      >
        {showPreview ? "Hide preview" : "Show preview"}
      </Button>

      <Box className="salesInvoiceCreate__footerRight" display="flex" alignItems="center">
        <Box className="salesInvoiceCreate__summaryGroup" display="flex" alignItems="center">
          <FooterKpiTile amount={gbpFormatter.format(summary.taxableAmountGbp)} label="Total taxable amount" />
          <FooterKpiTile amount={gbpFormatter.format(summary.vatAmountGbp)} label="Total VAT amount" />
          <FooterKpiTile amount={gbpFormatter.format(summary.totalGbp)} label="Total" />
        </Box>

        <Box className="salesInvoiceCreate__footerActions" display="flex" alignItems="center">
          <Button variantType="tertiary" onClick={onCancel}>
            Cancel
          </Button>
          <SplitButton text="Create" buttonType="primary" onClick={onCreate}>
            <Button
              onClick={() => {
                // PROTOTYPE: replace with create-and-send flow
              }}
            >
              Create and send
            </Button>
            <Button
              onClick={() => {
                // PROTOTYPE: replace with create-and-add-another flow
              }}
            >
              Create and add another
            </Button>
          </SplitButton>
        </Box>
      </Box>
    </Box>
  );
}
