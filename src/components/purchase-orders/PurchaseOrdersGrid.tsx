import { useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  SageDataGrid,
  type CellClickedEvent,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
  type ICellRendererParams,
} from "../data-grid";
import Pill from "../status-pill/StatusPill";
import type { PurchaseOrder, PurchaseOrderStatus } from "../../data/purchaseOrders";
import {
  createActionsCellRenderer,
  createEditCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
} from "../sales-listing/salesGridShared";
import { ROUTES } from "../../routes";

function getStatusLabel(status: PurchaseOrderStatus) {
  if (status === "awaiting-approval") return "Awaiting approval";
  if (status === "approved") return "Approved";
  if (status === "partially-received") return "Partially received";
  return "Received";
}

function getStatusColorVariant(status: PurchaseOrderStatus) {
  if (status === "awaiting-approval") return "neutral" as const;
  if (status === "approved") return "information" as const;
  if (status === "partially-received") return "warning" as const;
  return "positive" as const;
}

function PurchaseOrderStatusCellRenderer(
  params: ICellRendererParams<PurchaseOrder, PurchaseOrderStatus>,
) {
  const status = params.value;
  if (!status) return null;

  return (
    <span className="salesGrid__status">
      <Pill pillRole="status" colorVariant={getStatusColorVariant(status)}>
        {getStatusLabel(status)}
      </Pill>
    </span>
  );
}

type PurchaseOrdersGridProps = {
  rowData: PurchaseOrder[];
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function PurchaseOrdersGrid({
  rowData,
  quickFilterText = "",
  onDisplayedRowCountChange,
}: PurchaseOrdersGridProps) {
  const navigate = useNavigate();
  const gridApiRef = useRef<GridApi<PurchaseOrder> | null>(null);

  const columnDefs = useMemo<ColDef<PurchaseOrder>[]>(
    () => [
      {
        field: "orderId",
        headerName: "Order ID",
        minWidth: 140,
      },
      {
        field: "supplier",
        headerName: "Supplier",
        flex: 1,
        minWidth: 180,
      },
      {
        field: "orderDate",
        headerName: "Order date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 130,
      },
      {
        field: "purchasingSite",
        headerName: "Purchasing site",
        minWidth: 150,
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
        field: "earliestExpectedDate",
        headerName: "Earliest expected date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 170,
      },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: PurchaseOrderStatusCellRenderer,
        minWidth: 170,
        maxWidth: 190,
      },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: createEditCellRenderer("purchase order"),
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
        pinned: "right",
        lockPinned: true,
      },
      {
        colId: "actions",
        headerName: "Actions",
        cellRenderer: createActionsCellRenderer("purchase order"),
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

  const updateDisplayedCount = useCallback(
    (api: GridApi<PurchaseOrder>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<PurchaseOrder>) => {
      gridApiRef.current = event.api;
      updateDisplayedCount(event.api);
    },
    [updateDisplayedCount],
  );

  const handleFilterChanged = useCallback(() => {
    if (gridApiRef.current) {
      updateDisplayedCount(gridApiRef.current);
    }
  }, [updateDisplayedCount]);

  const handleRowDataUpdated = useCallback(() => {
    if (gridApiRef.current) {
      updateDisplayedCount(gridApiRef.current);
    }
  }, [updateDisplayedCount]);

  const handleCellClicked = useCallback(
    (event: CellClickedEvent<PurchaseOrder>) => {
      const colId = event.column.getColId();
      if (colId === "edit" || colId === "actions" || !event.data) {
        return;
      }
      navigate(ROUTES.purchases.orderDetail(event.data.id));
    },
    [navigate],
  );

  return (
    <SageDataGrid<PurchaseOrder>
      containerClassName="sageDataGrid--clickableRows"
      rowData={rowData}
      columnDefs={columnDefs}
      quickFilterText={quickFilterText}
      onGridReady={handleGridReady}
      onFilterChanged={handleFilterChanged}
      onRowDataUpdated={handleRowDataUpdated}
      onCellClicked={handleCellClicked}
    />
  );
}
