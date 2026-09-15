import { useState } from "react";
import DiscountGroupsGrid from "../../components/products-and-services/DiscountGroupsGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { discountGroups } from "../../data/discountGroups";
import { ROUTES } from "../../routes";

export default function DiscountGroupsPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(discountGroups.length);

  return (
    <SalesListingPage
      title="Discount groups"
      searchLabel="Search discount groups"
      createRoute={ROUTES.productsAndServices.discountGroupCreate}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCustomise={false}
      showSettings={false}
    >
      <DiscountGroupsGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
