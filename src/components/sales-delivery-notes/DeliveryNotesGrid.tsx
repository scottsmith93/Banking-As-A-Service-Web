import { useCallback, useMemo, useRef } from "react";
import {
  SageDataGrid,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
} from "../data-grid";
import { deliveryNotes, type DeliveryNote } from "../../data/deliveryNotes";
import {
  createDeleteCellRenderer,
  createEditCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
  PendingClosedStatusCellRenderer,
} from "../sales-listing/salesGridShared";

type DeliveryNotesGridProps = {
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function DeliveryNotesGrid({
  quickFilterText = "",
  onDisplayedRowCountChange,
}: DeliveryNotesGridProps) {
  const gridApiRef = useRef<GridApi<DeliveryNote> | null>(null);

  const columnDefs = useMemo<ColDef<DeliveryNote>[]>(
    () => [
      {
        field: "status",
        headerName: "Status",
        cellRenderer: PendingClosedStatusCellRenderer,
        minWidth: 120,
        maxWidth: 140,
      },
      {
        field: "deliveryNoteDate",
        headerName: "Delivery note date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 160,
      },
      {
        field: "deliveryNoteNumber",
        headerName: "Delivery note number",
        minWidth: 170,
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
        cellRenderer: createEditCellRenderer("delivery note"),
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
      },
      {
        colId: "delete",
        headerName: "Delete",
        cellRenderer: createDeleteCellRenderer("delivery note"),
        sortable: false,
        filter: false,
        minWidth: 80,
        maxWidth: 80,
      },
    ],
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<DeliveryNote>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<DeliveryNote>) => {
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
    <SageDataGrid<DeliveryNote>
      rowData={deliveryNotes}
      columnDefs={columnDefs}
      quickFilterText={quickFilterText}
      onGridReady={handleGridReady}
      onFilterChanged={handleFilterChanged}
    />
  );
}
