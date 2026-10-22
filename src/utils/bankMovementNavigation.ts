import { ROUTES } from "../routes";

// One destination for every account's transactions. Query parameters survive refresh and Back.
export function bankMovementsHref(accountId: string, options: { transaction?: string; view?: "all" | "needsAction" | "matched" } = {}) {
  const params = new URLSearchParams({ account: accountId, view: options.view ?? "all" });
  if (options.transaction) params.set("transaction", options.transaction);
  return `${ROUTES.banking.bankMovements}?${params}`;
}
