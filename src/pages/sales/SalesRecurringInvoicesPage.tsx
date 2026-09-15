import { useState } from "react";
import RecurringInvoicesGrid from "../../components/sales-recurring-invoices/RecurringInvoicesGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { recurringInvoices } from "../../data/recurringInvoices";
import { ROUTES } from "../../routes";

export default function SalesRecurringInvoicesPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(recurringInvoices.length);

  return (
    <SalesListingPage
      title="Recurring invoices"
      description="Track the progress of your recurring invoice and manage them for your customers."
      searchLabel="Search recurring invoices"
      createRoute={ROUTES.sales.recurringInvoiceCreate}
      createLabel="Create recurring invoice"
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCustomise={false}
    >
      <RecurringInvoicesGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
