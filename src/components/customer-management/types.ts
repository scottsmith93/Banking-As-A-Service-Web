import type { getLocale } from "../../locales";
import type { Customer, CustomerStatus } from "../../data/customers";

export type CustomerManagementCopy = ReturnType<typeof getLocale>["customerManagement"];
export type CustomerStatusFilter = CustomerStatus | "all";
export type CustomerEditorMode = "create" | "edit";
export type CustomerDraft = Omit<Customer, "id" | "balanceDueEur" | "lastActivity">;
