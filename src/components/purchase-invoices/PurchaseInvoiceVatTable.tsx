import Box from "carbon-react/lib/components/box";
import { ActionPopover, ActionPopoverItem } from "carbon-react/lib/components/action-popover";
import Button from "carbon-react/lib/components/button/__next__";
import {
  FlatTable,
  FlatTableBody,
  FlatTableCell,
  FlatTableHead,
  FlatTableHeader,
  FlatTableRow,
} from "carbon-react/lib/components/flat-table";
import Typography from "carbon-react/lib/components/typography";
import type { PurchaseInvoiceVatRow } from "../../data/purchaseInvoices";
import { formatCurrencyGbp } from "../sales-listing/salesGridShared";

type PurchaseInvoiceVatTableProps = {
  vatRows: PurchaseInvoiceVatRow[];
  onAddRow: () => void;
  onRemoveRow: (id: string) => void;
};

export default function PurchaseInvoiceVatTable({
  vatRows,
  onAddRow,
  onRemoveRow,
}: PurchaseInvoiceVatTableProps) {
  return (
    <Box className="purchaseInvoiceDetail__vatSection">
      <Typography variant="strong" as="p">
        VAT
      </Typography>
      <Button variantType="primary" iconType="plus" iconPosition="before" onClick={onAddRow}>
        Add
      </Button>

      <FlatTable colorTheme="light" size="large">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Tax</FlatTableHeader>
            <FlatTableHeader align="right">Taxable amount</FlatTableHeader>
            <FlatTableHeader align="right">VAT amount</FlatTableHeader>
            <FlatTableHeader>Category</FlatTableHeader>
            <FlatTableHeader align="right">Action</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          {vatRows.map((row) => (
            <FlatTableRow key={row.id}>
              <FlatTableCell>{row.taxRatePercent.toFixed(2)} %</FlatTableCell>
              <FlatTableCell align="right">
                {formatCurrencyGbp(row.taxableAmountGbp)}
              </FlatTableCell>
              <FlatTableCell align="right">{formatCurrencyGbp(row.vatAmountGbp)}</FlatTableCell>
              <FlatTableCell>{row.category}</FlatTableCell>
              <FlatTableCell align="right">
                <ActionPopover aria-label={`More actions for ${row.category} VAT row`}>
                  <ActionPopoverItem icon="delete" onClick={() => onRemoveRow(row.id)}>
                    Remove row
                  </ActionPopoverItem>
                </ActionPopover>
              </FlatTableCell>
            </FlatTableRow>
          ))}
          {vatRows.length === 0 && (
            <FlatTableRow>
              <FlatTableCell colspan={5}>
                <Typography variant="p" as="p" className="purchaseInvoiceDetail__vatEmpty">
                  No VAT breakdown added yet. Use Add to record a tax rate.
                </Typography>
              </FlatTableCell>
            </FlatTableRow>
          )}
        </FlatTableBody>
      </FlatTable>
    </Box>
  );
}
