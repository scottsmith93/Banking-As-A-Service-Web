import { useState } from "react";
import FixedAssetsGrid from "../../components/accounting/FixedAssetsGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { fixedAssets } from "../../data/fixedAssets";
import { ROUTES } from "../../routes";

export default function FixedAssetsPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(fixedAssets.length);

  return (
    <SalesListingPage
      title="Fixed assets"
      searchLabel="Search fixed assets"
      createRoute={ROUTES.accounting.fixedAssetCreate}
      createLabel="Create fixed asset"
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCustomise={false}
      showSettings={false}
    >
      <FixedAssetsGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
