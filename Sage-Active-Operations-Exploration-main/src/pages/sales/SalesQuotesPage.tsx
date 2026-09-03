import { useState } from "react";
import QuotesGrid from "../../components/sales-quotes/QuotesGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { quotes } from "../../data/quotes";
import { ROUTES } from "../../routes";

export default function SalesQuotesPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(quotes.length);

  return (
    <SalesListingPage
      title="Sales quotes"
      searchLabel="Search quotes"
      createRoute={ROUTES.sales.quoteCreate}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCopilotInsights
    >
      <QuotesGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
