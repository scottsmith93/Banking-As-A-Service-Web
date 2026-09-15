import { useState } from "react";
import SuppliersGrid from "../../components/contacts/SuppliersGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { suppliers } from "../../data/suppliers";
import { ROUTES } from "../../routes";

export default function SuppliersPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(suppliers.length);

  return (
    <SalesListingPage
      title="Suppliers"
      searchLabel="Search suppliers"
      createRoute={ROUTES.contacts.supplierCreate}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCustomise={false}
      showSettings={false}
    >
      <SuppliersGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
