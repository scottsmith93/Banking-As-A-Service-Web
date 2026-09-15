import CreateSalesDocumentPage from "../../components/sales-create/CreateSalesDocumentPage";
import { ROUTES } from "../../routes";

export default function SalesDeliveryNoteCreatePage() {
  return (
    <CreateSalesDocumentPage
      documentTitle="Sales delivery note"
      listRoute={ROUTES.sales.deliveryNotes}
      fieldIdPrefix="sales-delivery-note"
      tabsAriaLabel="Sales delivery note sections"
      dateLabel="Delivery note date"
    />
  );
}
