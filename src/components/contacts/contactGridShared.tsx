import type { ICellRendererParams } from "../data-grid";
import Pill from "../status-pill/StatusPill";

type ActiveInactiveStatus = "active" | "inactive";

export function ActiveInactiveStatusCellRenderer(
  params: ICellRendererParams<{ status: ActiveInactiveStatus }, ActiveInactiveStatus>,
) {
  const status = params.value;
  if (!status) return null;

  const label = status === "active" ? "Active" : "Inactive";
  const variant = status === "active" ? ("positive" as const) : undefined;

  return (
    <span className="salesGrid__status">
      <Pill pillRole="status" colorVariant={variant}>
        {label}
      </Pill>
    </span>
  );
}

type EmployeeStatus = "active" | "on-leave" | "inactive";

export function EmployeeStatusCellRenderer(
  params: ICellRendererParams<{ status: EmployeeStatus }, EmployeeStatus>,
) {
  const status = params.value;
  if (!status) return null;

  const label =
    status === "active" ? "Active" : status === "on-leave" ? "On leave" : "Inactive";
  const variant =
    status === "active" ? ("positive" as const) : status === "on-leave" ? ("warning" as const) : undefined;

  return (
    <span className="salesGrid__status">
      <Pill pillRole="status" colorVariant={variant}>
        {label}
      </Pill>
    </span>
  );
}
