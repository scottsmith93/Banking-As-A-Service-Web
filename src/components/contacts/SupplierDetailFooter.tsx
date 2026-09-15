import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";

type SupplierDetailFooterProps = {
  onCancel: () => void;
};

export default function SupplierDetailFooter({ onCancel }: SupplierDetailFooterProps) {
  return (
    <Box
      className="supplierDetail__footer"
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      gap={2}
    >
      <Button variantType="tertiary" onClick={onCancel}>
        Cancel
      </Button>
      <Button variantType="secondary" disabled>
        Update
      </Button>
    </Box>
  );
}
