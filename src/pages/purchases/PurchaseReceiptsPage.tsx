import { useState } from "react";
import PurchaseReceiptsGrid from "../../components/purchase-receipts/PurchaseReceiptsGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { purchaseReceipts } from "../../data/purchaseReceipts";

export default function PurchaseReceiptsPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(purchaseReceipts.length);

  return (
    <SalesListingPage
      title="Purchase receipts"
      description="Track goods received from suppliers, from receipt through to invoicing and returns."
      searchLabel="Search purchase receipts"
      showCreate={false}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showSettings={false}
    >
      <PurchaseReceiptsGrid
        rowData={purchaseReceipts}
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
