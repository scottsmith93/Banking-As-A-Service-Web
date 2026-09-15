import { useState } from "react";
import CustomersGrid from "../../components/contacts/CustomersGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { customers } from "../../data/customers";
import { ROUTES } from "../../routes";

export default function CustomersPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(customers.length);

  return (
    <SalesListingPage
      title="Customers"
      searchLabel="Search customers"
      createRoute={ROUTES.contacts.customerCreate}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCustomise={false}
      showSettings={false}
    >
      <CustomersGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
