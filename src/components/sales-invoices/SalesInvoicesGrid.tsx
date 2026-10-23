import { useCallback, useMemo, useRef } from "react";
import {
  SageDataGrid,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
  type ICellRendererParams,
} from "../data-grid";
import Pill from "../status-pill/StatusPill";
import { useTransactionPresentation } from "../../hooks/useTransactionPresentation";
import {
  invoices,
  type EInvoiceStatus,
  type Invoice,
  type SalesInvoiceStatus,
  type SalesInvoiceType,
} from "../../data/invoices";
import {
  createDeleteCellRenderer,
  createEditCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
} from "../sales-listing/salesGridShared";

function getInvoiceStatusLabel(status: SalesInvoiceStatus) {
  if (status === "draft") return "Draft";
  if (status === "unposted") return "Unposted";
  return "Overdue";
}

function getInvoiceStatusVariant(status: SalesInvoiceStatus) {
  if (status === "paid") return "positive" as const;
  if (status === "overdue") return "negative" as const;
  if (status === "unposted") return "warning" as const;
  return undefined;
}

function InvoiceStatusCellRenderer(
  params: ICellRendererParams<Invoice, SalesInvoiceStatus>,
) {
  const { copy } = useTransactionPresentation();
  const status = params.value;
  if (!status) return null;

  return (
    <span
      className={
        status === "draft"
          ? "salesGrid__status salesGrid__status--draft"
          : "salesGrid__status"
      }
    >
      <Pill pillRole="status" colorVariant={getInvoiceStatusVariant(status)}>
        {status === "paid" ? copy.paid : getInvoiceStatusLabel(status)}
      </Pill>
    </span>
  );
}

function EInvoiceStatusCellRenderer(
  params: ICellRendererParams<Invoice, EInvoiceStatus>,
) {
  const status = params.value;
  if (!status) return null;

  return (
    <span className="salesGrid__status salesGrid__status--eInvoiceRejected">
      <Pill pillRole="status" colorVariant="negative">
        Rejected by platform
      </Pill>
    </span>
  );
}

function InvoiceTypeCellRenderer(
  params: ICellRendererParams<Invoice, SalesInvoiceType>,
) {
  const type = params.value;
  if (!type) return null;
  return type === "credit-note" ? "Credit note" : "Invoice";
}

type SalesInvoicesGridProps = {
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function SalesInvoicesGrid({
  quickFilterText = "",
  onDisplayedRowCountChange,
}: SalesInvoicesGridProps) {
  const gridApiRef = useRef<GridApi<Invoice> | null>(null);

  const columnDefs = useMemo<ColDef<Invoice>[]>(
    () => [
      {
        field: "status",
        headerName: "Status",
        cellRenderer: InvoiceStatusCellRenderer,
        minWidth: 120,
        maxWidth: 130,
      },
      {
        field: "eInvoiceStatus",
        headerName: "E-Invoice status",
        cellRenderer: EInvoiceStatusCellRenderer,
        minWidth: 170,
      },
      {
        field: "invoiceDate",
        headerName: "Invoice date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 130,
      },
      {
        field: "invoiceNumber",
        headerName: "Invoice number",
        minWidth: 130,
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
        minWidth: 180,
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
        field: "outstandingAmountGbp",
        headerName: "Outstanding amount",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 170,
      },
      {
        field: "type",
        headerName: "Type",
        cellRenderer: InvoiceTypeCellRenderer,
        minWidth: 120,
      },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: createEditCellRenderer("invoice"),
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
        pinned: "right",
        lockPinned: true,
      },
      {
        colId: "delete",
        headerName: "Delete",
        cellRenderer: createDeleteCellRenderer("invoice"),
        sortable: false,
        filter: false,
        minWidth: 80,
        maxWidth: 80,
        pinned: "right",
        lockPinned: true,
      },
    ],
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<Invoice>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<Invoice>) => {
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
    <SageDataGrid<Invoice>
      rowData={invoices}
      columnDefs={columnDefs}
      quickFilterText={quickFilterText}
      onGridReady={handleGridReady}
      onFilterChanged={handleFilterChanged}
    />
  );
}
