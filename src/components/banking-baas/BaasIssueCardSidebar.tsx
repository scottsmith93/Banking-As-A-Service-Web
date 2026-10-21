import { useState, type FormEvent } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import { ButtonToggle, ButtonToggleGroup } from "carbon-react/lib/components/button-toggle";
import Decimal from "carbon-react/lib/components/decimal";
import FilterableSelect from "carbon-react/lib/components/select/filterable-select";
import { Option } from "carbon-react/lib/components/select";
import Sidebar from "carbon-react/lib/components/sidebar";
import Switch from "carbon-react/lib/components/switch";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import { useLanguage } from "../../context/useLanguage";
import { cardIssueCategoryOptions, cardIssueRegionOptions } from "../../data/bankingBaas";
import { getLocale, getLocaleCode } from "../../locales";
import BaasIssueCardPreview from "./BaasIssueCardPreview";
import BaasTokenPicker from "./BaasTokenPicker";

export type BaasCardIssueFormData = {
  cardholder: string;
  nickname: string;
  colour: "sage" | "night" | "plum";
  network: "visa" | "mastercard";
  digitalWalletsEnabled: boolean;
  onlinePaymentsEnabled: boolean;
  recurringPaymentsEnabled: boolean;
  spendingLimits: {
    daily: number | null;
    monthly: number | null;
    perTransaction: number | null;
    total: number | null;
  };
  allowedRegions: string[];
  blockedCategories: string[];
};

type BaasIssueCardSidebarProps = {
  open: boolean;
  cardholders: string[];
  onCancel: () => void;
  onIssue: (formData: BaasCardIssueFormData) => void;
};

type SpendingLimitKey = keyof BaasCardIssueFormData["spendingLimits"];

const spendingLimitFields: { key: SpendingLimitKey; copyKey: SpendingLimitKey }[] = [
  { key: "daily", copyKey: "daily" },
  { key: "monthly", copyKey: "monthly" },
  { key: "perTransaction", copyKey: "perTransaction" },
  { key: "total", copyKey: "total" },
];

