import CarbonPill, { type PillProps } from "carbon-react/lib/components/pill";
import "./status-pill.css";

// Carbon retains semantics and focus behaviour. Static status badges share one prototype visual contract;
// removable/actionable tags (including Carbon's own filter selections) keep Carbon's interaction styling.
export default function StatusPill(props: PillProps) {
  const status = props.pillRole === "status" || (!props.onDelete && !props.onClick);
  const tone = props.pillRole === "status" ? props.colorVariant ?? "neutral" : "tag";
  return <CarbonPill {...props} data-prototype-status={status ? "true" : undefined}
    data-status-tone={tone} data-status-inverse={props.isDarkBackground ? "true" : undefined} />;
}
