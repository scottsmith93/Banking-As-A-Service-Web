import { useCallback, useMemo, useRef } from "react";
import {
  SageDataGrid,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
  type ICellRendererParams,
} from "../data-grid";
import Icon from "carbon-react/lib/components/icon";
import IconButton from "carbon-react/lib/components/icon-button";
import Pill from "../status-pill/StatusPill";
import { quotes, type Quote, type QuoteStatus } from "../../data/quotes";

const gbpFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatCurrency(amountGbp: number) {
  return gbpFormatter.format(amountGbp);
}

function formatDate(dateIso: string) {
  return dateFormatter.format(new Date(dateIso));
}

function getStatusLabel(status: QuoteStatus) {
  if (status === "pending") return "Pending";
  if (status === "closed") return "Closed";
  return "Declined";
}

function getStatusVariant(status: QuoteStatus) {
  if (status === "closed") return "positive" as const;
  if (status === "declined") return "negative" as const;
  return undefined;
}

function QuoteStatusCellRenderer(params: ICellRendererParams<Quote, QuoteStatus>) {
  const status = params.value;
  if (!status) return null;

  const variant = getStatusVariant(status);

  return (
    <span
      className={
        status === "pending" ? "quotesGrid__status quotesGrid__status--pending" : "quotesGrid__status"
      }
    >
      <Pill pillRole="status" colorVariant={variant}>
        {getStatusLabel(status)}
      </Pill>
    </span>
  );
}

function QuoteEditCellRenderer(_params: ICellRendererParams<Quote>) {
  return (
    <span className="quotesGrid__actionCell">
      <IconButton
        aria-label="Edit quote"
        onClick={() => {
          // PROTOTYPE: wire to edit flow when available
        }}
      >
        <Icon type="edit" color="--colorsActionMajor500" />
      </IconButton>
    </span>
  );
}

function QuoteDeleteCellRenderer(_params: ICellRendererParams<Quote>) {
  return (
    <span className="quotesGrid__actionCell">
      <IconButton
        aria-label="Delete quote"
        onClick={() => {
          // PROTOTYPE: wire to delete confirmation when available
        }}
      >
        <Icon type="delete" color="--colorsSemanticNegative500" />
      </IconButton>
    </span>
  );
}

type QuotesGridProps = {
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function QuotesGrid({
  quickFilterText = "",
  onDisplayedRowCountChange,
}: QuotesGridProps) {
  const gridApiRef = useRef<GridApi<Quote> | null>(null);

  const columnDefs = useMemo<ColDef<Quote>[]>(
    () => [
      {
        field: "status",
        headerName: "Status",
        cellRenderer: QuoteStatusCellRenderer,
        minWidth: 120,
        maxWidth: 140,
      },
      {
        field: "quoteDate",
        headerName: "Quote date",
        valueFormatter: (params) =>
          params.value ? formatDate(String(params.value)) : "",
        minWidth: 130,
      },
      {
        field: "quoteNumber",
        headerName: "Quote number",
        minWidth: 120,
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
        minWidth: 220,
      },
      {
        field: "totalGbp",
        headerName: "Total",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrency(params.value) : "",
        minWidth: 120,
      },
      {
        field: "taxableAmountGbp",
        headerName: "Taxable amount",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrency(params.value) : "",
        minWidth: 150,
      },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: QuoteEditCellRenderer,
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
      },
      {
        colId: "delete",
        headerName: "Delete",
        cellRenderer: QuoteDeleteCellRenderer,
        sortable: false,
        filter: false,
        minWidth: 80,
        maxWidth: 80,
      },
    ],
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<Quote>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<Quote>) => {
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
    <SageDataGrid<Quote>
      rowData={quotes}
      columnDefs={columnDefs}
      quickFilterText={quickFilterText}
      onGridReady={handleGridReady}
      onFilterChanged={handleFilterChanged}
    />
  );
}
