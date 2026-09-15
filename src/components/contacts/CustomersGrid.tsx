import { useCallback, useMemo, useRef } from "react";
import {
  SageDataGrid,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
} from "../data-grid";
import { customers, type Customer } from "../../data/customers";
import { ActiveInactiveStatusCellRenderer } from "./contactGridShared";
import {
  createDeleteCellRenderer,
  createEditCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
} from "../sales-listing/salesGridShared";

type CustomersGridProps = {
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function CustomersGrid({
  quickFilterText = "",
  onDisplayedRowCountChange,
}: CustomersGridProps) {
  const gridApiRef = useRef<GridApi<Customer> | null>(null);

  const columnDefs = useMemo<ColDef<Customer>[]>(
    () => [
      { field: "customerCode", headerName: "Customer code", minWidth: 130 },
      { field: "name", headerName: "Customer", flex: 1, minWidth: 220 },
      { field: "contactName", headerName: "Contact", minWidth: 160 },
      { field: "email", headerName: "Email", minWidth: 220 },
      { field: "phone", headerName: "Phone", minWidth: 140 },
      { field: "town", headerName: "Town", minWidth: 120 },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: ActiveInactiveStatusCellRenderer,
        minWidth: 110,
        maxWidth: 120,
      },
      {
        field: "balanceDueGbp",
        headerName: "Balance due",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 130,
      },
      {
        field: "lastActivity",
        headerName: "Last activity",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 130,
      },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: createEditCellRenderer("customer"),
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
      },
      {
        colId: "delete",
        headerName: "Delete",
        cellRenderer: createDeleteCellRenderer("customer"),
        sortable: false,
        filter: false,
        minWidth: 80,
        maxWidth: 80,
      },
    ],
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<Customer>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<Customer>) => {
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
    <SageDataGrid<Customer>
      rowData={customers}
      columnDefs={columnDefs}
      quickFilterText={quickFilterText}
      onGridReady={handleGridReady}
      onFilterChanged={handleFilterChanged}
    />
  );
}
