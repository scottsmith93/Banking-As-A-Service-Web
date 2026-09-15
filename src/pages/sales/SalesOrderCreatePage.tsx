import CreateSalesDocumentPage from "../../components/sales-create/CreateSalesDocumentPage";
import { ROUTES } from "../../routes";

export default function SalesOrderCreatePage() {
  return (
    <CreateSalesDocumentPage
      documentTitle="Sales order"
      listRoute={ROUTES.sales.orders}
      fieldIdPrefix="sales-order"
      tabsAriaLabel="Sales order sections"
      dateLabel="Order date"
    />
  );
}
