import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import { ButtonToggle, ButtonToggleGroup } from "carbon-react/lib/components/button-toggle";
import Icon from "carbon-react/lib/components/icon";
import Pill from "carbon-react/lib/components/pill";
import { Option, Select } from "carbon-react/lib/components/select";
import Typography from "carbon-react/lib/components/typography";
import { sageWalletMonthlyLimitsEur } from "../../data/sageWalletOnboarding";
import type { DebitCard } from "../../data/bankingBaas";
import { useLanguage } from "../../context/useLanguage";
import { getLocaleCode } from "../../locales";
import SageWalletAddressDialog from "./SageWalletAddressDialog";
import SageWalletCardholderDialog from "./SageWalletCardholderDialog";
import type { SageWalletCardDraft, SageWalletCopy } from "./sageWalletTypes";

type SageWalletCardStepProps = {
  copy: SageWalletCopy["card"];
  draft: SageWalletCardDraft;
  cardholders: string[];
  formatEur: (amount: number) => string;
  onChange: (draft: SageWalletCardDraft) => void;
  onAddCardholder: (fullName: string) => void;
};

const CARD_STYLES: DebitCard["colour"][] = ["sage", "night", "plum"];

// Step 3: the debit card offer, laid out to fit without scrolling. Defaults
// make one click enough; every choice updates the live preview on the left.
export default function SageWalletCardStep({ copy, draft, cardholders, formatEur, onChange, onAddCardholder }: SageWalletCardStepProps) {
  const { language } = useLanguage();
  const [isCardholderOpen, setCardholderOpen] = useState(false);
  const [isAddressOpen, setAddressOpen] = useState(false);
  // Bumped on each open so the small windows remount with fresh fields.
  const [subDialogKey, setSubDialogKey] = useState(0);
  const openCardholder = () => { setSubDialogKey(key => key + 1); setCardholderOpen(true); };
  const openAddress = () => { setSubDialogKey(key => key + 1); setAddressOpen(true); };
  const countries = new Intl.DisplayNames([getLocaleCode(language)], { type: "region" });
  const address = draft.deliveryAddress;
  const addressSummary = [address.line1, address.line2, `${address.postcode} ${address.city}`, countries.of(address.country)].filter(Boolean).join(", ");

  return (
    <Box className="sageWalletStep sageWalletStep--compact" display="flex" flexDirection="column">
      <ButtonToggleGroup id="sage-wallet-card-type" label={copy.typeLegend} value={draft.type}
        onChange={(_event, value) => value && onChange({ ...draft, type: value as DebitCard["type"] })}>
        <ButtonToggle value="virtual">{copy.virtualTitle}</ButtonToggle>
        <ButtonToggle value="physical">{copy.physicalTitle}</ButtonToggle>
      </ButtonToggleGroup>

      <Typography variant="small" as="p" className="sageWalletStep__typeNote" role="status">
        {draft.type === "virtual" && <Pill size="S" pillRole="status" colorVariant="positive">{copy.virtualTag}</Pill>}
        {draft.type === "virtual" ? copy.virtualBody : copy.physicalBody}
      </Typography>

      <div className="sageWalletStep__grid sageWalletStep__grid--top">
        <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
          <Select id="sage-wallet-cardholder" label={copy.cardholder} value={draft.cardholder}
            onChange={event => onChange({ ...draft, cardholder: String(event.target.value) })}>
            {cardholders.map(name => <Option key={name} text={name} value={name} />)}
          </Select>
          <Button variantType="tertiary" size="small" iconType="add" iconPosition="before" onClick={openCardholder}>{copy.addCardholder}</Button>
        </Box>
        <Select id="sage-wallet-limit" label={copy.monthlyLimit} value={String(draft.monthlyLimitEur)}
          onChange={event => onChange({ ...draft, monthlyLimitEur: Number(event.target.value) })}>
          {sageWalletMonthlyLimitsEur.map(limit => <Option key={limit} text={formatEur(limit)} value={String(limit)} />)}
        </Select>
      </div>

      <ButtonToggleGroup id="sage-wallet-card-style" label={copy.styleLegend} value={draft.colour}
        onChange={(_event, value) => value && onChange({ ...draft, colour: value as DebitCard["colour"] })}>
        {CARD_STYLES.map(style => (
          <ButtonToggle key={style} value={style}>
            <span className={`sageWalletStep__swatch sageWalletStep__swatch--${style}`} aria-hidden="true" />
            {copy.styles[style]}
          </ButtonToggle>
        ))}
      </ButtonToggleGroup>

      {draft.type === "physical" && (
        <div className="sageWalletDelivery">
          <span className="sageWalletStep__nextIcon"><Icon type="home" aria-hidden /></span>
          <Box display="flex" flexDirection="column" flexGrow={1} minWidth={0}>
            <Typography variant="small" as="span" fontWeight="500">{copy.deliverTo}</Typography>
            <Typography variant="small" as="span" className="sageWalletStep__muted">{addressSummary}</Typography>
          </Box>
          <Button variantType="tertiary" size="small" onClick={openAddress}>{copy.changeAddress}</Button>
        </div>
      )}

      <SageWalletCardholderDialog key={`cardholder-${subDialogKey}`} open={isCardholderOpen} copy={copy.cardholderDialog} onCancel={() => setCardholderOpen(false)}
        onSave={fullName => { onAddCardholder(fullName); setCardholderOpen(false); }} />
      <SageWalletAddressDialog key={`address-${subDialogKey}`} open={isAddressOpen} copy={copy.addressDialog} address={address} onCancel={() => setAddressOpen(false)}
        onSave={deliveryAddress => { onChange({ ...draft, deliveryAddress }); setAddressOpen(false); }} />
    </Box>
  );
}

const DONE_ICONS = ["mobile", "credit_card", "camera"] as const;

// Final view: confirm the card and suggest what to do with it next.
export function SageWalletDoneStep({ body, nextHeading, next }: { body: string; nextHeading: string; next: string[] }) {
  return (
    <Box className="sageWalletStep" display="flex" flexDirection="column">
      <Typography variant="p" as="p">{body}</Typography>
      <Typography variant="h3" as="h3">{nextHeading}</Typography>
      <ul className="sageWalletStep__next">
        {next.map((item, index) => (
          <li key={item}>
            <span className="sageWalletStep__nextIcon"><Icon type={DONE_ICONS[index] ?? "tick"} aria-hidden /></span>
            <Typography variant="p" as="span">{item}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}
