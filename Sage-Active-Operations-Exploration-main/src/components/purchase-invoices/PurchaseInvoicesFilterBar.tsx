import Box from "carbon-react/lib/components/box";
import {
  ButtonToggle,
  ButtonToggleGroup,
} from "carbon-react/lib/components/button-toggle";
import type { PurchaseInvoiceListCategory } from "../../data/purchaseInvoices";

export type PurchaseInvoiceFilter = "all" | PurchaseInvoiceListCategory;

type FilterCounts = {
  all: number;
  requiresAttention: number;
  awaitingPayment: number;
  refused: number;
  paid: number;
};

type PurchaseInvoicesFilterBarProps = {
  value: PurchaseInvoiceFilter;
  counts: FilterCounts;
  onChange: (value: PurchaseInvoiceFilter) => void;
};

function FilterLabel({ label, count }: { label: string; count: number }) {
  return (
    <span className="purchaseInvoicesFilterBar__label">
      {label}
      <span className="purchaseInvoicesFilterBar__badge">{count}</span>
    </span>
  );
}

export default function PurchaseInvoicesFilterBar({
  value,
  counts,
  onChange,
}: PurchaseInvoicesFilterBarProps) {
  return (
    <Box className="purchaseInvoicesFilterBar">
    <ButtonToggleGroup
      id="purchase-invoices-filter"
      label="Filter purchase invoices"
      value={value}
      onChange={(_event, nextValue) =>
        onChange((nextValue as PurchaseInvoiceFilter) ?? "all")
      }
    >
      <ButtonToggle value="all">
        <FilterLabel label="All" count={counts.all} />
      </ButtonToggle>
      <ButtonToggle value="requires-attention">
        <FilterLabel label="Requires attention" count={counts.requiresAttention} />
      </ButtonToggle>
      <ButtonToggle value="awaiting-payment">
        <FilterLabel label="Awaiting payment" count={counts.awaitingPayment} />
      </ButtonToggle>
      <ButtonToggle value="refused">
        <FilterLabel label="Refused" count={counts.refused} />
      </ButtonToggle>
      <ButtonToggle value="paid">
        <FilterLabel label="Paid" count={counts.paid} />
      </ButtonToggle>
    </ButtonToggleGroup>
    </Box>
  );
}
