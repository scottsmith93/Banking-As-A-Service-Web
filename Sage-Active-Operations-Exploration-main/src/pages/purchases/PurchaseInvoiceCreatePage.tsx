import CreateSalesDocumentPage from "../../components/sales-create/CreateSalesDocumentPage";
import { ROUTES } from "../../routes";

export default function PurchaseInvoiceCreatePage() {
  return (
    <CreateSalesDocumentPage
      documentTitle="Purchase invoice"
      listRoute={ROUTES.purchases.invoices}
      fieldIdPrefix="purchase-invoice"
      tabsAriaLabel="Purchase invoice sections"
      dateLabel="Invoice date"
    />
  );
}
