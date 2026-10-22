import Box from "carbon-react/lib/components/box";
import { RadioButton, RadioButtonGroup } from "carbon-react/lib/components/radio-button";
import { Select, Option } from "carbon-react/lib/components/select";
import Switch from "carbon-react/lib/components/switch";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";
import type { BaasCardIssueFormState } from "../../hooks/useBaasCardIssueForm";
import BaasCardNetworkLogo from "./BaasCardNetworkLogo";
import BaasCardIssueShipping, { BaasCardIssuePin } from "./BaasCardIssuePhysicalFields";

export default function BaasCardIssueDetails({ form, cardholders }: { form: BaasCardIssueFormState; cardholders: string[] }) {
  const { language } = useLanguage();
  const { cards: copy, cardIssueForm: formCopy } = getLocale(language).bankingBaas;
  return (
    <>
      <RadioButtonGroup id="baas-issue-card-network" data-element="baas-issue-network-options" legend={formCopy.networkRequired}
        name="baas-issue-card-network" value={form.network} inline
        onChange={event => form.setNetwork(event.target.value as "visa" | "mastercard")}>
        {(["visa", "mastercard"] as const).map(network => (
          <RadioButton key={network} id={`baas-issue-card-network-${network}`} data-element="baas-issue-network-option"
            data-role={form.network === network ? "selected" : undefined} value={network} label={(
              <span className="baasIssueNetworkChoice">
                <span className="baasIssueNetworkChoice__logo" aria-hidden="true"><BaasCardNetworkLogo network={network} tone="light" /></span>
                <Typography as="span" screenReaderOnly>{copy[network]}</Typography>
              </span>
            )} />
        ))}
      </RadioButtonGroup>
      <Box className="baasIssueForm__identity">
        {/* Import Select and Option together: Carbon matches option component identity. */}
        <Select id="baas-issue-cardholder" label={copy.cardholder} placeholder={formCopy.selectCardholder}
          value={form.cardholder} onChange={event => form.selectCardholder(String(event.target.value))}
          error={form.errors.cardholder ? formCopy.cardholderError : undefined} required>
          {cardholders.map(name => <Option key={name} text={name} value={name} />)}
        </Select>
        <Textbox id="baas-issue-card-nickname" label={formCopy.nickname} placeholder={formCopy.nicknamePlaceholder}
          value={form.nickname} onChange={event => form.setNickname(event.target.value)} />
      </Box>
      {form.cardType === "physical" && <BaasCardIssuePin form={form} />}
      <Box className="baasIssueForm__wallets" display="flex" flexDirection="column">
        <Switch id="baas-issue-digital-wallets" label={formCopy.digitalWallets} inputHint={formCopy.digitalWalletsHint}
          checked={form.payments.wallets} onChange={event => form.updatePayment("wallets", event.target.checked)} labelInline />
        <Box className="baasIssueForm__walletProviders" display="flex" alignItems="center" gap={2}>
          <img src="/assets/banking-baas/apple-pay.png" alt={formCopy.walletProviders.applePay} width={61} height={25} />
          <img src="/assets/banking-baas/google-pay.png" alt={formCopy.walletProviders.googlePay} width={54} height={25} />
        </Box>
      </Box>
      {form.cardType === "physical" && <BaasCardIssueShipping form={form} />}
    </>
  );
}
