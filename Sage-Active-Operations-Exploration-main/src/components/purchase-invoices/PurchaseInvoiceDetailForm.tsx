import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import DateInput from "carbon-react/lib/components/date";
import Divider from "carbon-react/lib/components/divider";
import { RadioButton, RadioButtonGroup } from "carbon-react/lib/components/radio-button";
import { Option, Select } from "carbon-react/lib/components/select";
import Switch from "carbon-react/lib/components/switch";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import PurchaseInvoiceTotalsPanel from "./PurchaseInvoiceTotalsPanel";
import PurchaseInvoiceVatTable from "./PurchaseInvoiceVatTable";
import type {
  PurchaseInvoice,
  PurchaseInvoiceDetail,
  PurchaseInvoiceVatRow,
  PurchaseType,
} from "../../data/purchaseInvoices";
import { formatCurrencyGbp } from "../sales-listing/salesGridShared";

type PurchaseInvoiceDetailFormProps = {
  invoice: PurchaseInvoice;
  detail: PurchaseInvoiceDetail;
};

export default function PurchaseInvoiceDetailForm({
  invoice,
  detail,
}: PurchaseInvoiceDetailFormProps) {
  const [purchaseType, setPurchaseType] = useState<PurchaseType>(detail.purchaseType);
  const [supplier, setSupplier] = useState(invoice.supplier);
  const [invoiceNumber, setInvoiceNumber] = useState(invoice.invoiceNumber);
  const [invoiceDate, setInvoiceDate] = useState(
    new Date(invoice.invoiceDate).toLocaleDateString("fr-FR"),
  );
  const [cashVat, setCashVat] = useState(detail.cashVat);
  const [vatRows, setVatRows] = useState<PurchaseInvoiceVatRow[]>(detail.vatRows);
  const [nextRowIndex, setNextRowIndex] = useState(vatRows.length + 1);

  const totalTaxableAmountGbp = vatRows.reduce((sum, row) => sum + row.taxableAmountGbp, 0);
  const totalVatAmountGbp = vatRows.reduce((sum, row) => sum + row.vatAmountGbp, 0);
  const total = totalTaxableAmountGbp + totalVatAmountGbp;

  const [totalIncludingTaxes, setTotalIncludingTaxes] = useState(() =>
    formatCurrencyGbp(total).replace(/[^\d.,]/g, ""),
  );

  const handleAddRow = () => {
    setVatRows((current) => [
      ...current,
      {
        id: `${invoice.id}-vat-${nextRowIndex}`,
        taxRatePercent: 20,
        taxableAmountGbp: 0,
        vatAmountGbp: 0,
        category: "Uncategorised",
      },
    ]);
    setNextRowIndex((current) => current + 1);
  };

  const handleRemoveRow = (id: string) => {
    setVatRows((current) => current.filter((row) => row.id !== id));
  };

  return (
    <Box className="purchaseInvoiceDetail__form">
      <RadioButtonGroup
        name="purchase-type"
        legend="Purchase type"
        value={purchaseType}
        onChange={(event) => setPurchaseType(event.target.value as PurchaseType)}
      >
        <RadioButton
          id="purchase-type-invoice"
          value="invoice"
          label="Invoice"
          inputHint="Required when buyer needs VAT deduction."
        />
        <RadioButton
          id="purchase-type-receipt"
          value="receipt"
          label="Receipt (Simplified)"
          inputHint="For amounts up to €150 excl. VAT."
        />
      </RadioButtonGroup>

      <Divider type="horizontal" variant="prominent" mt={0} mb={0} />

      <Box className="purchaseInvoiceDetail__formRow" display="flex" gap={2}>
        <Box className="purchaseInvoiceDetail__formCell">
          <Select
            id="purchase-invoice-supplier"
            label="Supplier"
            required
            value={supplier}
            onChange={(event) => setSupplier(event.target.value as string)}
          >
            <Option text={invoice.supplier} value={invoice.supplier} />
          </Select>
        </Box>
        <Box
          className="purchaseInvoiceDetail__formCell"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Typography
            variant="strong"
            as="p"
            className="purchaseInvoiceDetail__billingAddressLabel"
          >
            Billing address
          </Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            {detail.supplierAddressLines.map((line) => (
              <Typography
                key={line}
                variant="p"
                as="p"
                className="purchaseInvoiceDetail__billingAddressLine"
              >
                {line}
              </Typography>
            ))}
          </Box>
          <Typography variant="p" as="p" className="purchaseInvoiceDetail__billingAddressLine">
            {detail.supplierCityCountry}
          </Typography>
        </Box>
      </Box>

      <Divider type="horizontal" variant="prominent" mt={0} mb={0} />

      <Box
        className="purchaseInvoiceDetail__formRow purchaseInvoiceDetail__formRow--details"
        display="flex"
        alignItems="flex-start"
        gap={2}
      >
        <Box className="purchaseInvoiceDetail__formCell purchaseInvoiceDetail__formCell--narrow">
          <Textbox
            id="purchase-invoice-number"
            label="Invoice number"
            required
            value={invoiceNumber}
            onChange={(event) => setInvoiceNumber(event.target.value)}
          />
        </Box>
        <Box className="purchaseInvoiceDetail__formCell purchaseInvoiceDetail__formCell--narrow">
          <DateInput
            id="purchase-invoice-date"
            label="Invoice date"
            required
            value={invoiceDate}
            onChange={(event) => setInvoiceDate(event.target.value.formattedValue)}
          />
        </Box>
        <Box className="purchaseInvoiceDetail__formCell purchaseInvoiceDetail__formCell--narrow">
          <Textbox
            id="purchase-invoice-total"
            label="Total"
            readOnly
            value={formatCurrencyGbp(total)}
            onChange={() => {
              // PROTOTYPE: mirrors the extracted document total; the editable confirmation
              // total lives in the Totals panel below the VAT breakdown
            }}
          />
        </Box>
        <Box className="purchaseInvoiceDetail__formCell purchaseInvoiceDetail__formCell--narrow">
          <Switch
            id="purchase-invoice-cash-vat"
            label="VAT on cash receipts"
            checked={cashVat}
            onChange={(event) => setCashVat(event.target.checked)}
          />
        </Box>
      </Box>

      <Divider type="horizontal" variant="prominent" mt={0} mb={0} />

      <PurchaseInvoiceVatTable
        vatRows={vatRows}
        onAddRow={handleAddRow}
        onRemoveRow={handleRemoveRow}
      />

      <PurchaseInvoiceTotalsPanel
        totalTaxableAmountGbp={totalTaxableAmountGbp}
        totalVatAmountGbp={totalVatAmountGbp}
        totalIncludingTaxes={totalIncludingTaxes}
        onTotalIncludingTaxesChange={setTotalIncludingTaxes}
      />
    </Box>
  );
}
