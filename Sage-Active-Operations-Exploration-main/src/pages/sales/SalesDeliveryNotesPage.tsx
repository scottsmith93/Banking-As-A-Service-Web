import { useState } from "react";
import DeliveryNotesGrid from "../../components/sales-delivery-notes/DeliveryNotesGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { deliveryNotes } from "../../data/deliveryNotes";
import { ROUTES } from "../../routes";

export default function SalesDeliveryNotesPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(deliveryNotes.length);

  return (
    <SalesListingPage
      title="Sales delivery notes"
      searchLabel="Search delivery notes"
      createRoute={ROUTES.sales.deliveryNoteCreate}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCustomise={false}
    >
      <DeliveryNotesGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
