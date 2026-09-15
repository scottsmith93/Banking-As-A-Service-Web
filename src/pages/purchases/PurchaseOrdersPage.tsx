import { useState } from "react";
import PurchaseOrdersGrid from "../../components/purchase-orders/PurchaseOrdersGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { purchaseOrders } from "../../data/purchaseOrders";

export default function PurchaseOrdersPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(purchaseOrders.length);

  return (
    <SalesListingPage
      title="Purchase orders"
      description="Track purchase orders sent to suppliers, from approval through to receipt of goods."
      searchLabel="Search purchase orders"
      showCreate={false}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showSettings={false}
    >
      <PurchaseOrdersGrid
        rowData={purchaseOrders}
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
