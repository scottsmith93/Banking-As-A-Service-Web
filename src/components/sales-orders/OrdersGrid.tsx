import { useCallback, useMemo, useRef } from "react";
import {
  SageDataGrid,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
} from "../data-grid";
import { salesOrders, type SalesOrder } from "../../data/orders";
import {
  createDeleteCellRenderer,
  createEditCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
  PendingClosedStatusCellRenderer,
} from "../sales-listing/salesGridShared";

type OrdersGridProps = {
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function OrdersGrid({
  quickFilterText = "",
  onDisplayedRowCountChange,
}: OrdersGridProps) {
  const gridApiRef = useRef<GridApi<SalesOrder> | null>(null);

  const columnDefs = useMemo<ColDef<SalesOrder>[]>(
    () => [
      {
        field: "status",
        headerName: "Status",
        cellRenderer: PendingClosedStatusCellRenderer,
        minWidth: 120,
        maxWidth: 140,
      },
      {
        field: "orderDate",
        headerName: "Order date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 130,
      },
      {
        field: "orderNumber",
        headerName: "Order number",
        minWidth: 140,
      },
      {
        field: "reference",
        headerName: "Reference",
        minWidth: 120,
      },
      {
        field: "customerCode",
        headerName: "Customer code",
        minWidth: 130,
      },
      {
        field: "customerName",
        headerName: "Customer",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "totalGbp",
        headerName: "Total",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 120,
      },
      {
        field: "taxableAmountGbp",
        headerName: "Taxable amount",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 150,
      },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: createEditCellRenderer("order"),
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
      },
      {
        colId: "delete",
        headerName: "Delete",
        cellRenderer: createDeleteCellRenderer("order"),
        sortable: false,
        filter: false,
        minWidth: 80,
        maxWidth: 80,
      },
    ],
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<SalesOrder>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<SalesOrder>) => {
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

  return (
    <SageDataGrid<SalesOrder>
      rowData={salesOrders}
      columnDefs={columnDefs}
      quickFilterText={quickFilterText}
      onGridReady={handleGridReady}
      onFilterChanged={handleFilterChanged}
    />
  );
}
