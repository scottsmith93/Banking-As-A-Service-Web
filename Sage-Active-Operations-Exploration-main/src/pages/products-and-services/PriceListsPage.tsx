import { useState } from "react";
import PriceListsGrid from "../../components/products-and-services/PriceListsGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { priceLists } from "../../data/priceLists";
import { ROUTES } from "../../routes";

export default function PriceListsPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(priceLists.length);

  return (
    <SalesListingPage
      title="Price lists"
      searchLabel="Search price lists"
      createRoute={ROUTES.productsAndServices.priceListCreate}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCustomise={false}
      showSettings={false}
    >
      <PriceListsGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
