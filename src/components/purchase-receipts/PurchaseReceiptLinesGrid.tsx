import { useMemo } from "react";
import { SageDataGrid, type ColDef, type ICellRendererParams } from "../data-grid";
import Pill from "carbon-react/lib/components/pill";
import type { PurchaseReceiptLine, PurchaseReceiptLineStatus } from "../../data/purchaseReceipts";
import {
  createActionsCellRenderer,
  formatCurrencyGbp,
} from "../sales-listing/salesGridShared";

function getLineStatusLabel(status: PurchaseReceiptLineStatus) {
  if (status === "created") return "Created";
  if (status === "invoiced") return "Invoiced";
  return "Returned";
}

function getLineStatusColorVariant(status: PurchaseReceiptLineStatus) {
  if (status === "created") return "information" as const;
  if (status === "invoiced") return "positive" as const;
  return "negative" as const;
}

function LineStatusCellRenderer(
  params: ICellRendererParams<PurchaseReceiptLine, PurchaseReceiptLineStatus>,
) {
  const status = params.value;
  if (!status) return null;

  return (
    <span className="salesGrid__status">
      <Pill pillRole="status" colorVariant={getLineStatusColorVariant(status)} fill>
        {getLineStatusLabel(status)}
      </Pill>
    </span>
  );
}

type PurchaseReceiptLinesGridProps = {
  lines: PurchaseReceiptLine[];
};

export default function PurchaseReceiptLinesGrid({ lines }: PurchaseReceiptLinesGridProps) {
  const columnDefs = useMemo<ColDef<PurchaseReceiptLine>[]>(
    () => [
      {
        field: "status",
        headerName: "Status",
        cellRenderer: LineStatusCellRenderer,
        minWidth: 130,
        maxWidth: 150,
      },
      { field: "origin", headerName: "Origin", minWidth: 130 },
      { field: "itemName", headerName: "Item", flex: 1, minWidth: 220 },
      { field: "itemId", headerName: "Item ID", minWidth: 120 },
      {
        field: "quantityPurchaseUnit",
        headerName: "Quantity in purchase unit",
        type: "rightAligned",
        minWidth: 170,
      },
      {
        field: "grossPriceGbp",
        headerName: "Gross price",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 130,
      },
      {
        field: "netPriceGbp",
        headerName: "Net price",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 120,
      },
      {
        field: "totalTaxGbp",
        headerName: "Total tax",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 120,
      },
      {
        field: "totalIncludingTaxGbp",
        headerName: "Total including tax",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 160,
      },
      {
        colId: "actions",
        headerName: "Actions",
        cellRenderer: createActionsCellRenderer("receipt line"),
        sortable: false,
        filter: false,
        minWidth: 88,
        maxWidth: 88,
        pinned: "right",
        lockPinned: true,
      },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef<PurchaseReceiptLine>>(
    () => ({ filter: false }),
    [],
  );

  return (
    <SageDataGrid<PurchaseReceiptLine>
      containerClassName="purchaseOrderDetail__linesGrid"
      rowData={lines}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      domLayout="autoHeight"
    />
  );
}
