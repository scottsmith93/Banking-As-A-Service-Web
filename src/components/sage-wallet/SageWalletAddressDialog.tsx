import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Dialog from "carbon-react/lib/components/dialog";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import { cardIssueShippingCountries } from "../../data/bankingBaas";
import { useLanguage } from "../../context/useLanguage";
import { getLocale, getLocaleCode } from "../../locales";
import type { SageWalletCopy, ShippingAddress } from "./sageWalletTypes";

type SageWalletAddressDialogProps = {
  open: boolean;
  copy: SageWalletCopy["card"]["addressDialog"];
  address: ShippingAddress;
  onCancel: () => void;
  onSave: (address: ShippingAddress) => void;
};

const REQUIRED_FIELDS: (keyof ShippingAddress)[] = ["line1", "city", "postcode", "country"];

// A second window for changing where the physical card is posted. Field labels
// reuse the existing card-issuing shipping copy so both flows read the same.
// The parent re-keys it on every open, so it starts from the saved address.
export default function SageWalletAddressDialog({ open, copy, address, onCancel, onSave }: SageWalletAddressDialogProps) {
  const { language } = useLanguage();
  const fieldCopy = getLocale(language).bankingBaas.cardIssueForm.shipping;
  const countries = new Intl.DisplayNames([getLocaleCode(language)], { type: "region" });
  const [draft, setDraft] = useState(address);
  const [showErrors, setShowErrors] = useState(false);

  const missing = (key: keyof ShippingAddress) => showErrors && REQUIRED_FIELDS.includes(key) && !draft[key].trim();
  const field = (key: Exclude<keyof ShippingAddress, "country">) => (
    <Textbox id={`sage-wallet-address-${key}`} label={fieldCopy.fields[key]} required={REQUIRED_FIELDS.includes(key)}
      value={draft[key]} error={missing(key) ? fieldCopy.requiredError : undefined}
      onChange={event => setDraft(current => ({ ...current, [key]: event.target.value }))} />
  );

  const save = () => {
    if (REQUIRED_FIELDS.some(key => !draft[key].trim())) {
      setShowErrors(true);
      return;
    }
    onSave(draft);
  };

  return (
    <Dialog open={open} onCancel={onCancel} size="medium" title={copy.title} className="sageWalletSubDialog"
      footer={<Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variantType="tertiary" onClick={onCancel}>{copy.cancel}</Button>
        <Button variantType="primary" onClick={save}>{copy.save}</Button>
      </Box>}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="p" as="p">{copy.body}</Typography>
        {field("line1")}
        {field("line2")}
        <div className="sageWalletStep__grid">{field("postcode")}{field("city")}</div>
        <div className="sageWalletStep__grid">
          {field("county")}
          <Select id="sage-wallet-address-country" label={fieldCopy.fields.country} placeholder={fieldCopy.selectCountry} required
            value={draft.country} error={missing("country") ? fieldCopy.requiredError : undefined}
            onChange={event => setDraft(current => ({ ...current, country: String(event.target.value) }))}>
            {cardIssueShippingCountries.map(code => <Option key={code} value={code} text={countries.of(code) ?? code} />)}
          </Select>
        </div>
      </Box>
    </Dialog>
  );
}
