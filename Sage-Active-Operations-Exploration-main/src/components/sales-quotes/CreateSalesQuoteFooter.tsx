import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import SplitButton from "carbon-react/lib/components/split-button";
import FooterKpiTile from "../FooterKpiTile";
import type { QuoteTotals } from "../../utils/calculateQuoteTotals";

const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
});

type CreateSalesQuoteFooterProps = {
  totals: QuoteTotals;
  onCancel: () => void;
};

export default function CreateSalesQuoteFooter({
  totals,
  onCancel,
}: CreateSalesQuoteFooterProps) {
  return (
    <Box
      className="salesQuoteCreate__footer"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
    >
      <Box className="salesQuoteCreate__summaryGroup" display="flex" alignItems="center">
        <FooterKpiTile amount={gbpFormatter.format(totals.taxableAmountGbp)} label="Total taxable amount" />
        <FooterKpiTile amount={gbpFormatter.format(totals.vatAmountGbp)} label="Total VAT amount" />
        <FooterKpiTile amount={gbpFormatter.format(totals.totalGbp)} label="Total" />
      </Box>

      <Box className="salesQuoteCreate__footerActions" display="flex" alignItems="center">
        <Button variantType="tertiary" onClick={onCancel}>
          Cancel
        </Button>
        <SplitButton text="Create" buttonType="primary">
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
  );
}
