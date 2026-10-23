import Box from "carbon-react/lib/components/box";
import { Checkbox } from "carbon-react/lib/components/checkbox";
import Icon from "carbon-react/lib/components/icon";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import { sageWalletPrefill, type SageWalletUsage } from "../../data/sageWalletOnboarding";
import type { SageWalletCopy } from "./sageWalletTypes";

export type SageWalletAccountForm = {
  accountName: string;
  usage: SageWalletUsage[];
  acceptedTerms: boolean;
  showErrors: boolean;
};

type SageWalletAccountStepProps = {
  copy: SageWalletCopy["account"];
  form: SageWalletAccountForm;
  onChange: (form: SageWalletAccountForm) => void;
};

const USAGE_OPTIONS: SageWalletUsage[] = ["customerPayments", "teamExpenses", "supplierPayments"];

// Step 1: one short form. Business details are a read-only summary because Sage
// already knows them; only the account name, intended usage and consent are new.
export default function SageWalletAccountStep({ copy, form, onChange }: SageWalletAccountStepProps) {
  const nameError = form.showErrors && !form.accountName.trim() ? copy.accountNameError : undefined;
  const termsError = form.showErrors && !form.acceptedTerms ? copy.termsError : undefined;
  const toggleUsage = (usage: SageWalletUsage, checked: boolean) => onChange({
    ...form,
    usage: checked ? [...form.usage, usage] : form.usage.filter(item => item !== usage),
  });

  return (
    <Box className="sageWalletStep" display="flex" flexDirection="column">
      {/* Read-only: Sage already knows these, so they are shown, not asked. */}
      <section className="sageWalletPrefilled" aria-labelledby="sage-wallet-business-heading">
        <Typography variant="small" as="p" className="sageWalletPrefilled__note">
          <Icon type="lightbulb_on" aria-hidden />
          {copy.prefilled}
        </Typography>
        <Typography variant="h3" as="h3" id="sage-wallet-business-heading" screenReaderOnly>{copy.businessHeading}</Typography>
        <dl className="sageWalletPrefilled__list">
          {[
            [copy.businessName, sageWalletPrefill.businessName],
            [copy.companyNumber, sageWalletPrefill.companyNumber],
            [copy.representative, sageWalletPrefill.representative],
            [copy.email, sageWalletPrefill.email],
          ].map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <fieldset className="sageWalletStep__group">
        <legend><Typography variant="h3" as="span">{copy.accountHeading}</Typography></legend>
        <Textbox id="sage-wallet-account-name" label={copy.accountName} required value={form.accountName}
          error={nameError} onChange={event => onChange({ ...form, accountName: event.target.value })} />
        <fieldset className="sageWalletStep__usage">
          <legend><Typography variant="p" as="span" fontWeight="500">{copy.usageLegend}</Typography></legend>
          <div className="sageWalletStep__chips">
            {USAGE_OPTIONS.map(usage => (
              <Checkbox key={usage} id={`sage-wallet-usage-${usage}`} label={copy.usage[usage]}
                checked={form.usage.includes(usage)} onChange={event => toggleUsage(usage, event.target.checked)} />
            ))}
          </div>
        </fieldset>
      </fieldset>

      <Checkbox id="sage-wallet-terms" label={copy.terms} required checked={form.acceptedTerms} error={termsError}
        onChange={event => onChange({ ...form, acceptedTerms: event.target.checked })} />
    </Box>
  );
}
