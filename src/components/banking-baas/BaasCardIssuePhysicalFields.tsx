import Typography from "carbon-react/lib/components/typography";
import Textbox from "carbon-react/lib/components/textbox";
import Password from "carbon-react/lib/components/password";
import Box from "carbon-react/lib/components/box";
import { Select, Option } from "carbon-react/lib/components/select";
import { useLanguage } from "../../context/useLanguage";
import { getLocale, getLocaleCode } from "../../locales";
import { cardIssueShippingCountries } from "../../data/bankingBaas";
import type { BaasCardIssueFormState } from "../../hooks/useBaasCardIssueForm";
import type { ShippingAddress } from "./baasCardIssueTypes";

export function BaasCardIssuePin({ form }: { form: BaasCardIssueFormState }) {
  const { language } = useLanguage();
  const copy = getLocale(language).bankingBaas.cardIssueForm.pin;
  return <Password id="baas-issue-pin" label={copy.label} inputHint={copy.hint} inputMode="numeric" maxLength={4} forceObscurity
    maxWidth="calc(var(--spacing500) * 4)"
    autoComplete="new-password" value={form.pin} onChange={event => form.updatePin(event.target.value)}
    required error={form.errors.pin ? copy.error : undefined} />;
}

export default function BaasCardIssueShipping({ form }: { form: BaasCardIssueFormState }) {
  const { language } = useLanguage();
  const copy = getLocale(language).bankingBaas.cardIssueForm.shipping;
  const countries = new Intl.DisplayNames([getLocaleCode(language)], { type: "region" });
  const field = (key: keyof ShippingAddress) => (
    <Textbox key={key} id={`baas-issue-shipping-${key}`} label={copy.fields[key]}
      value={form.shippingAddress[key]} onChange={event => form.updateAddress(key, event.target.value)}
      required={["line1", "county"].includes(key)} error={form.errors[key] ? copy.requiredError : undefined} />
  );
  return (
    <fieldset className="baasCardIssueShipping">
      <legend><Typography variant="h3" as="span">{copy.title}</Typography></legend>
      <Typography variant="p" as="p">{copy.description}</Typography>
      {field("line1")}
      {field("line2")}
      <Box className="baasCardIssueShipping__row">{field("city")}{field("postcode")}</Box>
      <Box className="baasCardIssueShipping__row">
        {field("county")}
        <Select id="baas-issue-shipping-country" label={copy.fields.country} placeholder={copy.selectCountry}
          value={form.shippingAddress.country} onChange={event => form.updateAddress("country", String(event.target.value))}
          required error={form.errors.country ? copy.requiredError : undefined}>
          {cardIssueShippingCountries.map(code => <Option key={code} value={code} text={countries.of(code) ?? code} />)}
        </Select>
      </Box>
    </fieldset>
  );
}
