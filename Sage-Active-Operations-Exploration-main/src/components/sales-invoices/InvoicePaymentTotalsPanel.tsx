import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Decimal from "carbon-react/lib/components/decimal";
import Typography from "carbon-react/lib/components/typography";
import { paymentTerms } from "../../data/invoiceCreateForm";
import type { InvoiceSummary } from "../../utils/calculateInvoiceTotals";

const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
});

type SummaryRowProps = {
  label: string;
  value: string;
  emphasis?: boolean;
};

function SummaryRow({ label, value, emphasis }: SummaryRowProps) {
  return (
    <Box className="salesInvoiceCreate__summaryRow" display="flex" justifyContent="space-between">
      <Typography
        variant={emphasis ? "strong" : "p"}
        as="p"
        className="salesInvoiceCreate__summaryRowLabel"
      >
        {label}
      </Typography>
      <Typography
        variant={emphasis ? "strong" : "p"}
        as="p"
        className="salesInvoiceCreate__summaryRowValue numericValue"
      >
        {value}
      </Typography>
    </Box>
  );
}

type InvoicePaymentTotalsPanelProps = {
  fieldIdPrefix: string;
  summary: InvoiceSummary;
  customerDiscountPercent: string;
  onCustomerDiscountPercentChange: (value: string) => void;
};

export default function InvoicePaymentTotalsPanel({
  fieldIdPrefix,
  summary,
  customerDiscountPercent,
  onCustomerDiscountPercentChange,
}: InvoicePaymentTotalsPanelProps) {
  const [isTaxBreakdownVisible, setIsTaxBreakdownVisible] = useState(false);

  return (
    <Box className="salesInvoiceCreate__paymentTotalsRow">
      <Box className="salesInvoiceCreate__paymentTermsColumn">
        <Typography variant="h4" as="p" className="salesInvoiceCreate__panelTitle">
          Payment terms
        </Typography>
        <Box className="salesInvoiceCreate__paymentTermsContent">
          {paymentTerms.map((term) => (
            <Box key={term.label} className="salesInvoiceCreate__paymentTermItem">
              <Typography variant="p" as="p" className="salesInvoiceCreate__paymentTermLabel">
                {term.label}
              </Typography>
              <Typography variant="strong" as="p" className="salesInvoiceCreate__paymentTermText">
                {term.text}
              </Typography>
            </Box>
          ))}
          <Button variantType="subtle" size="small" iconType="edit" iconPosition="before">
            Edit
          </Button>
        </Box>
      </Box>

      <Box className="salesInvoiceCreate__discountColumn">
        <Typography
          variant="h4"
          as="p"
          className="salesInvoiceCreate__panelTitle salesInvoiceCreate__panelTitle--spaced"
        >
          Discount
        </Typography>
        <Box className="salesInvoiceCreate__discountRows">
          <SummaryRow
            label="Total before product discount"
            value={gbpFormatter.format(summary.totalBeforeProductDiscount)}
          />
          <SummaryRow
            label="Total product discount"
            value={gbpFormatter.format(summary.totalProductDiscount)}
          />
          <SummaryRow
            label="Total before customer discount"
            value={gbpFormatter.format(summary.totalBeforeCustomerDiscount)}
          />
        </Box>
        <Box className="salesInvoiceCreate__customerDiscountRow" display="flex" alignItems="center">
          <Typography variant="strong" as="p" className="salesInvoiceCreate__summaryRowLabel">
            Customer discount
          </Typography>
          <Box className="salesInvoiceCreate__customerDiscountInput">
            <Decimal
              id={`${fieldIdPrefix}-customer-discount`}
              label="Customer discount %"
              align="right"
              value={customerDiscountPercent}
              onChange={(event) => onCustomerDiscountPercentChange(event.target.value.rawValue)}
            />
          </Box>
        </Box>
      </Box>

      <Box className="salesInvoiceCreate__totalsColumn">
        <Typography variant="h4" as="p" className="salesInvoiceCreate__panelTitle">
          Totals and tax breakdown
        </Typography>
        <SummaryRow
          label="Total taxable amount"
          value={gbpFormatter.format(summary.taxableAmountGbp)}
        />
        <SummaryRow label="Total VAT amount" value={gbpFormatter.format(summary.vatAmountGbp)} />
        <Box className="salesInvoiceCreate__summaryRow" display="flex" justifyContent="space-between">
          <Typography variant="p" as="p" className="salesInvoiceCreate__summaryRowLabel">
            Tax breakdown
          </Typography>
          <Button
            variantType="subtle"
            size="small"
            onClick={() => setIsTaxBreakdownVisible((current) => !current)}
          >
            {isTaxBreakdownVisible ? "Hide" : "View"}
          </Button>
        </Box>

        {isTaxBreakdownVisible && (
          <Box className="salesInvoiceCreate__taxBreakdownTable">
            {summary.vatBreakdown.length === 0 ? (
              <Typography variant="p" as="p" className="salesInvoiceCreate__taxBreakdownEmpty">
                No invoice items to break down yet.
              </Typography>
            ) : (
              summary.vatBreakdown.map((row) => (
                <Box
                  key={row.vatPercent}
                  className="salesInvoiceCreate__taxBreakdownRow"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography variant="small" as="p">
                    VAT at {row.vatPercent}%
                  </Typography>
                  <Typography variant="small" as="p" className="numericValue">
                    {gbpFormatter.format(row.taxableAmountGbp)} taxable ·{" "}
                    {gbpFormatter.format(row.vatAmountGbp)} VAT
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        )}

        <SummaryRow label="Total" value={gbpFormatter.format(summary.totalGbp)} emphasis />
      </Box>
    </Box>
  );
}
