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
import Pill from "carbon-react/lib/components/pill";
import type {
  PurchaseInvoice,
  PurchaseInvoiceStatus,
} from "../../data/purchaseInvoices";
import {
  createActionsCellRenderer,
  createEditCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
} from "../sales-listing/salesGridShared";
import { ROUTES } from "../../routes";

function getStatusLabel(status: PurchaseInvoiceStatus) {
  if (status === "overdue") return "Overdue";
  if (status === "pending") return "Pending";
  if (status === "paid") return "Paid";
  return "Partially overdue";
}

function getStatusClassName(status: PurchaseInvoiceStatus) {
  if (status === "overdue") return "salesGrid__status salesGrid__status--purchaseOverdue";
  if (status === "pending") return "salesGrid__status salesGrid__status--purchasePending";
  if (status === "paid") return "salesGrid__status";
  return "salesGrid__status salesGrid__status--purchasePartiallyOverdue";
}

function PurchaseInvoiceStatusCellRenderer(
  params: ICellRendererParams<PurchaseInvoice, PurchaseInvoiceStatus>,
) {
  const status = params.value;
  if (!status) return null;

  const variant = status === "paid" ? ("positive" as const) : undefined;

  return (
    <span className={getStatusClassName(status)}>
      <Pill pillRole="status" colorVariant={variant}>
        {getStatusLabel(status)}
      </Pill>
    </span>
  );
}

type PurchaseInvoicesGridProps = {
  rowData: PurchaseInvoice[];
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function PurchaseInvoicesGrid({
  rowData,
  quickFilterText = "",
  onDisplayedRowCountChange,
}: PurchaseInvoicesGridProps) {
  const navigate = useNavigate();
  const gridApiRef = useRef<GridApi<PurchaseInvoice> | null>(null);

  const columnDefs = useMemo<ColDef<PurchaseInvoice>[]>(
    () => [
      {
        field: "importDate",
        headerName: "Import date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 120,
      },
      {
        field: "fileName",
        headerName: "File name",
        minWidth: 160,
        maxWidth: 200,
        tooltipField: "fileName",
        cellClass: "salesGrid__truncatedCell",
      },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: PurchaseInvoiceStatusCellRenderer,
        minWidth: 150,
        maxWidth: 170,
      },
      {
        field: "description",
        headerName: "Description",
        flex: 1,
        minWidth: 200,
        tooltipField: "description",
        cellClass: "salesGrid__truncatedCell",
      },
      {
        field: "supplier",
        headerName: "Supplier",
        minWidth: 160,
        valueFormatter: (params) =>
          params.value ? String(params.value).toUpperCase() : "",
      },
      {
        field: "invoiceDate",
        headerName: "Invoice date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 120,
      },
      {
        field: "invoiceNumber",
        headerName: "Invoice number",
        minWidth: 130,
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
        field: "outstandingAmountGbp",
        headerName: "Outstanding amount",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 160,
      },
      {
        field: "paymentDueDate",
        headerName: "Payment due",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 120,
      },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: createEditCellRenderer("purchase invoice"),
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
        cellRenderer: createActionsCellRenderer("purchase invoice"),
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
    (api: GridApi<PurchaseInvoice>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<PurchaseInvoice>) => {
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
    (event: CellClickedEvent<PurchaseInvoice>) => {
      const colId = event.column.getColId();
      if (colId === "edit" || colId === "actions" || !event.data) {
        return;
      }
      navigate(ROUTES.purchases.invoiceDetail(event.data.id));
    },
    [navigate],
  );

  return (
    <SageDataGrid<PurchaseInvoice>
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
