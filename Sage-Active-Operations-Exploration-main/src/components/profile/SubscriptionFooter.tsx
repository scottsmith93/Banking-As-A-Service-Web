import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import FooterKpiTile from "../FooterKpiTile";
import { formatEur } from "../../utils/formatCurrency";

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
  return (
    <Box className="subscriptionFooter" display="flex" alignItems="center" justifyContent="flex-end">
      <Box className="subscriptionFooter__kpis" display="flex" alignItems="center">
        <FooterKpiTile amount={formatEur(monthlyCost)} label="Subscription cost per month" />
        <FooterKpiTile amount={formatEur(vatAmount)} label="VAT" />
      </Box>

      <Box className="subscriptionFooter__actions" display="flex" alignItems="center">
        <Button variant="default" variantType="tertiary" size="medium" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="default"
          variantType="primary"
          size="medium"
          disabled={subscribeDisabled}
          onClick={onSubscribe}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
}
