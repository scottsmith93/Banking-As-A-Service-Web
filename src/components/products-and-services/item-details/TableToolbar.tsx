import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Pill from "../../status-pill/StatusPill";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";

type TableToolbarProps = {
  title: string;
  count: number;
  searchLabel: string;
  actionLabel: string;
  onAction: () => void;
};

export default function TableToolbar({
  title,
  count,
  searchLabel,
  actionLabel,
  onAction,
}: TableToolbarProps) {
  const [searchText, setSearchText] = useState("");

  return (
    <Box className="itemDetailsTableToolbar" display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="strong" as="p" className="itemDetailsTableToolbar__title">
          {title}
        </Typography>
        <Pill pillRole="tag">{String(count)}</Pill>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <Box className="itemDetailsTableToolbar__search">
          <Textbox
            id={`${searchLabel.replace(/\s+/g, "-").toLowerCase()}-search`}
            aria-label={searchLabel}
            placeholder="Search"
            inputIcon="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </Box>
        <Button
          variantType="secondary"
          iconType="filter"
          iconPosition="before"
          onClick={() => {
            // PROTOTYPE: wire to a filter panel when available
          }}
        >
          Filter
        </Button>
        <Button variantType="primary" iconType="add" iconPosition="before" onClick={onAction}>
          {actionLabel}
        </Button>
      </Box>
    </Box>
  );
}
