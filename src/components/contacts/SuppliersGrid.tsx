import { useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  SageDataGrid,
  type CellClickedEvent,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
} from "../data-grid";
import { suppliers, type Supplier } from "../../data/suppliers";
import { ActiveInactiveStatusCellRenderer } from "./contactGridShared";
import {
  createDeleteCellRenderer,
  createEditCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
} from "../sales-listing/salesGridShared";
import { ROUTES } from "../../routes";

type SuppliersGridProps = {
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function SuppliersGrid({
  quickFilterText = "",
  onDisplayedRowCountChange,
}: SuppliersGridProps) {
  const navigate = useNavigate();
  const gridApiRef = useRef<GridApi<Supplier> | null>(null);

  const columnDefs = useMemo<ColDef<Supplier>[]>(
    () => [
      { field: "supplierCode", headerName: "Supplier code", minWidth: 130 },
      { field: "name", headerName: "Supplier", flex: 1, minWidth: 200 },
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
        field: "balanceOwedGbp",
        headerName: "Balance owed",
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
        cellRenderer: createEditCellRenderer("supplier"),
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
      },
      {
        colId: "delete",
        headerName: "Delete",
        cellRenderer: createDeleteCellRenderer("supplier"),
        sortable: false,
        filter: false,
        minWidth: 80,
        maxWidth: 80,
      },
    ],
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<Supplier>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<Supplier>) => {
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

  const handleCellClicked = useCallback(
    (event: CellClickedEvent<Supplier>) => {
      const colId = event.column.getColId();
      if (colId === "edit" || colId === "delete" || !event.data) {
        return;
      }
      navigate(ROUTES.contacts.supplierDetail(event.data.id));
    },
    [navigate],
  );

  return (
    <SageDataGrid<Supplier>
      containerClassName="sageDataGrid--clickableRows"
      rowData={suppliers}
      columnDefs={columnDefs}
      quickFilterText={quickFilterText}
      onGridReady={handleGridReady}
      onFilterChanged={handleFilterChanged}
      onCellClicked={handleCellClicked}
    />
  );
}
