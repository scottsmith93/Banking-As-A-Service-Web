import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import Button from "carbon-react/lib/components/button/__next__";
import type { SubscriptionPlan } from "../../data/subscriptionPlans";
import { formatEur } from "../../utils/formatCurrency";

export type SubscriptionPlanCardState = "default" | "current" | "selected";

type SubscriptionPlanCardProps = {
  plan: SubscriptionPlan;
  state: SubscriptionPlanCardState;
  onSelect?: () => void;
  onDeselect?: () => void;
  onCancelSubscription?: () => void;
};

function AllowanceBulletList({ items }: { items: string[] }) {
  return (
    <Box as="ul" className="subscriptionPlanCard__bulletList">
      {items.map((item) => (
        <Box as="li" key={item} className="subscriptionPlanCard__bulletItem">
          {item}
        </Box>
      ))}
    </Box>
  );
}

export default function SubscriptionPlanCard({
  plan,
  state,
  onSelect,
  onDeselect,
  onCancelSubscription,
}: SubscriptionPlanCardProps) {
  return (
    <div className={`subscriptionPlanCard subscriptionPlanCard--${state}`}>
      <Box className="subscriptionPlanCard__body" display="flex" flexDirection="column">
        <Box className="subscriptionPlanCard__titleRow" display="flex" alignItems="center">
          <img
            src="/icon-sage-active.svg"
            alt=""
            width={48}
            height={48}
            className="subscriptionPlanCard__icon"
          />
          <Typography variant="h2" as="h2" className="subscriptionPlanCard__title">
            {plan.name}
          </Typography>
        </Box>

        <Typography variant="p" as="p" className="subscriptionPlanCard__description">
          {plan.description}
        </Typography>

        <Box className="subscriptionPlanCard__allowanceBox" display="flex" flexDirection="column">
          <Typography variant="p" as="p" className="subscriptionPlanCard__allowanceLabel">
            Monthly allocation:
          </Typography>
          <AllowanceBulletList items={plan.allowanceBullets} />
        </Box>

        <Box className="subscriptionPlanCard__allowanceBox" display="flex" flexDirection="column">
          <Typography variant="p" as="p" className="subscriptionPlanCard__allowanceLabel">
            Included user roles:
          </Typography>
          <AllowanceBulletList items={plan.userRoleBullets} />
        </Box>

        <Button variant="default" variantType="secondary" size="medium" fullWidth>
          View additional fees
        </Button>

        <Box className="subscriptionPlanCard__priceBox">
          <Typography variant="p" as="p" className="subscriptionPlanCard__price">
            {formatEur(plan.priceAmount)} per month
          </Typography>
        </Box>

        {state === "current" && (
          <Button
            variant="destructive"
            variantType="primary"
            size="medium"
            fullWidth
            onClick={onCancelSubscription}
          >
            Cancel subscription
          </Button>
        )}

        {state === "selected" && (
          <Button
            variant="default"
            variantType="secondary"
            size="medium"
            fullWidth
            iconType="cross"
            iconPosition="before"
            onClick={onDeselect}
          >
            Deselect
          </Button>
        )}

        {state === "default" && (
          <Button variant="default" variantType="primary" size="medium" fullWidth onClick={onSelect}>
            Select subscription
          </Button>
        )}
      </Box>

      {state !== "default" && (
        <Box className="subscriptionPlanCard__footer" display="flex" alignItems="center" justifyContent="center">
          <Typography variant="p" as="span" className="subscriptionPlanCard__footerText">
            {state === "current" ? "Current subscription" : "Subscription selected"}
          </Typography>
          {state === "selected" && (
            <Icon type="tick_thick" className="subscriptionPlanCard__footerIcon" aria-hidden />
          )}
        </Box>
      )}
    </div>
  );
}
