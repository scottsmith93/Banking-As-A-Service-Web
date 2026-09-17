import Box from "carbon-react/lib/components/box";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import { CUSTOMER_COUNTRY_CODES } from "../../data/customers";
import type { CustomerDraft, CustomerManagementCopy } from "./types";

export type CustomerDraftErrors = Partial<Record<keyof CustomerDraft, string>>;

type CustomerEditorFieldsProps = {
  copy: CustomerManagementCopy;
  draft: CustomerDraft;
  errors: CustomerDraftErrors;
  showErrors: boolean;
  onChange: (draft: CustomerDraft) => void;
};

export function CustomerEditorFields({ copy, draft, errors, showErrors, onChange }: CustomerEditorFieldsProps) {
  const errorFor = (field: keyof CustomerDraft) => showErrors ? errors[field] : undefined;
  const update = <Key extends keyof CustomerDraft>(field: Key, value: CustomerDraft[Key]) => {
    onChange({ ...draft, [field]: value });
  };

  return (
    <Box className="customerEditor__sections">
      <section className="customerEditor__section" aria-labelledby="customer-business-heading">
        <Typography id="customer-business-heading" variant="h3" as="h3">
          {copy.form.sections.business}
        </Typography>
        <div className="customerEditor__fieldGrid">
          <Textbox id="customer-code" label={copy.form.fields.code} required autoFocus value={draft.customerCode} error={errorFor("customerCode")} onChange={(event) => update("customerCode", event.target.value)} />
          <Textbox id="customer-name" label={copy.form.fields.name} required value={draft.name} error={errorFor("name")} onChange={(event) => update("name", event.target.value)} />
          <Select id="customer-type" label={copy.form.fields.type} value={draft.customerType} onChange={(event) => update("customerType", event.target.value as CustomerDraft["customerType"])}>
            <Option text={copy.types.business} value="business" />
            <Option text={copy.types.individual} value="individual" />
          </Select>
          <Textbox id="customer-vat-number" label={copy.form.fields.vatNumber} value={draft.vatNumber} onChange={(event) => update("vatNumber", event.target.value)} />
          <Select id="customer-country" label={copy.form.fields.country} value={draft.countryCode} onChange={(event) => update("countryCode", event.target.value as CustomerDraft["countryCode"])}>
            {CUSTOMER_COUNTRY_CODES.map((countryCode) => <Option key={countryCode} text={copy.countries[countryCode]} value={countryCode} />)}
          </Select>
          <Select id="customer-status" label={copy.form.fields.status} value={draft.status} onChange={(event) => update("status", event.target.value as CustomerDraft["status"])}>
            <Option text={copy.statuses.active} value="active" />
            <Option text={copy.statuses.inactive} value="inactive" />
          </Select>
        </div>
      </section>

      <section className="customerEditor__section" aria-labelledby="customer-contact-heading">
        <Typography id="customer-contact-heading" variant="h3" as="h3">
          {copy.form.sections.contact}
        </Typography>
        <div className="customerEditor__fieldGrid">
          <Textbox id="customer-contact-name" label={copy.form.fields.contactName} required value={draft.contactName} error={errorFor("contactName")} onChange={(event) => update("contactName", event.target.value)} />
          <Textbox id="customer-email" label={copy.form.fields.email} required inputMode="email" value={draft.email} error={errorFor("email")} onChange={(event) => update("email", event.target.value)} />
          <Textbox id="customer-phone" label={copy.form.fields.phone} inputMode="tel" value={draft.phone} onChange={(event) => update("phone", event.target.value)} />
          <Textbox id="customer-town" label={copy.form.fields.town} required value={draft.town} error={errorFor("town")} onChange={(event) => update("town", event.target.value)} />
        </div>
      </section>
    </Box>
  );
}
