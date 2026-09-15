import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, type ColDef, type ICellRendererParams } from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";
import Pill from "carbon-react/lib/components/pill";
import {
  getLineAmountWithVat,
  type PurchaseOrderLine,
  type PurchaseOrderLineStatus,
} from "../../data/purchaseOrders";
import {
  createActionsCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
  salesListingGridTheme,
} from "../sales-listing/salesGridShared";

function getLineStatusLabel(status: PurchaseOrderLineStatus) {
  if (status === "available") return "Available";
  if (status === "backordered") return "Backordered";
  return "Received";
}

function getLineStatusColorVariant(status: PurchaseOrderLineStatus) {
  if (status === "available") return "positive" as const;
  if (status === "backordered") return "warning" as const;
  return "information" as const;
}

function LineStatusCellRenderer(
  params: ICellRendererParams<PurchaseOrderLine, PurchaseOrderLineStatus>,
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

type PurchaseOrderLinesGridProps = {
  lines: PurchaseOrderLine[];
};

export default function PurchaseOrderLinesGrid({ lines }: PurchaseOrderLinesGridProps) {
  const columnDefs = useMemo<ColDef<PurchaseOrderLine>[]>(
    () => [
      { field: "itemCode", headerName: "Item", minWidth: 130 },
      { field: "designation", headerName: "Designation", flex: 1, minWidth: 220 },
      {
        field: "quantity",
        headerName: "Quantity",
        type: "rightAligned",
        minWidth: 110,
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
        colId: "amountWithVat",
        headerName: "Amount with VAT",
        type: "rightAligned",
        valueGetter: (params) => (params.data ? getLineAmountWithVat(params.data) : null),
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 150,
      },
      { field: "deliverySite", headerName: "Delivery site", minWidth: 150 },
      {
        field: "expectedDate",
        headerName: "Expected date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 140,
      },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: LineStatusCellRenderer,
        minWidth: 130,
        maxWidth: 150,
      },
      {
        colId: "actions",
        headerName: "Actions",
        cellRenderer: createActionsCellRenderer("order line"),
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

  const defaultColDef = useMemo<ColDef<PurchaseOrderLine>>(
    () => ({
      sortable: true,
      resizable: true,
      suppressMovable: true,
    }),
    [],
  );

  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className="salesGrid salesGrid--wide purchaseOrderDetail__linesGrid">
        <AgGridReact<PurchaseOrderLine>
          theme={salesListingGridTheme}
          rowData={lines}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressCellFocus
          animateRows={false}
          headerHeight={40}
          rowHeight={44}
          domLayout="autoHeight"
        />
      </div>
    </AgGridProvider>
  );
}
