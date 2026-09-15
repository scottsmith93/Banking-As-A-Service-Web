import CreateSalesDocumentPage from "../../components/sales-create/CreateSalesDocumentPage";
import { ROUTES } from "../../routes";

export default function SalesRecurringInvoiceCreatePage() {
  return (
    <CreateSalesDocumentPage
      documentTitle="Recurring invoice"
      listRoute={ROUTES.sales.recurringInvoices}
      fieldIdPrefix="recurring-invoice"
      tabsAriaLabel="Recurring invoice sections"
      dateLabel="Start date"
    />
  );
}
