import { useEffect, useMemo, useState } from "react";
import Button from "carbon-react/lib/components/button/__next__";
import PurchaseInvoicesFilterBar, {
  type PurchaseInvoiceFilter,
} from "../../components/purchase-invoices/PurchaseInvoicesFilterBar";
import PurchaseInvoicesGrid from "../../components/purchase-invoices/PurchaseInvoicesGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import {
  getPurchaseInvoiceFilterCounts,
  purchaseInvoices,
} from "../../data/purchaseInvoices";
import { ROUTES } from "../../routes";

const filterCounts = getPurchaseInvoiceFilterCounts();

export default function PurchaseInvoicesPage() {
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState<PurchaseInvoiceFilter>("all");
  const [displayedCount, setDisplayedCount] = useState(purchaseInvoices.length);

  const filteredInvoices = useMemo(() => {
    if (filter === "all") {
      return purchaseInvoices;
    }

    return purchaseInvoices.filter((invoice) => invoice.listCategory === filter);
  }, [filter]);

  useEffect(() => {
    setDisplayedCount(filteredInvoices.length);
  }, [filteredInvoices.length]);

  const headerActions = (
    <Button variantType="tertiary" iconType="email" iconPosition="before">
      View email address
    </Button>
  );

  return (
    <SalesListingPage
      title="Purchase invoices"
      description="Enter your purchase invoice details into your accounting records by uploading a PDF or image file or by adding them manually."
      searchLabel="Search purchase invoices"
      createRoute={ROUTES.purchases.invoiceCreate}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCopilotInsights
      showSettings={false}
      headerActions={headerActions}
      filterBar={
        <PurchaseInvoicesFilterBar
          value={filter}
          counts={filterCounts}
          onChange={setFilter}
        />
      }
    >
      <PurchaseInvoicesGrid
        rowData={filteredInvoices}
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
