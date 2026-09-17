import { useCallback, useEffect, useMemo, useRef } from "react";
import Pill from "carbon-react/lib/components/pill";
import type { Customer } from "../../data/customers";
import { useLanguage } from "../../context/useLanguage";
import { formatEur } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import { SageDataGrid, type ColDef, type GridApi, type GridReadyEvent } from "../data-grid";
import type { CustomerManagementCopy } from "./types";

type CustomersGridProps = {
  copy: CustomerManagementCopy;
  customers: Customer[];
  page: number;
  pageSize: number;
  selectionResetKey: number;
  onDisplayedRowCountChange: (count: number) => void;
  onSelectionChange: (customers: Customer[]) => void;
};

export function CustomersGrid({
  copy,
  customers,
  page,
  pageSize,
  selectionResetKey,
  onDisplayedRowCountChange,
  onSelectionChange,
}: CustomersGridProps) {
  const { language } = useLanguage();
  const gridApiRef = useRef<GridApi<Customer> | null>(null);

  const columnDefs = useMemo<ColDef<Customer>[]>(
    () => [
      { field: "customerCode", headerName: copy.columns.code, minWidth: 140 },
      { field: "name", headerName: copy.columns.name, flex: 1, minWidth: 240 },
      {
        field: "customerType",
        headerName: copy.columns.type,
        valueFormatter: ({ value }) => value ? copy.types[value as Customer["customerType"]] : "",
        minWidth: 140,
      },
      {
        field: "countryCode",
        headerName: copy.columns.country,
        valueFormatter: ({ value }) => value ? copy.countries[value as Customer["countryCode"]] : "",
        minWidth: 140,
      },
      { field: "contactName", headerName: copy.columns.contact, minWidth: 170 },
      { field: "email", headerName: copy.columns.email, minWidth: 240 },
      {
        field: "status",
        headerName: copy.columns.status,
        cellRenderer: ({ value }: { value?: Customer["status"] }) => value ? (
          <span className="salesGrid__status">
            <Pill pillRole="status" colorVariant={value === "active" ? "positive" : undefined}>
              {copy.statuses[value]}
            </Pill>
          </span>
        ) : null,
        minWidth: 120,
        maxWidth: 130,
      },
      {
        field: "balanceDueEur",
        headerName: copy.columns.balanceDue,
        type: "rightAligned",
        valueFormatter: ({ value }) => typeof value === "number" ? formatEur(value, language) : "",
        minWidth: 150,
      },
      {
        field: "lastActivity",
        headerName: copy.columns.lastActivity,
        valueFormatter: ({ value }) => value ? formatDate(String(value), language) : "",
        minWidth: 150,
      },
    ],
    [copy, language],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<Customer>) => onDisplayedRowCountChange(api.getDisplayedRowCount()),
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<Customer>) => {
      gridApiRef.current = event.api;
      event.api.paginationGoToPage(page - 1);
      updateDisplayedCount(event.api);
    },
    [page, updateDisplayedCount],
  );

  useEffect(() => {
    gridApiRef.current?.paginationGoToPage(page - 1);
  }, [page]);

  useEffect(() => {
    gridApiRef.current?.deselectAll();
  }, [selectionResetKey]);

  return (
    <div role="region" aria-label={copy.grid.ariaLabel}>
      <SageDataGrid<Customer>
        rowData={customers}
        columnDefs={columnDefs}
        getRowId={({ data }) => data.id}
        pagination
        paginationPageSize={pageSize}
        paginationPageSizeSelector={false}
        suppressPaginationPanel
        rowSelection={{ mode: "multiRow", selectAll: "currentPage", enableClickSelection: false }}
        onGridReady={handleGridReady}
        onFilterChanged={(event) => updateDisplayedCount(event.api)}
        onRowDataUpdated={(event) => updateDisplayedCount(event.api)}
        onSelectionChanged={(event) => onSelectionChange(event.api.getSelectedRows())}
      />
    </div>
  );
}
