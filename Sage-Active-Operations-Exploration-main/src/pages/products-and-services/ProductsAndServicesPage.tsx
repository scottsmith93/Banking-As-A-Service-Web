import { useState } from "react";
import Button from "carbon-react/lib/components/button/__next__";
import CreateItemDialog from "../../components/products-and-services/CreateItemDialog";
import ProductsAndServicesGrid from "../../components/products-and-services/ProductsAndServicesGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { productsAndServices } from "../../data/productsAndServices";

export default function ProductsAndServicesPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(productsAndServices.length);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const headerActions = (
    <Button variantType="tertiary" iconType="upload" iconPosition="before">
      Import items
    </Button>
  );

  return (
    <SalesListingPage
      title="Items"
      searchLabel="Search items"
      onCreateClick={() => setIsCreateDialogOpen(true)}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCustomise={false}
      showSettings={false}
      headerActions={headerActions}
    >
      <ProductsAndServicesGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
      <CreateItemDialog open={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} />
    </SalesListingPage>
  );
}
