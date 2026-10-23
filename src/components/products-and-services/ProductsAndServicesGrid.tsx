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
import {
  productsAndServices,
  type ProductOrService,
  type ProductOrServiceStatus,
} from "../../data/productsAndServices";
import {
  createDeleteCellRenderer,
  createEditCellRenderer,
  createThumbnailCellRenderer,
  formatCurrencyGbp,
  formatListingDate,
} from "../sales-listing/salesGridShared";
import { ROUTES } from "../../routes";

function getStatusColorVariant(status: ProductOrServiceStatus) {
  if (status === "Available" || status === "In manufacturing") return "information" as const;
  if (status === "Purchase") return "positive" as const;
  if (status === "Suspended") return "warning" as const;
  return "negative" as const;
}

function ProductStatusCellRenderer(
  params: ICellRendererParams<ProductOrService, ProductOrServiceStatus>,
) {
  const status = params.value;
  if (!status) return null;

  return (
    <span className="salesGrid__status">
      <Pill pillRole="status" colorVariant={getStatusColorVariant(status)}>
        {status}
      </Pill>
    </span>
  );
}

type ProductsAndServicesGridProps = {
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function ProductsAndServicesGrid({
  quickFilterText = "",
  onDisplayedRowCountChange,
}: ProductsAndServicesGridProps) {
  const navigate = useNavigate();
  const gridApiRef = useRef<GridApi<ProductOrService> | null>(null);

  const columnDefs = useMemo<ColDef<ProductOrService>[]>(
    () => [
      {
        colId: "thumbnail",
        headerName: "",
        headerTooltip: "Thumbnail",
        cellRenderer: createThumbnailCellRenderer<ProductOrService>(),
        sortable: false,
        filter: false,
        resizable: false,
        minWidth: 92,
        maxWidth: 92,
      },
      {
        field: "code",
        headerName: "Code",
        minWidth: 120,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 220,
      },
      {
        field: "category",
        headerName: "Category",
        minWidth: 110,
        maxWidth: 120,
      },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: ProductStatusCellRenderer,
        minWidth: 150,
        maxWidth: 170,
      },
      {
        field: "releaseDate",
        headerName: "Release date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 130,
      },
      {
        field: "priceWithDiscountGbp",
        headerName: "Price with discount",
        type: "rightAligned",
        valueFormatter: (params) =>
          typeof params.value === "number" ? formatCurrencyGbp(params.value) : "",
        minWidth: 160,
      },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: createEditCellRenderer("product or service"),
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
      },
      {
        colId: "delete",
        headerName: "Delete",
        cellRenderer: createDeleteCellRenderer("product or service"),
        sortable: false,
        filter: false,
        minWidth: 80,
        maxWidth: 80,
      },
    ],
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<ProductOrService>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<ProductOrService>) => {
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
    (event: CellClickedEvent<ProductOrService>) => {
      const colId = event.column.getColId();
      if (colId === "edit" || colId === "delete" || !event.data) {
        return;
      }
      navigate(ROUTES.productsAndServices.catalogDetail(event.data.id));
    },
    [navigate],
  );

  return (
    <SageDataGrid<ProductOrService>
      containerClassName="sageDataGrid--clickableRows"
      rowData={productsAndServices}
      columnDefs={columnDefs}
      quickFilterText={quickFilterText}
      onGridReady={handleGridReady}
      onFilterChanged={handleFilterChanged}
      onCellClicked={handleCellClicked}
      rowHeight={92}
    />
  );
}
