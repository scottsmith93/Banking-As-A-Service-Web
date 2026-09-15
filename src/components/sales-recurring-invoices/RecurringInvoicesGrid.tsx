import { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
  type ICellRendererParams,
} from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";
import Pill from "carbon-react/lib/components/pill";
import {
  recurringInvoices,
  type RecurringInvoice,
  type RecurringInvoiceStatus,
} from "../../data/recurringInvoices";
import {
  createActionsCellRenderer,
  createEditCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
  salesListingGridTheme,
} from "../sales-listing/salesGridShared";

function RecurringStatusCellRenderer(
  params: ICellRendererParams<RecurringInvoice, RecurringInvoiceStatus>,
) {
  const status = params.value;
  if (!status) return null;

  const label = status === "complete" ? "Complete" : "Active";
  const variant = status === "complete" ? ("positive" as const) : undefined;

  return (
    <span
      className={
        status === "active"
          ? "salesGrid__status salesGrid__status--pending"
          : "salesGrid__status"
      }
    >
      <Pill pillRole="status" colorVariant={variant}>
        {label}
      </Pill>
    </span>
  );
}

type RecurringInvoicesGridProps = {
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function RecurringInvoicesGrid({
  quickFilterText = "",
  onDisplayedRowCountChange,
}: RecurringInvoicesGridProps) {
  const gridApiRef = useRef<GridApi<RecurringInvoice> | null>(null);

  const columnDefs = useMemo<ColDef<RecurringInvoice>[]>(
    () => [
      {
        field: "customerName",
        headerName: "Customer",
        flex: 1,
        minWidth: 220,
      },
      {
        field: "frequency",
        headerName: "Frequency",
        minWidth: 180,
      },
      {
        field: "startDate",
        headerName: "Start date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 120,
      },
      {
        field: "endDate",
        headerName: "End date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 120,
      },
      {
        field: "recurrences",
        headerName: "Recurrences",
        minWidth: 120,
      },
      {
        field: "nextInvoiceDate",
        headerName: "Next invoice date",
        valueFormatter: (params) => {
          if (!params.value) return "";
          if (params.value === "9999-12-31") return "31 Dec 9999";
          return formatListingDate(String(params.value));
        },
        minWidth: 150,
      },
      {
        field: "invoiceTotalGbp",
        headerName: "Invoice total",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 130,
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
        field: "status",
        headerName: "Status",
        cellRenderer: RecurringStatusCellRenderer,
        minWidth: 120,
        maxWidth: 130,
      },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: createEditCellRenderer("recurring invoice"),
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
      },
      {
        colId: "actions",
        headerName: "Actions",
        cellRenderer: createActionsCellRenderer("recurring invoice"),
        sortable: false,
        filter: false,
        minWidth: 88,
        maxWidth: 88,
      },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef<RecurringInvoice>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      suppressMovable: true,
    }),
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<RecurringInvoice>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<RecurringInvoice>) => {
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
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className="salesGrid">
        <AgGridReact<RecurringInvoice>
          theme={salesListingGridTheme}
          rowData={recurringInvoices}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          quickFilterText={quickFilterText}
          onGridReady={handleGridReady}
          onFilterChanged={handleFilterChanged}
          suppressCellFocus
          animateRows={false}
          headerHeight={40}
          rowHeight={44}
        />
      </div>
    </AgGridProvider>
  );
}
