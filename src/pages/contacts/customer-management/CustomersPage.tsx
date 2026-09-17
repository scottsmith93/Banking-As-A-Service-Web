import { useEffect, useMemo, useState } from "react";
import Box from "carbon-react/lib/components/box";
import Loader from "carbon-react/lib/components/loader/__next__";
import Message from "carbon-react/lib/components/message";
import Pager from "carbon-react/lib/components/pager";
import Typography from "carbon-react/lib/components/typography";
import { CustomerEditorDialog } from "../../../components/customer-management/CustomerEditorDialog";
import { CustomerManagementToolbar } from "../../../components/customer-management/CustomerManagementToolbar";
import { CustomersGrid } from "../../../components/customer-management/CustomersGrid";
import { DeleteCustomersDialog } from "../../../components/customer-management/DeleteCustomersDialog";
import type { CustomerDraft, CustomerEditorMode, CustomerStatusFilter } from "../../../components/customer-management/types";
import { useLanguage } from "../../../context/useLanguage";
import { customers as initialCustomers, type Customer } from "../../../data/customers";
import { getLocale } from "../../../locales";
import { interpolate } from "../../../utils/interpolate";

const PAGE_SIZE = 10;
const PROTOTYPE_LOAD_DELAY_MS = 350;

export default function CustomersPage() {
  const { language } = useLanguage();
  const copy = getLocale(language).customerManagement;
  const [customers, setCustomers] = useState<Customer[]>(() => initialCustomers.map((customer) => ({ ...customer })));
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<CustomerStatusFilter>("all");
  const [page, setPage] = useState(1);
  const [displayedCount, setDisplayedCount] = useState(initialCustomers.length);
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
  const [selectionResetKey, setSelectionResetKey] = useState(0);
  const [editorMode, setEditorMode] = useState<CustomerEditorMode | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    // PROTOTYPE: short delay demonstrates the loading state; replace with the customer API request.
    const timer = window.setTimeout(() => setIsLoading(false), PROTOTYPE_LOAD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredCustomers = useMemo(() => {
    const query = searchText.trim().toLocaleLowerCase();
    return customers.filter((customer) => {
      if (statusFilter !== "all" && customer.status !== statusFilter) return false;
      if (!query) return true;
      return [customer.customerCode, customer.name, customer.vatNumber, customer.contactName, customer.email, customer.town]
        .some((value) => value.toLocaleLowerCase().includes(query));
    });
  }, [customers, searchText, statusFilter]);

  const clearSelection = () => {
    setSelectedCustomers([]);
    setSelectionResetKey((current) => current + 1);
  };

  const resetListPosition = () => {
    setPage(1);
    clearSelection();
  };

  const handleDisplayedRowCountChange = (count: number) => {
    setDisplayedCount(count);
    setPage((current) => Math.min(current, Math.max(1, Math.ceil(count / PAGE_SIZE))));
  };

  const handleSave = (draft: CustomerDraft) => {
    const activityDate = new Date().toISOString().slice(0, 10);
    if (editorMode === "create") {
      const newCustomer: Customer = { ...draft, id: `customer-${crypto.randomUUID()}`, balanceDueEur: 0, lastActivity: activityDate };
      setCustomers((current) => [newCustomer, ...current]);
      setFeedback(copy.feedback.created);
    } else {
      const selectedCustomer = selectedCustomers[0];
      if (!selectedCustomer) return;
      setCustomers((current) => current.map((customer) => customer.id === selectedCustomer.id ? { ...customer, ...draft, lastActivity: activityDate } : customer));
      setFeedback(copy.feedback.updated);
    }
    setEditorMode(null);
    resetListPosition();
  };

  const handleDelete = () => {
    const selectedIds = new Set(selectedCustomers.map((customer) => customer.id));
    const deletedCount = selectedIds.size;
    setCustomers((current) => current.filter((customer) => !selectedIds.has(customer.id)));
    setFeedback(deletedCount === 1 ? copy.feedback.deletedSingle : interpolate(copy.feedback.deletedMultiple, { count: deletedCount }));
    setDeleteOpen(false);
    resetListPosition();
  };

  const selectionText = selectedCustomers.length === 0
    ? copy.selection.none
    : selectedCustomers.length === 1
      ? copy.selection.one
      : interpolate(copy.selection.many, { count: selectedCustomers.length });

  return (
    <Box className="pageContent salesListingPage customerManagement" aria-busy={isLoading}>
      <Box className="salesListingPage__titleRow" display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column" className="salesListingPage__titleBlock">
          <Typography variant="h1" as="h1" className="salesListingPage__title">{copy.title}</Typography>
          <Typography variant="p" as="p" className="salesListingPage__description">{copy.description}</Typography>
        </Box>
      </Box>

      {feedback && <Message variant="success" title={feedback} onDismiss={() => setFeedback(null)} closeButtonAriaLabel={copy.feedback.dismiss} />}

      <CustomerManagementToolbar
        copy={copy}
        searchText={searchText}
        statusFilter={statusFilter}
        selectionText={selectionText}
        selectedCount={selectedCustomers.length}
        onCreate={() => { setFeedback(null); setEditorMode("create"); }}
        onEdit={() => setEditorMode("edit")}
        onDelete={() => setDeleteOpen(true)}
        onSearchChange={(value) => { setSearchText(value); resetListPosition(); }}
        onStatusChange={(value) => { setStatusFilter(value); resetListPosition(); }}
      />

      {isLoading ? (
        <Box className="customerManagement__state" display="flex" flexDirection="column" alignItems="center" justifyContent="center" role="status">
          <Loader loaderType="ring" size="large" loaderLabel={copy.states.loadingTitle} showLabel />
          <Typography variant="p" as="p">{copy.states.loadingBody}</Typography>
        </Box>
      ) : filteredCustomers.length === 0 ? (
        <Message variant="neutral" title={copy.states.emptyTitle}>{copy.states.emptyBody}</Message>
      ) : (
        <>
          <CustomersGrid
            copy={copy}
            customers={filteredCustomers}
            page={page}
            pageSize={PAGE_SIZE}
            selectionResetKey={selectionResetKey}
            onDisplayedRowCountChange={handleDisplayedRowCountChange}
            onSelectionChange={setSelectedCustomers}
          />
          <Box className="customerManagement__footer" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="p" as="p" className="salesListingPage__itemCount">
              {interpolate(copy.summary.customerCount, { count: displayedCount })}
            </Typography>
            <Pager currentPage={page} totalRecords={displayedCount} pageSize={PAGE_SIZE} onPagination={(nextPage) => setPage(nextPage)} showPageSizeSelection={false} />
          </Box>
        </>
      )}

      {editorMode && (
        <CustomerEditorDialog
          key={`${editorMode}-${selectedCustomers[0]?.id ?? "new"}`}
          copy={copy}
          mode={editorMode}
          customer={editorMode === "edit" ? selectedCustomers[0] ?? null : null}
          customers={customers}
          onCancel={() => setEditorMode(null)}
          onSave={handleSave}
        />
      )}
      {deleteOpen && <DeleteCustomersDialog copy={copy} customers={selectedCustomers} onCancel={() => setDeleteOpen(false)} onConfirm={handleDelete} />}
    </Box>
  );
}
