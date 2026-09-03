import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import DateInput from "carbon-react/lib/components/date";
import Decimal from "carbon-react/lib/components/decimal";
import Form from "carbon-react/lib/components/form";
import Icon from "carbon-react/lib/components/icon";
import IconButton from "carbon-react/lib/components/icon-button";
import {
  FlatTable,
  FlatTableBody,
  FlatTableCell,
  FlatTableHead,
  FlatTableHeader,
  FlatTableRow,
} from "carbon-react/lib/components/flat-table";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import DocumentHeaderCard from "../../components/document-header/DocumentHeaderCard";
import { createPurchaseOrder } from "../../data/purchaseOrders";
import { ROUTES } from "../../routes";

const supplierOptions = [
  "Air France",
  "SFR",
  "Airbnb",
  "British Telecom",
  "Amazon Web Services",
  "Office Supplies Direct",
  "National Grid",
  "FedEx UK",
  "Adobe Systems",
  "Sage Software",
] as const;

const purchasingSiteOptions = ["London DC", "Manchester Hub", "Bristol Warehouse", "Leeds Depot"] as const;

type DraftLine = {
  id: string;
  itemCode: string;
  designation: string;
  quantity: number;
  netPriceGbp: number;
};

type PrefillState = {
  supplier?: string;
  purchasingSite?: string;
  itemName?: string;
  itemCode?: string;
  quantity?: number;
  unitPriceGbp?: number;
};

function todayIso() {
  return new Date().toLocaleDateString("en-GB");
}

function inWeekIso() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toLocaleDateString("en-GB");
}

let draftLineSequence = 0;
function nextDraftLineId() {
  draftLineSequence += 1;
  return `draft-line-${draftLineSequence}`;
}

