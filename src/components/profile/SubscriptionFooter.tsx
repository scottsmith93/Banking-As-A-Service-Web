import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import FooterKpiTile from "../FooterKpiTile";
import { formatEur } from "../../utils/formatCurrency";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";

type SubscriptionFooterProps = {
  monthlyCost: number;
  vatAmount: number;
  subscribeDisabled: boolean;
  onCancel: () => void;
  onSubscribe: () => void;
};

export default function SubscriptionFooter({
  monthlyCost,
  vatAmount,
  subscribeDisabled,
  onCancel,
  onSubscribe,
}: SubscriptionFooterProps) {
  const { language } = useLanguage();
  const locale = getLocale(language);
  return (
    <Box className="subscriptionFooter" display="flex" alignItems="center" justifyContent="flex-end">
      <Box className="subscriptionFooter__kpis" display="flex" alignItems="center">
        <FooterKpiTile amount={formatEur(monthlyCost)} label={locale.profile.subscriptionCostPerMonth} />
        <FooterKpiTile amount={formatEur(vatAmount)} label={locale.profile.vat} />
      </Box>

      <Box className="subscriptionFooter__actions" display="flex" alignItems="center">
        <Button variant="default" variantType="tertiary" size="medium" onClick={onCancel}>
          {locale.profile.cancel}
        </Button>
        <Button
          variant="default"
          variantType="primary"
          size="medium"
          disabled={subscribeDisabled}
          onClick={onSubscribe}
        >
          {locale.profile.subscribe}
        </Button>
      </Box>
    </Box>
  );
}
