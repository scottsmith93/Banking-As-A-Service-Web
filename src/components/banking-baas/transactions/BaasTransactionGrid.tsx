import { useEffect, useRef } from "react";
import { SageDataGrid, type ColDef, type GridApi } from "../../data-grid";
import type { ColGroupDef } from "ag-grid-community";
import type { BankPurchaseInvoice, BankTransaction } from "../../../data/bankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { useTransactionTableColumns } from "../../../hooks/useTransactionTableColumns";

import BaasTaskProposal from "./BaasTaskProposal";
import BaasTaskActions from "./BaasTaskActions";
import BaasTaskMerchant from "./BaasTaskMerchant";
import { isJustified } from "../../../utils/transactionMatching";

type Props = { rows: BankTransaction[]; page: number; pageSize: number; oldestFirst: boolean; taskMode?: boolean; onJustify?: (row: BankTransaction, invoice: BankPurchaseInvoice) => void; selectedId?: string; onOpen: (transaction: BankTransaction) => void };
export default function BaasTransactionGrid({ rows, page, pageSize, oldestFirst, selectedId, onOpen, taskMode = false, onJustify }: Props) {
  const { copy } = useTransactionPresentation();
  const definitions = useTransactionTableColumns({ cashFlowColours: !taskMode });
  const apiRef = useRef<GridApi<BankTransaction> | null>(null);
  const focusAfterRemoval = useRef<{ id: string; index: number } | null>(null);
  useEffect(() => { apiRef.current?.paginationGoToPage(page - 1); }, [page]);
  const visibleDefinitions = taskMode ? definitions.filter(column => ["source", "date", "merchant", "amount"].includes(column.id)) : definitions;
  const columns: ColDef<BankTransaction>[] = visibleDefinitions.map(column => ({
    colId: column.id, headerName: column.label, width: column.width,
    ...(column.id === "merchant" ? { minWidth: column.width, flex: 1 } : {}),
    ...(column.id === "date" ? { initialSort: oldestFirst ? "asc" as const : "desc" as const } : {}),
    ...(column.align ? { type: "rightAligned" } : {}),
    valueGetter: ({ data }) => data ? column.value(data) : "",
    ...(taskMode && column.id === "merchant" ? { autoHeight: true, wrapText: true } : {}),
    cellRenderer: ({ data }: { data?: BankTransaction }) => data ? taskMode && column.id === "merchant" ? <BaasTaskMerchant transaction={data}>{column.render(data)}</BaasTaskMerchant> : column.render(data) : null,
  }));
  if (taskMode && onJustify) columns.push(
    { colId: "proposal", headerName: copy.workbench.suggestion, headerClass: "baasTransactionDecisionBoundary", cellClass: "baasTransactionDecisionBoundary", minWidth: 330, flex: 1.4, autoHeight: true, wrapText: true, sortable: false, cellRenderer: ({ data }: { data?: BankTransaction }) => data && <BaasTaskProposal transaction={data} /> },
    { colId: "taskAction", headerName: copy.workbench.actions, width: 200, autoHeight: true, sortable: false, cellRenderer: ({ data }: { data?: BankTransaction }) => data && <BaasTaskActions transaction={data} onReview={onOpen} onJustify={(row, invoice) => {
      focusAfterRemoval.current = { id: row.id, index: apiRef.current?.getRowNode(row.id)?.rowIndex ?? 0 };
      onJustify(row, invoice);
    }} /> },
  );
  const columnDefs: (ColDef<BankTransaction> | ColGroupDef<BankTransaction>)[] = taskMode && onJustify ? [
    { groupId: "bankTransaction", headerName: copy.workbench.bankTransaction, marryChildren: true, children: columns.slice(0, visibleDefinitions.length) },
    { groupId: "suggestedJustification", headerName: copy.workbench.proposal, headerClass: "baasTransactionDecisionBoundary", marryChildren: true, children: columns.slice(visibleDefinitions.length) },
  ] : columns;
  return <div role="region" aria-label={copy.title}>
    <SageDataGrid<BankTransaction>
      containerClassName={`baasTransactionsGrid sageDataGrid--clickableRows${taskMode ? " baasTransactionsGrid--tasks" : ""}`}
      rowData={rows} columnDefs={columnDefs} getRowId={({ data }) => data.id}
      defaultColDef={{ filter: false, wrapHeaderText: true, autoHeaderHeight: true }} domLayout="autoHeight" rowHeight={taskMode ? 72 : 56}
      pagination paginationPageSize={pageSize} paginationPageSizeSelector={false} suppressPaginationPanel
      onGridReady={({ api }) => { apiRef.current = api; api.paginationGoToPage(page - 1); }}
      onGridSizeChanged={({ api, clientWidth }) => {
        // Keep the matching decision visible on tablets. Supporting facts remain in the detail drawer.
        const showSupportingColumns = clientWidth >= 1000;
        if (!taskMode && api.getColumn("type")?.isVisible() !== showSupportingColumns) api.setColumnsVisible(["type", "paymentStatus"], showSupportingColumns);
      }}
      onRowDataUpdated={({ api }) => {
        api.paginationGoToPage(page - 1);
        const target = focusAfterRemoval.current;
        if (target && !api.getRowNode(target.id)) {
          const index = Math.min(target.index, api.getDisplayedRowCount() - 1);
          // Restore task position only if the user has not moved focus to another control.
          if (index >= 0 && (document.activeElement === document.body || document.activeElement?.closest(".baasTransactionsGrid"))) {
            api.ensureIndexVisible(index); api.setFocusedCell(index, "taskAction");
          }
          focusAfterRemoval.current = null;
        }
      }}
      onRowClicked={({ data, event }) => {
        const interactiveTarget = event?.target instanceof Element && event.target.closest("a, button, input, select, textarea");
        if (data && !interactiveTarget) onOpen(data);
      }}
      onCellKeyDown={({ data, event }) => {
        const interactiveTarget = event?.target instanceof Element && event.target.closest("a, button, input, select, textarea");
        if (data && (event as KeyboardEvent)?.key === "Enter" && !interactiveTarget) onOpen(data);
      }}
      rowClassRules={{ "baasTransactionRow--selected": ({ data }) => data?.id === selectedId, "baasTransactionRow--justified": ({ data }) => Boolean(taskMode && data && isJustified(data)) }}
    />
  </div>;
}
