import { Navigate } from "react-router-dom";
import { ROUTES } from "../routes";

export default function ExamplePage2() {
  return <Navigate to={ROUTES.sales.invoices} replace />;
}
