import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import DateInput from "carbon-react/lib/components/date";
import { FilterableSelect, Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import { Tile, TileContent } from "carbon-react/lib/components/tile";
import VerticalDivider from "carbon-react/lib/components/vertical-divider";
import { customers } from "../../data/customers";
import { invoiceDocumentPrefixOptions } from "../../data/invoiceCreateForm";

const fullWidthFieldProps = {
  maxWidth: "100%",
  inputWidth: 100,
};

type InvoiceDetailsHeaderProps = {
  fieldIdPrefix: string;
  customerId: string;
  prefix: string;
  reference: string;
  invoiceDate: string;
  fulfillmentDate: string;
  onCustomerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPrefixChange: (value: string) => void;
  onReferenceChange: (value: string) => void;
  onInvoiceDateChange: (value: string) => void;
  onFulfillmentDateChange: (value: string) => void;
  onViewCustomerDetails: () => void;
};

export default function InvoiceDetailsHeader({
  fieldIdPrefix,
  customerId,
  prefix,
  reference,
  invoiceDate,
  fulfillmentDate,
  onCustomerChange,
  onPrefixChange,
  onReferenceChange,
  onInvoiceDateChange,
  onFulfillmentDateChange,
  onViewCustomerDetails,
}: InvoiceDetailsHeaderProps) {
  return (
    <Box className="salesInvoiceCreate__detailsCard">
      <Tile roundness="default" p={3}>
        <TileContent>
          <Box className="salesInvoiceCreate__detailsRow">
            <Box className="salesInvoiceCreate__detailsCell salesInvoiceCreate__detailsCell--customer">
              <FilterableSelect
                id={`${fieldIdPrefix}-customer`}
                label="Customer"
                placeholder="Select..."
                required
                value={customerId}
                onChange={onCustomerChange}
                {...fullWidthFieldProps}
              >
                {customers.map((customer) => (
                  <Option key={customer.id} text={customer.name} value={customer.id} />
                ))}
              </FilterableSelect>

              {customerId && (
                <Button
                  variantType="secondary"
                  iconType="view"
                  iconPosition="before"
                  className="salesInvoiceCreate__viewCustomerButton"
                  onClick={onViewCustomerDetails}
                >
                  View customer details
                </Button>
              )}
            </Box>

            <Box className="salesInvoiceCreate__detailsDivider">
              <VerticalDivider aria-hidden />
            </Box>

            <Box className="salesInvoiceCreate__detailsCell">
              <Select
                id={`${fieldIdPrefix}-prefix`}
                label="Document prefix"
                required
                value={prefix}
                onChange={(event) => onPrefixChange(event.target.value)}
                {...fullWidthFieldProps}
              >
                {invoiceDocumentPrefixOptions.map((option) => (
                  <Option key={option.value} text={option.text} value={option.value} />
                ))}
              </Select>
            </Box>

            <Box className="salesInvoiceCreate__detailsCell">
              <Textbox
                id={`${fieldIdPrefix}-reference`}
                label="Reference"
                value={reference}
                onChange={(event) => onReferenceChange(event.target.value)}
                {...fullWidthFieldProps}
              />
            </Box>

            <Box className="salesInvoiceCreate__detailsCell">
              <DateInput
                id={`${fieldIdPrefix}-invoice-date`}
                label="Invoice date"
                required
                value={invoiceDate}
                onChange={(event) => onInvoiceDateChange(event.target.value.formattedValue)}
              />
            </Box>

            <Box className="salesInvoiceCreate__detailsCell">
              <DateInput
                id={`${fieldIdPrefix}-fulfillment-date`}
                label="Fulfillment date"
                value={fulfillmentDate}
                onChange={(event) => onFulfillmentDateChange(event.target.value.formattedValue)}
              />
            </Box>
          </Box>
        </TileContent>
      </Tile>
    </Box>
  );
}
