import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Dialog from "carbon-react/lib/components/dialog";
import Form from "carbon-react/lib/components/form";
import Message from "carbon-react/lib/components/message";
import type { Customer } from "../../data/customers";
import { CustomerEditorFields, type CustomerDraftErrors } from "./CustomerEditorFields";
import type { CustomerDraft, CustomerEditorMode, CustomerManagementCopy } from "./types";

type CustomerEditorDialogProps = {
  copy: CustomerManagementCopy;
  mode: CustomerEditorMode;
  customer: Customer | null;
  customers: Customer[];
  onCancel: () => void;
  onSave: (draft: CustomerDraft) => void;
};

function createDraft(customer: Customer | null): CustomerDraft {
  if (customer) {
    return {
      customerCode: customer.customerCode,
      name: customer.name,
      customerType: customer.customerType,
      vatNumber: customer.vatNumber,
      contactName: customer.contactName,
      email: customer.email,
      phone: customer.phone,
      town: customer.town,
      countryCode: customer.countryCode,
      status: customer.status,
    };
  }
  return { customerCode: "", name: "", customerType: "business", vatNumber: "", contactName: "", email: "", phone: "", town: "", countryCode: "ES", status: "active" };
}

export function CustomerEditorDialog({ copy, mode, customer, customers, onCancel, onSave }: CustomerEditorDialogProps) {
  const [draft, setDraft] = useState<CustomerDraft>(() => createDraft(customer));
  const [submitted, setSubmitted] = useState(false);

  const errors: CustomerDraftErrors = {};
  if (!draft.customerCode.trim()) errors.customerCode = copy.form.validation.required;
  if (!draft.name.trim()) errors.name = copy.form.validation.required;
  if (!draft.contactName.trim()) errors.contactName = copy.form.validation.required;
  if (!draft.town.trim()) errors.town = copy.form.validation.required;
  if (!draft.email.trim()) {
    errors.email = copy.form.validation.required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) {
    errors.email = copy.form.validation.email;
  }
  if (customers.some((item) => item.id !== customer?.id && item.customerCode.toLowerCase() === draft.customerCode.trim().toLowerCase())) {
    errors.customerCode = copy.form.validation.duplicateCode;
  }

  const handleSave = () => {
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;
    // PROTOTYPE: the parent updates local state; replace this with the customer API.
    onSave(Object.fromEntries(Object.entries(draft).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])) as CustomerDraft);
  };

  return (
    <Dialog open title={mode === "create" ? copy.form.createTitle : copy.form.editTitle} subtitle={copy.form.description} size="large" stickyFooter onCancel={onCancel} footer={
      <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
        <Button variantType="secondary" onClick={onCancel}>{copy.actions.cancel}</Button>
        <Button variantType="primary" onClick={handleSave}>{mode === "create" ? copy.actions.save : copy.actions.saveChanges}</Button>
      </Box>
    }>
      <Form onSubmit={(event) => { event.preventDefault(); handleSave(); }}>
        {submitted && Object.keys(errors).length > 0 && (
          <Message variant="error" title={copy.form.validation.summaryTitle}>{copy.form.validation.summaryBody}</Message>
        )}
        <CustomerEditorFields copy={copy} draft={draft} errors={errors} showErrors={submitted} onChange={setDraft} />
      </Form>
    </Dialog>
  );
}
