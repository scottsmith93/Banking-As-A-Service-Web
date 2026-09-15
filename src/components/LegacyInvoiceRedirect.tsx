import { Navigate, useParams } from "react-router-dom";
import { ROUTES } from "../routes";

export default function LegacyInvoiceRedirect() {
  const { invoiceId } = useParams<{ invoiceId: string }>();

  if (!invoiceId) {
    return <Navigate to={ROUTES.sales.invoices} replace />;
  }

  return <Navigate to={ROUTES.sales.invoiceDetail(invoiceId)} replace />;
}
