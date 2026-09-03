import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import { Checkbox } from "carbon-react/lib/components/checkbox";
import DateInput from "carbon-react/lib/components/date";
import Decimal from "carbon-react/lib/components/decimal";
import {
  FlatTable,
  FlatTableBody,
  FlatTableCell,
  FlatTableHead,
  FlatTableHeader,
  FlatTableRow,
} from "carbon-react/lib/components/flat-table";
import Form from "carbon-react/lib/components/form";
import { Option, Select } from "carbon-react/lib/components/select";
import Sidebar from "carbon-react/lib/components/sidebar";
import Typography from "carbon-react/lib/components/typography";
import FooterKpiTile from "../FooterKpiTile";
import type { PurchaseOrder } from "../../data/purchaseOrders";
import { createPurchaseReceipt, type PurchaseReceipt } from "../../data/purchaseReceipts";
import { formatCurrencyGbp, formatListingDate } from "../sales-listing/salesGridShared";

const receivingSiteOptions = ["London DC", "Manchester Hub", "Bristol Warehouse", "Leeds Depot"] as const;

type ReceiptLineDraft = {
  lineId: string;
  itemCode: string;
  designation: string;
  orderedQuantity: number;
  receivingQuantity: number;
  netPriceGbp: number;
  selected: boolean;
};

type CreatePurchaseReceiptPanelProps = {
  open: boolean;
  order: PurchaseOrder;
  onCancel: () => void;
  onConfirm: (receipt: PurchaseReceipt) => void;
};

function todayIso() {
  return new Date().toLocaleDateString("en-GB");
}