export default function PurchaseOrderCreatePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefill = (location.state as PrefillState | null) ?? {};

  const handleClose = () => navigate(ROUTES.purchases.orders);

  const [supplier, setSupplier] = useState(prefill.supplier ?? supplierOptions[0]);
  const [purchasingSite, setPurchasingSite] = useState(prefill.purchasingSite ?? purchasingSiteOptions[0]);
  const [orderDate, setOrderDate] = useState(todayIso());
  const [earliestExpectedDate, setEarliestExpectedDate] = useState(inWeekIso());
  const [lines, setLines] = useState<DraftLine[]>(() =>
    prefill.itemName
      ? [
          {
            id: nextDraftLineId(),
            itemCode: prefill.itemCode ?? "",
            designation: prefill.itemName,
            quantity: prefill.quantity ?? 1,
            netPriceGbp: prefill.unitPriceGbp ?? 0,
          },
        ]
      : [],
  );

  const handleAddLine = () => {
    setLines((current) => [
      ...current,
      { id: nextDraftLineId(), itemCode: "", designation: "", quantity: 1, netPriceGbp: 0 },
    ]);
  };

  const handleRemoveLine = (id: string) => {
    setLines((current) => current.filter((line) => line.id !== id));
  };

  const updateLine = (id: string, patch: Partial<DraftLine>) => {
    setLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)));
  };

  const canSubmit = lines.length > 0 && lines.every((line) => line.designation.trim().length > 0);

  const handleSubmit = () => {
    if (!canSubmit) return;

    const [orderDay, orderMonth, orderYear] = orderDate.split("/");
    const [expectedDay, expectedMonth, expectedYear] = earliestExpectedDate.split("/");

    const order = createPurchaseOrder({
      supplier,
      purchasingSite,
      orderDate: `${orderYear}-${orderMonth}-${orderDay}`,
      earliestExpectedDate: `${expectedYear}-${expectedMonth}-${expectedDay}`,
      lines: lines.map((line) => ({
        itemCode: line.itemCode || "ITM-NEW",
        designation: line.designation,
        quantity: line.quantity,
        netPriceGbp: line.netPriceGbp,
      })),
    });

    navigate(ROUTES.purchases.orderDetail(order.id));
  };

  return (
    <Box className="pageContent salesQuoteCreate">
      <Form
        stickyFooter
        stickyFooterVariant="light"
        height="100%"
        footerPadding={{ py: 0, px: 4 }}
        footerChildren={
          <Box
            className="createRecord__footer"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            gap={2}
          >
            <Button variantType="tertiary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variantType="primary" disabled={!canSubmit} onClick={handleSubmit}>
              Submit for approval
            </Button>
          </Box>
        }
      >
        <Box
          className="salesQuoteCreate__header"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h1" as="h1" className="salesQuoteCreate__title">
            Create purchase order
          </Typography>
          <IconButton aria-label="Close create purchase order" onClick={handleClose}>
            <Icon type="close" />
          </IconButton>
        </Box>

        <Box className="salesQuoteCreate__fieldsCard">
          <DocumentHeaderCard
            showDivider={false}
            sections={[
              <Box key="supplier" className="purchaseOrderDetail__infoFields" display="flex" gap={2}>
                <Box className="purchaseOrderDetail__infoField">
                  <Select
                    id="purchase-order-create-supplier"
                    label="Supplier"
                    required
                    value={supplier}
                    onChange={(event) => setSupplier(event.target.value as string)}
                  >
                    {supplierOptions.map((option) => (
                      <Option key={option} text={option} value={option} />
                    ))}
                  </Select>
                </Box>
                <Box className="purchaseOrderDetail__infoField">
                  <Select
                    id="purchase-order-create-site"
                    label="Purchasing site"
                    required
                    value={purchasingSite}
                    onChange={(event) => setPurchasingSite(event.target.value as string)}
                  >
                    {purchasingSiteOptions.map((option) => (
                      <Option key={option} text={option} value={option} />
                    ))}
                  </Select>
                </Box>
              </Box>,
              <Box key="dates" className="purchaseOrderDetail__infoFields" display="flex" gap={2}>
                <Box className="purchaseOrderDetail__infoField">
                  <DateInput
                    id="purchase-order-create-order-date"
                    label="Order date"
                    required
                    value={orderDate}
                    onChange={(event) => setOrderDate(event.target.value.formattedValue)}
                  />
                </Box>
                <Box className="purchaseOrderDetail__infoField">
                  <DateInput
                    id="purchase-order-create-expected-date"
                    label="Earliest expected date"
                    required
                    value={earliestExpectedDate}
                    onChange={(event) => setEarliestExpectedDate(event.target.value.formattedValue)}
                  />
                </Box>
              </Box>,
            ]}
          />
        </Box>

        <Box className="salesQuoteCreate__lineItems">
          <Button variantType="primary" iconType="add" iconPosition="before" onClick={handleAddLine}>
            Add line
          </Button>

          <Box className="salesQuoteCreate__lineItemsTable">
            <FlatTable width="100%" overflowX="auto">
              <FlatTableHead>
                <FlatTableRow>
                  <FlatTableHeader>Item code</FlatTableHeader>
                  <FlatTableHeader>Designation</FlatTableHeader>
                  <FlatTableHeader align="right">Quantity</FlatTableHeader>
                  <FlatTableHeader align="right">Net price</FlatTableHeader>
                  <FlatTableHeader>Delete</FlatTableHeader>
                </FlatTableRow>
              </FlatTableHead>
              <FlatTableBody>
                {lines.length === 0 ? (
                  <FlatTableRow>
                    <FlatTableCell colspan={5}>
                      <Box className="salesQuoteCreate__emptyTableMessage">
                        <Typography variant="p" as="p">
                          No lines yet — add one to build this order.
                        </Typography>
                      </Box>
                    </FlatTableCell>
                  </FlatTableRow>
                ) : (
                  lines.map((line) => (
                    <FlatTableRow key={line.id}>
                      <FlatTableCell>
                        <Textbox
                          id={`${line.id}-code`}
                          aria-label="Item code"
                          value={line.itemCode}
                          onChange={(event) => updateLine(line.id, { itemCode: event.target.value })}
                        />
                      </FlatTableCell>
                      <FlatTableCell>
                        <Textbox
                          id={`${line.id}-designation`}
                          aria-label="Designation"
                          value={line.designation}
                          onChange={(event) =>
                            updateLine(line.id, { designation: event.target.value })
                          }
                        />
                      </FlatTableCell>
                      <FlatTableCell align="right">
                        <Decimal
                          id={`${line.id}-quantity`}
                          aria-label="Quantity"
                          precision={0}
                          align="right"
                          value={String(line.quantity)}
                          onChange={(event) =>
                            updateLine(line.id, {
                              quantity: Number(event.target.value.rawValue) || 0,
                            })
                          }
                        />
                      </FlatTableCell>
                      <FlatTableCell align="right">
                        <Decimal
                          id={`${line.id}-price`}
                          aria-label="Net price"
                          precision={2}
                          align="right"
                          value={line.netPriceGbp.toFixed(2)}
                          onChange={(event) =>
                            updateLine(line.id, {
                              netPriceGbp: Number(event.target.value.rawValue) || 0,
                            })
                          }
                        />
                      </FlatTableCell>
                      <FlatTableCell>
                        <IconButton
                          aria-label={`Delete ${line.designation || "line"}`}
                          onClick={() => handleRemoveLine(line.id)}
                        >
                          <Icon type="delete" color="--colorsSemanticNegative500" />
                        </IconButton>
                      </FlatTableCell>
                    </FlatTableRow>
                  ))
                )}
              </FlatTableBody>
            </FlatTable>
          </Box>
        </Box>
      </Form>
    </Box>
  );
}
