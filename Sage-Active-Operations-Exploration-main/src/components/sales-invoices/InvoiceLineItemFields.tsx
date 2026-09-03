import type { ReactNode } from "react";
import Box from "carbon-react/lib/components/box";
import Decimal from "carbon-react/lib/components/decimal";
import { FilterableSelect, Option } from "carbon-react/lib/components/select";
import { productsAndServices } from "../../data/productsAndServices";

type InvoiceLineItemFieldsProps = {
  idPrefix: string;
  showLabels: boolean;
  disabled?: boolean;
  productOrServiceId: string;
  productPlaceholder?: string;
  quantity: string;
  unitPrice: string;
  discountPercent: string;
  taxableAmount: string;
  vatPercent: string;
  onProductOrServiceChange?: (value: string) => void;
  onProductOrServiceBlur?: () => void;
  onQuantityChange?: (value: string) => void;
  onUnitPriceChange?: (value: string) => void;
  onDiscountPercentChange?: (value: string) => void;
  onVatPercentChange?: (value: string) => void;
  action?: ReactNode;
};

export default function InvoiceLineItemFields({
  idPrefix,
  showLabels,
  disabled = false,
  productOrServiceId,
  productPlaceholder = "Start typing...",
  quantity,
  unitPrice,
  discountPercent,
  taxableAmount,
  vatPercent,
  onProductOrServiceChange,
  onProductOrServiceBlur,
  onQuantityChange,
  onUnitPriceChange,
  onDiscountPercentChange,
  onVatPercentChange,
  action,
}: InvoiceLineItemFieldsProps) {
  const noop = () => undefined;

  return (
    <Box className="salesInvoiceCreate__itemsRow">
      <Box className="salesInvoiceCreate__itemsCell salesInvoiceCreate__itemsCell--product">
        <FilterableSelect
          id={`${idPrefix}-product`}
          label={showLabels ? "Product or service" : undefined}
          aria-label={showLabels ? undefined : "Product or service"}
          placeholder={productPlaceholder}
          required={showLabels}
          disabled={disabled}
          value={productOrServiceId}
          onChange={(event) =>
            onProductOrServiceChange?.(event.target.value as string)
          }
          onBlur={onProductOrServiceBlur}
          maxWidth="100%"
          inputWidth={100}
        >
          {productsAndServices.map((product) => (
            <Option key={product.id} text={product.name} value={product.id} />
          ))}
        </FilterableSelect>
      </Box>

      <Box className="salesInvoiceCreate__itemsCell salesInvoiceCreate__itemsCell--narrow">
        <Decimal
          id={`${idPrefix}-quantity`}
          label={showLabels ? "Quantity" : undefined}
          aria-label={showLabels ? undefined : "Quantity"}
          required={showLabels}
          align="right"
          disabled={disabled}
          value={quantity}
          onChange={onQuantityChange ? (event) => onQuantityChange(event.target.value.rawValue) : noop}
        />
      </Box>

      <Box className="salesInvoiceCreate__itemsCell">
        <Decimal
          id={`${idPrefix}-unit-price`}
          label={showLabels ? "Unit price" : undefined}
          aria-label={showLabels ? undefined : "Unit price"}
          required={showLabels}
          align="right"
          prefix="€"
          disabled={disabled}
          value={unitPrice}
          onChange={onUnitPriceChange ? (event) => onUnitPriceChange(event.target.value.rawValue) : noop}
        />
      </Box>

      <Box className="salesInvoiceCreate__itemsCell salesInvoiceCreate__itemsCell--narrow">
        <Decimal
          id={`${idPrefix}-discount`}
          label={showLabels ? "Discount %" : undefined}
          aria-label={showLabels ? undefined : "Discount %"}
          required={showLabels}
          align="right"
          disabled={disabled}
          value={discountPercent}
          onChange={
            onDiscountPercentChange ? (event) => onDiscountPercentChange(event.target.value.rawValue) : noop
          }
        />
      </Box>

      <Box className="salesInvoiceCreate__itemsCell">
        <Decimal
          id={`${idPrefix}-taxable-amount`}
          label={showLabels ? "Taxable amount" : undefined}
          aria-label={showLabels ? undefined : "Taxable amount"}
          align="right"
          prefix="€"
          readOnly
          disabled={disabled}
          value={taxableAmount}
          onChange={noop}
        />
      </Box>

      <Box className="salesInvoiceCreate__itemsCell salesInvoiceCreate__itemsCell--narrow">
        <Decimal
          id={`${idPrefix}-vat`}
          label={showLabels ? "VAT %" : undefined}
          aria-label={showLabels ? undefined : "VAT %"}
          required={showLabels}
          align="right"
          disabled={disabled}
          value={vatPercent}
          onChange={onVatPercentChange ? (event) => onVatPercentChange(event.target.value.rawValue) : noop}
        />
      </Box>

      <Box className="salesInvoiceCreate__itemsCell salesInvoiceCreate__itemsCell--action">
        {action}
      </Box>
    </Box>
  );
}
