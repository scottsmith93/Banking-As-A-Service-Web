import { useCallback, useMemo, useRef } from "react";
import {
  SageDataGrid,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
} from "../data-grid";
import { discountGroups, type DiscountGroup } from "../../data/discountGroups";
import { ActiveCellRenderer } from "../sales-listing/activeCellRenderer";
import {
  createDeleteCellRenderer,
  createEditCellRenderer,
  formatListingDate,
} from "../sales-listing/salesGridShared";

type DiscountGroupsGridProps = {
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function DiscountGroupsGrid({
  quickFilterText = "",
  onDisplayedRowCountChange,
}: DiscountGroupsGridProps) {
  const gridApiRef = useRef<GridApi<DiscountGroup> | null>(null);

  const columnDefs = useMemo<ColDef<DiscountGroup>[]>(
    () => [
      { field: "code", headerName: "Code", minWidth: 100 },
      { field: "name", headerName: "Name", flex: 1, minWidth: 140 },
      {
        field: "startDate",
        headerName: "Start date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 130,
      },
      {
        field: "endDate",
        headerName: "End date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 130,
      },
      {
        field: "active",
        headerName: "Active",
        cellRenderer: ActiveCellRenderer,
        minWidth: 90,
        maxWidth: 100,
      },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: createEditCellRenderer("discount group"),
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
      },
      {
        colId: "delete",
        headerName: "Delete",
        cellRenderer: createDeleteCellRenderer("discount group"),
        sortable: false,
        filter: false,
        minWidth: 80,
        maxWidth: 80,
      },
    ],
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<DiscountGroup>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<DiscountGroup>) => {
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
    <SageDataGrid<DiscountGroup>
      rowData={discountGroups}
      columnDefs={columnDefs}
      quickFilterText={quickFilterText}
      onGridReady={handleGridReady}
      onFilterChanged={handleFilterChanged}
    />
  );
}
