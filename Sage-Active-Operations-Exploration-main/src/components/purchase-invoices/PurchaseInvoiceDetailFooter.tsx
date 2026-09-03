import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import SplitButton from "carbon-react/lib/components/split-button";

type PurchaseInvoiceDetailFooterProps = {
  onCancel: () => void;
};

export default function PurchaseInvoiceDetailFooter({
  onCancel,
}: PurchaseInvoiceDetailFooterProps) {
  return (
    <Box
      className="purchaseInvoiceDetail__footer"
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
      <SplitButton text="Accept and post" buttonType="primary">
        <Button
          onClick={() => {
            // PROTOTYPE: replace with refuse / partial acceptance flow
          }}
        >
          Refuse or partially accept
        </Button>
      </SplitButton>
    </Box>
  );
}
