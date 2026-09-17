import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import type { CustomerManagementCopy, CustomerStatusFilter } from "./types";

type CustomerManagementToolbarProps = {
  copy: CustomerManagementCopy;
  searchText: string;
  statusFilter: CustomerStatusFilter;
  selectionText: string;
  selectedCount: number;
  onCreate: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: CustomerStatusFilter) => void;
};

export function CustomerManagementToolbar({
  copy,
  searchText,
  statusFilter,
  selectionText,
  selectedCount,
  onCreate,
  onEdit,
  onDelete,
  onSearchChange,
  onStatusChange,
}: CustomerManagementToolbarProps) {
  return (
    <Box className="customerManagement__toolbar" display="flex" justifyContent="space-between" alignItems="flex-end">
      <Box className="customerManagement__toolbarStart" display="flex" alignItems="center">
        <Button variantType="primary" iconType="add" iconPosition="before" onClick={onCreate}>
          {copy.actions.create}
        </Button>
        <Button variantType="secondary" iconType="edit" iconPosition="before" disabled={selectedCount !== 1} onClick={onEdit}>
          {copy.actions.edit}
        </Button>
        <Button variant="destructive" variantType="secondary" iconType="delete" iconPosition="before" disabled={selectedCount === 0} onClick={onDelete}>
          {copy.actions.delete}
        </Button>
        <Typography variant="small" as="p" className="customerManagement__selection" aria-live="polite">
          {selectionText}
        </Typography>
      </Box>

      <Box className="customerManagement__filters" display="flex" alignItems="flex-end">
        <Textbox
          id="customer-management-search"
          label={copy.search.label}
          placeholder={copy.search.placeholder}
          inputIcon="search"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <Select
          id="customer-management-status"
          label={copy.filters.status}
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value as CustomerStatusFilter)}
        >
          <Option text={copy.filters.allStatuses} value="all" />
          <Option text={copy.statuses.active} value="active" />
          <Option text={copy.statuses.inactive} value="inactive" />
        </Select>
      </Box>
    </Box>
  );
}
