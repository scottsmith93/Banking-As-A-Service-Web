import { useState } from "react";
import OrdersGrid from "../../components/sales-orders/OrdersGrid";
import SalesListingPage from "../../components/sales-listing/SalesListingPage";
import { salesOrders } from "../../data/orders";
import { ROUTES } from "../../routes";

export default function SalesOrdersPage() {
  const [searchText, setSearchText] = useState("");
  const [displayedCount, setDisplayedCount] = useState(salesOrders.length);

  return (
    <SalesListingPage
      title="Sales orders"
      searchLabel="Search sales orders"
      createRoute={ROUTES.sales.orderCreate}
      searchText={searchText}
      onSearchChange={setSearchText}
      itemCount={displayedCount}
      showCustomise={false}
    >
      <OrdersGrid
        quickFilterText={searchText}
        onDisplayedRowCountChange={setDisplayedCount}
      />
    </SalesListingPage>
  );
}
