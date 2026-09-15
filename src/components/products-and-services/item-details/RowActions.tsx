import { ActionPopover, ActionPopoverItem } from "carbon-react/lib/components/action-popover";

type RowActionsProps = {
  entityLabel: string;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
};

export default function RowActions({ entityLabel, onEdit, onDuplicate, onDelete }: RowActionsProps) {
  return (
    <ActionPopover aria-label={`More actions for ${entityLabel}`}>
      <ActionPopoverItem
        icon="edit"
        onClick={
          onEdit ??
          (() => {
            // PROTOTYPE: wire to edit flow when available
          })
        }
      >
        Edit
      </ActionPopoverItem>
      <ActionPopoverItem
        icon="copy"
        onClick={
          onDuplicate ??
          (() => {
            // PROTOTYPE: wire to duplicate flow when available
          })
        }
      >
        Duplicate
      </ActionPopoverItem>
      <ActionPopoverItem
        icon="delete"
        onClick={
          onDelete ??
          (() => {
            // PROTOTYPE: wire to delete confirmation when available
          })
        }
      >
        Delete
      </ActionPopoverItem>
    </ActionPopover>
  );
}
