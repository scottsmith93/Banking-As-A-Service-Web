import Box from "carbon-react/lib/components/box";
import Decimal from "carbon-react/lib/components/decimal";
import Switch from "carbon-react/lib/components/switch";
import Typography from "carbon-react/lib/components/typography";
import { useLanguage } from "../../context/useLanguage";
import { cardIssueCategoryOptions, cardIssueRegionOptions } from "../../data/bankingBaas";
import { getLocale, getLocaleCode } from "../../locales";
import type { BaasCardIssueFormState } from "../../hooks/useBaasCardIssueForm";
import BaasTokenPicker from "./BaasTokenPicker";

export default function BaasCardIssueRestrictions({ form }: { form: BaasCardIssueFormState }) {
  const { language } = useLanguage();
  const copy = getLocale(language).bankingBaas.cardIssueForm;
  const controls = [
    { key: "online", label: copy.onlinePayments, hint: copy.onlinePaymentsHint },
    { key: "recurring", label: copy.recurringPayments, hint: copy.recurringPaymentsHint },
    ...(form.cardType === "physical" ? [
      { key: "atm", label: copy.atmWithdrawals, hint: copy.atmWithdrawalsHint },
      { key: "inStore", label: copy.inStorePayments, hint: copy.inStorePaymentsHint },
    ] : []),
  ] as { key: keyof typeof form.payments; label: string; hint: string }[];
  return (
    <>
      <hr className="baasIssueForm__divider" />
      <Box className="baasIssueForm__spendingControls" display="flex" flexDirection="column" gap={3}>
        <Box className="baasIssueForm__spendingHeading" display="flex" flexDirection="column" gap={1}>
          <Typography variant="h3" as="h2">{copy.spendingControls}</Typography>
          <Typography variant="small" as="p">{copy.spendingControlsDescription}</Typography>
        </Box>
        <Box className="baasIssueForm__limits">
          {(["daily", "monthly", "perTransaction", "total"] as const).map(key => (
            <Decimal key={key} id={`baas-issue-limit-${key}`} label={copy.limits[key]} prefix="€" inputWidth={100} allowEmptyValue
              locale={getLocaleCode(language)} value={form.limits[key]} onChange={event => form.updateLimit(key, event.target.value.rawValue)}
              error={form.errors[key] ? copy.limitError : undefined} />
          ))}
        </Box>
        <Box className="baasIssueForm__paymentControls" display="flex" flexDirection="column" gap={3}>
          {controls.map(control => <Switch key={control.key} id={`baas-issue-${control.key}-payments`} label={control.label} inputHint={control.hint}
            checked={form.payments[control.key]} onChange={event => form.updatePayment(control.key, event.target.checked)} labelInline />)}
        </Box>
        <BaasTokenPicker id="baas-issue-allowed-regions" label={copy.allowedRegions} placeholder={copy.searchRegions}
          values={form.allowedRegions} options={cardIssueRegionOptions} colour="positive" removeLabel={copy.removeValue} onChange={form.setAllowedRegions} />
      </Box>
      <hr className="baasIssueForm__divider" />
      <Box className="baasIssueForm__blockedMerchants" display="flex" flexDirection="column" gap={3}>
        <Box className="baasIssueForm__blockedMerchantsHeading" display="flex" flexDirection="column" gap={1}>
          <Typography variant="h3" as="h2">{copy.blockedMerchants}</Typography>
          <Typography variant="small" as="p">{copy.blockedMerchantsDescription}</Typography>
        </Box>
        <BaasTokenPicker id="baas-issue-blocked-categories" label={copy.searchBlockedCategories} placeholder={copy.searchBlockedCategories}
          values={form.blockedCategories} options={cardIssueCategoryOptions} colour="negative" removeLabel={copy.removeValue} onChange={form.setBlockedCategories} />
      </Box>
      <hr className="baasIssueForm__divider" />
    </>
  );
}
