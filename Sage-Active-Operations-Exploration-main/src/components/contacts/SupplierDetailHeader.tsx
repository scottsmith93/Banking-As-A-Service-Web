import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Divider from "carbon-react/lib/components/divider";
import Typography from "carbon-react/lib/components/typography";
import HeaderBackLink from "../HeaderBackLink";

type SupplierDetailHeaderProps = {
  title: string;
  onBack: () => void;
};

export default function SupplierDetailHeader({ title, onBack }: SupplierDetailHeaderProps) {
  return (
    <Box className="supplierDetail__header">
      <HeaderBackLink label="Suppliers" onClick={onBack} />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h1" as="h1" className="supplierDetail__title">
          {title}
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variantType="tertiary"
            iconType="hand_cash_note"
            iconPosition="before"
            onClick={() => {
              // PROTOTYPE: wire to record-payment flow when available
            }}
          >
            Record payment
          </Button>
          <Button
            variantType="tertiary"
            iconType="attach"
            iconPosition="before"
            onClick={() => {
              // PROTOTYPE: wire to view/attach files flow when available
            }}
          >
            View or attach files
          </Button>
          <Divider type="vertical" h={32} />
          <Button
            variantType="tertiary"
            iconType="ellipsis_vertical"
            aria-label="More actions"
            onClick={() => {
              // PROTOTYPE: wire to a more-actions menu (duplicate, delete) when available
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
