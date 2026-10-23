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
import type { PurchaseReceipt, PurchaseReceiptStatus } from "../../data/purchaseReceipts";
import {
  createActionsCellRenderer,
  createEditCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
} from "../sales-listing/salesGridShared";
import { ROUTES } from "../../routes";

function getStatusLabel(status: PurchaseReceiptStatus) {
  if (status === "created") return "Created";
  if (status === "invoiced") return "Invoiced";
  return "Returned";
}

function getStatusColorVariant(status: PurchaseReceiptStatus) {
  if (status === "created") return "information" as const;
  if (status === "invoiced") return "positive" as const;
  return "negative" as const;
}

function PurchaseReceiptStatusCellRenderer(
  params: ICellRendererParams<PurchaseReceipt, PurchaseReceiptStatus>,
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

type PurchaseReceiptsGridProps = {
  rowData: PurchaseReceipt[];
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function PurchaseReceiptsGrid({
  rowData,
  quickFilterText = "",
  onDisplayedRowCountChange,
}: PurchaseReceiptsGridProps) {
  const navigate = useNavigate();
  const gridApiRef = useRef<GridApi<PurchaseReceipt> | null>(null);

  const columnDefs = useMemo<ColDef<PurchaseReceipt>[]>(
    () => [
      {
        field: "receiptId",
        headerName: "Receipt ID",
        minWidth: 140,
      },
      {
        field: "supplier",
        headerName: "Supplier",
        flex: 1,
        minWidth: 180,
      },
      {
        field: "receiptDate",
        headerName: "Receipt date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 130,
      },
      {
        field: "receivingSite",
        headerName: "Receiving site",
        minWidth: 150,
      },
      {
        field: "totalIncludingTaxGbp",
        headerName: "Total including taxes",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 170,
      },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: PurchaseReceiptStatusCellRenderer,
        minWidth: 150,
        maxWidth: 170,
      },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: createEditCellRenderer("purchase receipt"),
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
        cellRenderer: createActionsCellRenderer("purchase receipt"),
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
    (api: GridApi<PurchaseReceipt>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<PurchaseReceipt>) => {
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
    (event: CellClickedEvent<PurchaseReceipt>) => {
      const colId = event.column.getColId();
      if (colId === "edit" || colId === "actions" || !event.data) {
        return;
      }
      navigate(ROUTES.purchases.receiptDetail(event.data.id));
    },
    [navigate],
  );

  return (
    <SageDataGrid<PurchaseReceipt>
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