export default function CreatePurchaseReceiptPanel({
  open,
  order,
  onCancel,
  onConfirm,
}: CreatePurchaseReceiptPanelProps) {
  const [receiptDate, setReceiptDate] = useState(todayIso());
  const [receivingSite, setReceivingSite] = useState(order.purchasingSite);
  const [lines, setLines] = useState<ReceiptLineDraft[]>(() =>
    order.lines.map((line) => ({
      lineId: line.id,
      itemCode: line.itemCode,
      designation: line.designation,
      orderedQuantity: line.quantity,
      receivingQuantity: line.quantity,
      netPriceGbp: line.netPriceGbp,
      selected: true,
    })),
  );

  const updateLine = (lineId: string, patch: Partial<ReceiptLineDraft>) => {
    setLines((current) => current.map((line) => (line.lineId === lineId ? { ...line, ...patch } : line)));
  };

  const handleReceiveAllLines = () => {
    setLines((current) =>
      current.map((line) => ({ ...line, selected: true, receivingQuantity: line.orderedQuantity })),
    );
  };

  const orderedTotalQuantity = lines.reduce((sum, line) => sum + line.orderedQuantity, 0);
  const receivingTotalQuantity = lines
    .filter((line) => line.selected)
    .reduce((sum, line) => sum + line.receivingQuantity, 0);
  const remainingQuantity = orderedTotalQuantity - receivingTotalQuantity;

  const receiptTotalGbp = lines
    .filter((line) => line.selected)
    .reduce((sum, line) => sum + line.receivingQuantity * line.netPriceGbp * 1.2, 0);

  const canConfirm = lines.some((line) => line.selected && line.receivingQuantity > 0);

  const handleConfirm = () => {
    if (!canConfirm) return;

    const [day, month, year] = receiptDate.split("/");

    const receipt = createPurchaseReceipt({
      supplier: order.supplier,
      receivingSite,
      receiptDate: `${year}-${month}-${day}`,
      lines: lines
        .filter((line) => line.selected && line.receivingQuantity > 0)
        .map((line) => ({
          origin: order.orderId,
          itemName: line.designation,
          itemId: line.itemCode,
          quantityPurchaseUnit: line.receivingQuantity,
          grossPriceGbp: line.netPriceGbp,
          netPriceGbp: line.netPriceGbp,
        })),
    });

    onConfirm(receipt);
  };

  return (
    <Sidebar
      open={open}
      onCancel={onCancel}
      position="right"
      width="820px"
      header={
        <Typography variant="h1" as="h1" className="createReceiptPanel__title">
          Create purchase receipt
        </Typography>
      }
      subHeader={
        <Typography variant="p" as="p" className="createReceiptPanel__subtitle">
          Against purchase order {order.orderId} dated {formatListingDate(order.orderDate)}
        </Typography>
      }
    >
      <Form
        stickyFooter
        stickyFooterVariant="light"
        height="100%"
        footerPadding={{ py: 0, px: 4 }}
        footerChildren={
          <Box
            className="createReceiptPanel__footer"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box className="createReceiptPanel__footerKpis" display="flex">
              <FooterKpiTile amount={String(receivingTotalQuantity)} label="Items to receive" />
              <FooterKpiTile amount={formatCurrencyGbp(receiptTotalGbp)} label="Receipt total" />
            </Box>

            <Box
              className="createReceiptPanel__footerActions"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Button variantType="tertiary" onClick={onCancel}>
                Cancel
              </Button>
              <Button variantType="primary" disabled={!canConfirm} onClick={handleConfirm}>
                Confirm
              </Button>
            </Box>
          </Box>
        }
      >
        <Box className="createReceiptPanel">
          <Box className="createReceiptPanel__fields" display="flex" gap={3}>
            <Box className="createReceiptPanel__field">
              <DateInput
                id="create-receipt-date"
                label="Receipt date"
                required
                value={receiptDate}
                onChange={(event) => setReceiptDate(event.target.value.formattedValue)}
              />
            </Box>
            <Box className="createReceiptPanel__field">
              <Select
                id="create-receipt-site"
                label="Receiving site"
                required
                value={receivingSite}
                onChange={(event) => setReceivingSite(event.target.value as string)}
              >
                {receivingSiteOptions.map((site) => (
                  <Option key={site} text={site} value={site} />
                ))}
              </Select>
            </Box>
          </Box>

          <Box
            className="createReceiptPanel__linesHeader"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h2" as="h2" className="createReceiptPanel__linesHeading">
              Receipt lines
            </Typography>
            <Button variantType="secondary" onClick={handleReceiveAllLines}>
              Receive all lines
            </Button>
          </Box>

          <Box className="createReceiptPanel__kpis" display="flex">
            <FooterKpiTile amount={String(orderedTotalQuantity)} label="Ordered quantity" />
            <FooterKpiTile amount={String(receivingTotalQuantity)} label="Receiving now" />
            <FooterKpiTile amount={String(remainingQuantity)} label="Remaining to receive" />
          </Box>

          <Box className="createReceiptPanel__table">
            <FlatTable width="100%" overflowX="auto">
              <FlatTableHead>
                <FlatTableRow>
                  <FlatTableHeader />
                  <FlatTableHeader>Item</FlatTableHeader>
                  <FlatTableHeader>Item code</FlatTableHeader>
                  <FlatTableHeader align="right">Ordered quantity</FlatTableHeader>
                  <FlatTableHeader align="right">Quantity to receive</FlatTableHeader>
                  <FlatTableHeader align="right">Net price</FlatTableHeader>
                  <FlatTableHeader align="right">Line total</FlatTableHeader>
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                {lines.map((line) => (
                  <FlatTableRow key={line.lineId}>
                    <FlatTableCell>
                      <Checkbox
                        label=""
                        aria-label={`Include ${line.designation}`}
                        checked={line.selected}
                        onChange={(event) =>
                          updateLine(line.lineId, { selected: event.target.checked })
                        }
                      />
                    </FlatTableCell>
                    <FlatTableCell>{line.designation}</FlatTableCell>
                    <FlatTableCell>{line.itemCode}</FlatTableCell>
                    <FlatTableCell align="right">{line.orderedQuantity}</FlatTableCell>
                    <FlatTableCell align="right">
                      <Decimal
                        id={`${line.lineId}-receiving-qty`}
                        aria-label={`Quantity to receive for ${line.designation}`}
                        precision={0}
                        align="right"
                        disabled={!line.selected}
                        value={String(line.receivingQuantity)}
                        onChange={(event) =>
                          updateLine(line.lineId, {
                            receivingQuantity: Math.min(
                              line.orderedQuantity,
                              Number(event.target.value.rawValue) || 0,
                            ),
                          })
                        }
                      />
                    </FlatTableCell>
                    <FlatTableCell align="right">{formatCurrencyGbp(line.netPriceGbp)}</FlatTableCell>
                    <FlatTableCell align="right">
                      {formatCurrencyGbp(
                        line.selected ? line.receivingQuantity * line.netPriceGbp * 1.2 : 0,
                      )}
                    </FlatTableCell>
                  </FlatTableRow>
                ))}
              </FlatTableBody>
            </FlatTable>
          </Box>
        </Box>
      </Form>
    </Sidebar>
  );
}
