import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Switch from "carbon-react/lib/components/switch";
import Textarea from "carbon-react/lib/components/textarea";
import Typography from "carbon-react/lib/components/typography";
import type { SupplierDetail } from "../../data/suppliers";

type SupplierAdditionalInformationProps = {
  detail: SupplierDetail;
  inactive: boolean;
  onInactiveChange: (inactive: boolean) => void;
};

export default function SupplierAdditionalInformation({
  detail,
  inactive,
  onInactiveChange,
}: SupplierAdditionalInformationProps) {
  const [comments, setComments] = useState(detail.comments);
  const [finalInvoiceNotes, setFinalInvoiceNotes] = useState(detail.finalInvoiceNotes);

  return (
    <Box className="supplierDetail__panel">
      <Typography variant="h3" as="p" className="supplierDetail__panelHeading">
        Additional information
      </Typography>

      <Textarea
        id="supplier-comments"
        label="Comments"
        value={comments}
        onChange={(event) => setComments(event.target.value)}
        rows={5}
      />

      <Textarea
        id="supplier-final-invoice-notes"
        label="Final invoice notes"
        inputHint="Add compliance information or notes you want to show at the end of invoices for this supplier."
        value={finalInvoiceNotes}
        onChange={(event) => setFinalInvoiceNotes(event.target.value)}
        characterLimit={500}
        rows={5}
      />

      <Switch
        id="supplier-inactive"
        label="Inactive"
        checked={inactive}
        onChange={(event) => onInactiveChange(event.target.checked)}
      />
    </Box>
  );
}
