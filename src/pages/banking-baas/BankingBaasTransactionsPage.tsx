import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { bankMovementsHref } from "../../utils/bankMovementNavigation";

// Compatibility only: the full transaction workspace now belongs to Bank movements.
export default function BankingBaasTransactionsPage() {
  const { accountId = "sage-operating-account" } = useParams();
  const [params] = useSearchParams();
  const view = params.get("view");
  return <Navigate replace to={bankMovementsHref(accountId, {
    transaction: params.get("transaction") ?? undefined,
    view: view === "needsAction" || view === "matched" ? view : "all",
  })} />;
}
