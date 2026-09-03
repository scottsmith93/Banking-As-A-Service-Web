import CreateSalesDocumentPage from "../../components/sales-create/CreateSalesDocumentPage";
import { ROUTES } from "../../routes";

export default function SalesQuoteCreatePage() {
  return (
    <CreateSalesDocumentPage
      documentTitle="Sales quote"
      listRoute={ROUTES.sales.quotes}
      fieldIdPrefix="sales-quote"
      tabsAriaLabel="Sales quote sections"
      dateLabel="Quote date"
    />
  );
}
