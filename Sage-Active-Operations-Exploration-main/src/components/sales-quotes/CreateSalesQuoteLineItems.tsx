import { useMemo } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import {
  FlatTable,
  FlatTableBody,
  FlatTableCell,
  FlatTableHead,
  FlatTableHeader,
  FlatTableRow,
} from "carbon-react/lib/components/flat-table";
import Icon from "carbon-react/lib/components/icon";
import IconButton from "carbon-react/lib/components/icon-button";
import Typography from "carbon-react/lib/components/typography";
import type { QuoteLineItem } from "../../data/salesQuoteForm";

const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
});

type CreateSalesQuoteLineItemsProps = {
  lineItems: QuoteLineItem[];
  onAddLine: () => void;
  onRemoveLine: (id: string) => void;
};

export default function CreateSalesQuoteLineItems({
  lineItems,
  onAddLine,
  onRemoveLine,
}: CreateSalesQuoteLineItemsProps) {
  const columnCount = 7;

  const emptyState = useMemo(
    () => (
      <FlatTableRow>
        <FlatTableCell colspan={columnCount}>
          <Box className="salesQuoteCreate__emptyTableMessage">
            <Typography variant="p" as="p">
              No items to display
            </Typography>
          </Box>
        </FlatTableCell>
      </FlatTableRow>
    ),
    [],
  );

  return (
    <Box className="salesQuoteCreate__lineItems">
      <Button variantType="primary" iconType="add" iconPosition="before" onClick={onAddLine}>
        Add
      </Button>

      <Box className="salesQuoteCreate__lineItemsTable">
        <FlatTable width="100%" overflowX="auto">
          <FlatTableHead>
            <FlatTableRow>
              <FlatTableHeader>Product or service</FlatTableHeader>
              <FlatTableHeader>Description</FlatTableHeader>
              <FlatTableHeader align="right">Quantity</FlatTableHeader>
              <FlatTableHeader align="right">Unit price</FlatTableHeader>
              <FlatTableHeader align="right">Discount</FlatTableHeader>
              <FlatTableHeader>Delete</FlatTableHeader>
              <FlatTableHeader>Actions</FlatTableHeader>
            </FlatTableRow>
          </FlatTableHead>
          <FlatTableBody>
            {lineItems.length === 0
              ? emptyState
              : lineItems.map((item) => (
                  <FlatTableRow key={item.id}>
                    <FlatTableCell>{item.productOrService}</FlatTableCell>
                    <FlatTableCell>{item.description}</FlatTableCell>
                    <FlatTableCell align="right">{item.quantity}</FlatTableCell>
                    <FlatTableCell align="right">
                      {gbpFormatter.format(item.unitPriceGbp)}
                    </FlatTableCell>
                    <FlatTableCell align="right">{item.discountPercent}%</FlatTableCell>
                    <FlatTableCell>
                      <IconButton
                        aria-label={`Delete ${item.productOrService}`}
                        onClick={() => onRemoveLine(item.id)}
                      >
                        <Icon type="delete" color="--colorsSemanticNegative500" />
                      </IconButton>
                    </FlatTableCell>
                    <FlatTableCell>
                      <IconButton aria-label={`Edit ${item.productOrService}`}>
                        <Icon type="edit" color="--colorsActionMajor500" />
                      </IconButton>
                    </FlatTableCell>
                  </FlatTableRow>
                ))}
          </FlatTableBody>
        </FlatTable>
      </Box>
    </Box>
  );
}