export default function BaasIssueCardSidebar({ open, cardholders, onCancel, onIssue }: BaasIssueCardSidebarProps) {
  const { language } = useLanguage();
  const baasCopy = getLocale(language).bankingBaas;
  const copy = baasCopy.cards;
  const formCopy = baasCopy.cardIssueForm;
  const locale = getLocaleCode(language);
  const [cardholder, setCardholder] = useState("");
  const [nickname, setNickname] = useState("");
  const [colour, setColour] = useState<BaasCardIssueFormData["colour"]>("sage");
  const [network, setNetwork] = useState<BaasCardIssueFormData["network"]>("mastercard");
  const [digitalWalletsEnabled, setDigitalWalletsEnabled] = useState(false);
  const [onlinePaymentsEnabled, setOnlinePaymentsEnabled] = useState(true);
  const [recurringPaymentsEnabled, setRecurringPaymentsEnabled] = useState(false);
  const [spendingLimits, setSpendingLimits] = useState<Record<SpendingLimitKey, string>>({
    daily: "",
    monthly: "",
    perTransaction: "",
    total: "",
  });
  const [allowedRegions, setAllowedRegions] = useState<string[]>(["France"]);
  const [blockedCategories, setBlockedCategories] = useState<string[]>(cardIssueCategoryOptions);

  const resetForm = () => {
    setCardholder("");
    setNickname("");
    setColour("sage");
    setNetwork("mastercard");
    setDigitalWalletsEnabled(false);
    setOnlinePaymentsEnabled(true);
    setRecurringPaymentsEnabled(false);
    setSpendingLimits({ daily: "", monthly: "", perTransaction: "", total: "" });
    setAllowedRegions(["France"]);
    setBlockedCategories(cardIssueCategoryOptions);
  };

  const updateLimit = (key: SpendingLimitKey, value: string) => {
    setSpendingLimits((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const toOptionalNumber = (value: string) => value.trim() ? Number(value) : null;

    onIssue({
      cardholder,
      nickname: nickname.trim(),
      colour,
      network,
      digitalWalletsEnabled,
      onlinePaymentsEnabled,
      recurringPaymentsEnabled,
      spendingLimits: {
        daily: toOptionalNumber(spendingLimits.daily),
        monthly: toOptionalNumber(spendingLimits.monthly),
        perTransaction: toOptionalNumber(spendingLimits.perTransaction),
        total: toOptionalNumber(spendingLimits.total),
      },
      allowedRegions,
      blockedCategories,
    });
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <Sidebar
      className="baasIssueSidebar"
      open={open}
      onCancel={handleCancel}
      position="right"
      width="480px"
      header={<Typography variant="h1" as="h1">{formCopy.title}</Typography>}
      subHeader={<Typography variant="p" as="p">{formCopy.description}</Typography>}
      headerPadding={{ p: 2 }}
      subHeaderPadding={{ p: 2 }}
      aria-label={formCopy.title}
    >
      <form className="baasIssueForm" onSubmit={handleSubmit}>
        <Box className="baasIssueForm__fields" display="flex" flexDirection="column" gap={3}>
          <Typography variant="small" as="p" className="baasIssueForm__requiredNote">{formCopy.requiredInformation}</Typography>

          <BaasIssueCardPreview
            cardholder={cardholder}
            nickname={nickname}
            network={network}
            colour={colour}
            copy={{
              cardholder: copy.cardholder,
              virtual: copy.virtual,
              nicknamePlaceholder: formCopy.nicknamePlaceholder,
              previewDescription: formCopy.previewDescription,
              unnamedCardholder: formCopy.selectCardholder,
              network: { visa: copy.visa, mastercard: copy.mastercard },
            }}
          />

          <Box className="baasIssueForm__colourField" display="flex" flexDirection="column" gap={1}>
            <Typography variant="strong" as="span">{copy.colourLabel}</Typography>
            <Box className="baasCardColourOptions" display="flex" gap={2}>
              {(["sage", "night", "plum"] as const).map((cardColour) => (
                <Button
                  key={cardColour}
                  type="button"
                  className={`baasCardColourOption baasCardTile__visual baasCardTile__visual--${cardColour}${colour === cardColour ? " baasCardColourOption--selected" : ""}`}
                  aria-label={copy.colours[cardColour]}
                  aria-pressed={colour === cardColour}
                  onClick={() => setColour(cardColour)}
                />
              ))}
            </Box>
          </Box>

          <FilterableSelect
            id="baas-issue-cardholder"
            label={formCopy.cardholderRequired}
            inputHint={formCopy.cardholderHint}
            placeholder={formCopy.selectCardholder}
            value={cardholder}
            onChange={(event) => setCardholder(event.target.value)}
            required
          >
            {cardholders.map((name) => <Option key={name} text={name} value={name} />)}
          </FilterableSelect>

          <Textbox
            id="baas-issue-card-nickname"
            label={formCopy.nickname}
            placeholder={formCopy.nicknamePlaceholder}
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />

          <ButtonToggleGroup
            id="baas-issue-card-network"
            label={formCopy.networkRequired}
            value={network}
            fullWidth
            onChange={(_, value) => {
              if (value === "visa" || value === "mastercard") setNetwork(value);
            }}
          >
            <ButtonToggle value="mastercard">{copy.mastercard}</ButtonToggle>
            <ButtonToggle value="visa">{copy.visa}</ButtonToggle>
          </ButtonToggleGroup>

          <Switch
            id="baas-issue-digital-wallets"
            label={formCopy.digitalWallets}
            inputHint={formCopy.digitalWalletsHint}
            checked={digitalWalletsEnabled}
            onChange={(event) => setDigitalWalletsEnabled(event.target.checked)}
            labelInline
          />

          <Box className="baasIssueForm__spendingControls" display="flex" flexDirection="column" gap={2}>
            <Box className="baasIssueForm__spendingHeading" display="flex" flexDirection="column" gap={1}>
              <Typography variant="h3" as="h2">{formCopy.spendingControls}</Typography>
              <Typography variant="small" as="p">{formCopy.spendingControlsDescription}</Typography>
            </Box>
            <Box className="baasIssueForm__limits" display="flex" flexDirection="column" gap={3}>
              {spendingLimitFields.map(({ key }) => (
                <Decimal
                  key={key}
                  id={`baas-issue-limit-${key}`}
                  label={formCopy.limits[key]}
                  inputWidth={100}
                  allowEmptyValue
                  locale={locale}
                  value={spendingLimits[key]}
                  onChange={(event) => updateLimit(key, event.target.value.rawValue)}
                />
              ))}
            </Box>
          </Box>

          <Switch
            id="baas-issue-online-payments"
            label={formCopy.onlinePayments}
            inputHint={formCopy.onlinePaymentsHint}
            checked={onlinePaymentsEnabled}
            onChange={(event) => setOnlinePaymentsEnabled(event.target.checked)}
            labelInline
          />
          <Switch
            id="baas-issue-recurring-payments"
            label={formCopy.recurringPayments}
            inputHint={formCopy.recurringPaymentsHint}
            checked={recurringPaymentsEnabled}
            onChange={(event) => setRecurringPaymentsEnabled(event.target.checked)}
            labelInline
          />

          <BaasTokenPicker
            id="baas-issue-allowed-regions"
            label={formCopy.allowedRegions}
            placeholder={formCopy.searchRegions}
            values={allowedRegions}
            options={cardIssueRegionOptions}
            colour="positive"
            removeLabel={formCopy.removeValue}
            onChange={setAllowedRegions}
          />
          <BaasTokenPicker
            id="baas-issue-blocked-categories"
            label={formCopy.blockedMerchants}
            placeholder={formCopy.searchBlockedCategories}
            values={blockedCategories}
            options={cardIssueCategoryOptions}
            colour="negative"
            removeLabel={formCopy.removeValue}
            onChange={setBlockedCategories}
          />

          <Typography variant="small" as="p" className="baasIssueForm__disclaimer">{formCopy.issuerDisclaimer}</Typography>
        </Box>

        <Box className="baasIssueForm__actions" display="flex" flexDirection="column" gap={2}>
          <Button type="button" variantType="secondary" onClick={handleCancel}>{copy.cancel}</Button>
          <Button type="submit" variantType="primary">{formCopy.createCard}</Button>
        </Box>
      </form>
    </Sidebar>
  );
}
