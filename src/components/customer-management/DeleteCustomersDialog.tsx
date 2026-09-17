import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Dialog from "carbon-react/lib/components/dialog";
import Typography from "carbon-react/lib/components/typography";
import type { Customer } from "../../data/customers";
import { interpolate } from "../../utils/interpolate";
import type { CustomerManagementCopy } from "./types";

type DeleteCustomersDialogProps = {
  copy: CustomerManagementCopy;
  customers: Customer[];
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteCustomersDialog({ copy, customers, onCancel, onConfirm }: DeleteCustomersDialogProps) {
  const isSingle = customers.length === 1;
  const customerName = customers[0]?.name ?? "";
  const title = isSingle ? interpolate(copy.deleteDialog.singleTitle, { customerName }) : interpolate(copy.deleteDialog.multipleTitle, { count: customers.length });
  const body = isSingle ? interpolate(copy.deleteDialog.singleBody, { customerName }) : copy.deleteDialog.multipleBody;

  return (
    <Dialog open title={title} size="small" onCancel={onCancel} footer={
      <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
        <Button variantType="secondary" onClick={onCancel}>{copy.deleteDialog.cancel}</Button>
        <Button variant="destructive" variantType="primary" onClick={onConfirm}>{copy.deleteDialog.confirm}</Button>
      </Box>
    }>
      <Typography variant="p" as="p">{body}</Typography>
    </Dialog>
  );
}
