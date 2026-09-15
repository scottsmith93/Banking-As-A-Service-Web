import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import DialogComponent from "carbon-react/lib/components/dialog";
import Typography from "carbon-react/lib/components/typography";

type EnableManufacturingDialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function EnableManufacturingDialog({
  open,
  onCancel,
  onConfirm,
}: EnableManufacturingDialogProps) {
  return (
    <DialogComponent
      open={open}
      onCancel={onCancel}
      title="Enable manufacturing?"
      size="small"
      footer={
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variantType="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variantType="primary" onClick={onConfirm}>
            Enable manufacturing
          </Button>
        </Box>
      }
    >
      <Typography variant="p" as="p">
        This will add manufacturing workspaces for BOM, routing, revisions, and production
        parameters.
      </Typography>
    </DialogComponent>
  );
}
