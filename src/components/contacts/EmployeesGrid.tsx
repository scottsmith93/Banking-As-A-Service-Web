import { useCallback, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
} from "ag-grid-community";
import { AgGridProvider } from "ag-grid-react";
import { employees, type Employee } from "../../data/employees";
import { EmployeeStatusCellRenderer } from "./contactGridShared";
import {
  createDeleteCellRenderer,
  createEditCellRenderer,
  formatListingDate,
  salesListingGridTheme,
} from "../sales-listing/salesGridShared";

type EmployeesGridProps = {
  quickFilterText?: string;
  onDisplayedRowCountChange?: (count: number) => void;
};

export default function EmployeesGrid({
  quickFilterText = "",
  onDisplayedRowCountChange,
}: EmployeesGridProps) {
  const gridApiRef = useRef<GridApi<Employee> | null>(null);

  const columnDefs = useMemo<ColDef<Employee>[]>(
    () => [
      { field: "employeeCode", headerName: "Employee code", minWidth: 130 },
      { field: "name", headerName: "Name", flex: 1, minWidth: 180 },
      { field: "jobTitle", headerName: "Job title", minWidth: 180 },
      { field: "department", headerName: "Department", minWidth: 150 },
      { field: "email", headerName: "Email", minWidth: 220 },
      {
        field: "startDate",
        headerName: "Start date",
        valueFormatter: (params) =>
          params.value ? formatListingDate(String(params.value)) : "",
        minWidth: 130,
      },
      {
        field: "status",
        headerName: "Status",
        cellRenderer: EmployeeStatusCellRenderer,
        minWidth: 110,
        maxWidth: 120,
      },
      {
        colId: "edit",
        headerName: "Edit",
        cellRenderer: createEditCellRenderer("employee"),
        sortable: false,
        filter: false,
        minWidth: 72,
        maxWidth: 72,
      },
      {
        colId: "delete",
        headerName: "Delete",
        cellRenderer: createDeleteCellRenderer("employee"),
        sortable: false,
        filter: false,
        minWidth: 80,
        maxWidth: 80,
      },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef<Employee>>(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      suppressMovable: true,
    }),
    [],
  );

  const updateDisplayedCount = useCallback(
    (api: GridApi<Employee>) => {
      onDisplayedRowCountChange?.(api.getDisplayedRowCount());
    },
    [onDisplayedRowCountChange],
  );

  const handleGridReady = useCallback(
    (event: GridReadyEvent<Employee>) => {
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
      <div className="salesGrid salesGrid--wide">
        <AgGridReact<Employee>
          theme={salesListingGridTheme}
          rowData={employees}
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
