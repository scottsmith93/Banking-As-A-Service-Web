import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";

type CreateRecordFooterProps = {
  onCancel: () => void;
  onCreate?: () => void;
  createLabel?: string;
};

export default function CreateRecordFooter({
  onCancel,
  onCreate,
  createLabel = "Create",
}: CreateRecordFooterProps) {
  return (
    <Box
      className="createRecord__footer"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
    >
      <Box className="salesQuoteCreate__footerActions" display="flex" alignItems="center">
        <Button variantType="tertiary" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variantType="primary"
          onClick={() => {
            // PROTOTYPE: replace with save — navigates back after create in parent
            onCreate?.();
          }}
        >
          {createLabel}
        </Button>
      </Box>
    </Box>
  );
}
