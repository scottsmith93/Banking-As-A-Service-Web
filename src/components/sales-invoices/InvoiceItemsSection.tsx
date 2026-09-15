import { ActionPopover, ActionPopoverItem } from "carbon-react/lib/components/action-popover";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import { Tile, TileContent } from "carbon-react/lib/components/tile";
import Typography from "carbon-react/lib/components/typography";
import type { InvoiceLineItem } from "../../data/invoiceCreateForm";
import type { InvoiceSummary } from "../../utils/calculateInvoiceTotals";
import { calculateLineTaxableAmount } from "../../utils/calculateInvoiceTotals";
import InvoiceLineItemFields from "./InvoiceLineItemFields";
import InvoicePaymentTotalsPanel from "./InvoicePaymentTotalsPanel";

type InvoiceItemsSectionProps = {
  fieldIdPrefix: string;
  hasCustomer: boolean;
  lineItems: InvoiceLineItem[];
  draftProductOrService: string;
  draftQuantity: string;
  draftUnitPrice: string;
  draftDiscount: string;
  draftVat: string;
  onDraftProductOrServiceChange: (value: string) => void;
  onDraftProductOrServiceBlur: () => void;
  onDraftQuantityChange: (value: string) => void;
  onDraftUnitPriceChange: (value: string) => void;
  onDraftDiscountChange: (value: string) => void;
  onDraftVatChange: (value: string) => void;
  onRemoveLine: (id: string) => void;
  onUpdateLine: (id: string, patch: Partial<InvoiceLineItem>) => void;
  summary: InvoiceSummary;
  customerDiscountPercent: string;
  onCustomerDiscountPercentChange: (value: string) => void;
};

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <Box
      className="salesInvoiceCreate__itemsEmptyState"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        className="salesInvoiceCreate__itemsEmptyIcon"
        aria-hidden="true"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Icon type="individual" color="--colorsUtilityYang100" />
      </Box>
      <Typography variant="h4" as="p" className="salesInvoiceCreate__itemsEmptyTitle">
        {title}
      </Typography>
      <Typography variant="p" as="p" className="salesInvoiceCreate__itemsEmptyMessage">
        {message}
      </Typography>
    </Box>
  );
}

export default function InvoiceItemsSection({
  fieldIdPrefix,
  hasCustomer,
  lineItems,
  draftProductOrService,
  draftQuantity,
  draftUnitPrice,
  draftDiscount,
  draftVat,
  onDraftProductOrServiceChange,
  onDraftProductOrServiceBlur,
  onDraftQuantityChange,
  onDraftUnitPriceChange,
  onDraftDiscountChange,
  onDraftVatChange,
  onRemoveLine,
  onUpdateLine,
  summary,
  customerDiscountPercent,
  onCustomerDiscountPercentChange,
}: InvoiceItemsSectionProps) {
  const draftTaxableAmount = calculateLineTaxableAmount({
    quantity: Number(draftQuantity) || 0,
    unitPriceGbp: Number(draftUnitPrice) || 0,
    discountPercent: Number(draftDiscount) || 0,
  }).toFixed(2);

  return (
    <Box className="salesInvoiceCreate__itemsCard">
      <Tile roundness="default" p={3}>
        <TileContent>
          <Box
            className="salesInvoiceCreate__sectionHeader"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              alignItems="center"
              className="salesInvoiceCreate__sectionTitleGroup"
            >
              <Icon type="chart_bar" color="--colorsActionMajor500" />
              <Typography variant="strong" as="p" className="salesInvoiceCreate__sectionTitle">
                Invoice items
              </Typography>
            </Box>
            <Button variantType="subtle" iconType="filter_new" iconPosition="before">
              Customize
            </Button>
          </Box>

          {hasCustomer &&
            lineItems.map((item) => (
              <InvoiceLineItemFields
                key={item.id}
                idPrefix={`${fieldIdPrefix}-item-${item.id}`}
                showLabels={false}
                productOrServiceId={item.productOrServiceId}
                quantity={item.quantity.toFixed(2)}
                unitPrice={item.unitPriceGbp.toFixed(2)}
                discountPercent={item.discountPercent.toFixed(2)}
                taxableAmount={calculateLineTaxableAmount(item).toFixed(2)}
                vatPercent={item.vatPercent.toFixed(2)}
                onProductOrServiceChange={(value) =>
                  onUpdateLine(item.id, { productOrServiceId: value })
                }
                onQuantityChange={(value) =>
                  onUpdateLine(item.id, { quantity: Number(value) || 0 })
                }
                onUnitPriceChange={(value) =>
                  onUpdateLine(item.id, { unitPriceGbp: Number(value) || 0 })
                }
                onDiscountPercentChange={(value) =>
                  onUpdateLine(item.id, { discountPercent: Number(value) || 0 })
                }
                onVatPercentChange={(value) =>
                  onUpdateLine(item.id, { vatPercent: Number(value) || 0 })
                }
                action={
                  <ActionPopover aria-label={`Actions for line item ${item.id}`}>
                    <ActionPopoverItem icon="delete" onClick={() => onRemoveLine(item.id)}>
                      Delete
                    </ActionPopoverItem>
                  </ActionPopover>
                }
              />
            ))}

          <InvoiceLineItemFields
            idPrefix={`${fieldIdPrefix}-item-draft`}
            showLabels={lineItems.length === 0}
            disabled={!hasCustomer}
            productOrServiceId={draftProductOrService}
            quantity={draftQuantity}
            unitPrice={draftUnitPrice}
            discountPercent={draftDiscount}
            taxableAmount={draftTaxableAmount}
            vatPercent={draftVat}
            onProductOrServiceChange={hasCustomer ? onDraftProductOrServiceChange : undefined}
            onProductOrServiceBlur={hasCustomer ? onDraftProductOrServiceBlur : undefined}
            onQuantityChange={hasCustomer ? onDraftQuantityChange : undefined}
            onUnitPriceChange={hasCustomer ? onDraftUnitPriceChange : undefined}
            onDiscountPercentChange={hasCustomer ? onDraftDiscountChange : undefined}
            onVatPercentChange={hasCustomer ? onDraftVatChange : undefined}
          />

          {!hasCustomer && (
            <EmptyState title="Select a customer first" message="No invoice items to display" />
          )}

          {hasCustomer && (
            <InvoicePaymentTotalsPanel
              fieldIdPrefix={fieldIdPrefix}
              summary={summary}
              customerDiscountPercent={customerDiscountPercent}
              onCustomerDiscountPercentChange={onCustomerDiscountPercentChange}
            />
          )}
        </TileContent>
      </Tile>
    </Box>
  );
}
