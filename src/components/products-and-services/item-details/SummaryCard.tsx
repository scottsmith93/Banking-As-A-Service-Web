import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Link from "carbon-react/lib/components/link";
import Pill from "../../status-pill/StatusPill";
import Typography from "carbon-react/lib/components/typography";
import { Card, CardContent } from "./Card";
import KeyRow from "./KeyRow";
import type { Capability, ItemWorkspaceTab } from "./capabilityMeta";
import { CAPABILITY_META } from "./capabilityMeta";

type SummaryCardProps = {
  capability: Capability;
  enabled: boolean;
  rows?: { label: string; value: string }[];
  emptyStateText: string;
  toggleCap: (capability: Capability) => void;
  setTab: (tab: ItemWorkspaceTab) => void;
};

export default function SummaryCard({
  capability,
  enabled,
  rows,
  emptyStateText,
  toggleCap,
  setTab,
}: SummaryCardProps) {
  const meta = CAPABILITY_META[capability];

  return (
    <Card className="itemDetailsSummaryCard">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Box className="itemDetailsSummaryCard__icon">
              <Icon type={meta.icon} />
            </Box>
            <Typography variant="strong" as="p" className="itemDetailsSummaryCard__title">
              {meta.workspaceTitle}
            </Typography>
          </Box>
          <Pill pillRole="status" colorVariant={enabled ? "positive" : undefined}>
            {enabled ? "Enabled" : "Not enabled"}
          </Pill>
        </Box>

        {enabled && rows ? (
          <Box className="itemDetailsSummaryCard__rows">
            {rows.map((row) => (
              <KeyRow key={row.label} label={row.label} value={row.value} />
            ))}
          </Box>
        ) : (
          <Typography variant="p" as="p" className="itemDetailsSummaryCard__emptyState">
            {emptyStateText}
          </Typography>
        )}

        <Link
          icon="chevron_right"
          iconAlign="right"
          onClick={() => (enabled ? setTab(meta.tab) : toggleCap(capability))}
        >
          {enabled ? `Manage ${meta.workspaceTitle.toLowerCase()}` : `Enable ${meta.workspaceTitle.toLowerCase()}`}
        </Link>
      </CardContent>
    </Card>
  );
}
