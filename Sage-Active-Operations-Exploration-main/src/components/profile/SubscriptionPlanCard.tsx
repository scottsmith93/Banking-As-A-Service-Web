import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import Button from "carbon-react/lib/components/button/__next__";
import type { SubscriptionPlan } from "../../data/subscriptionPlans";
import { formatEur } from "../../utils/formatCurrency";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";

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
  const { language } = useLanguage();
  const locale = getLocale(language);
  const translated = locale.profile.plans[plan.id as keyof typeof locale.profile.plans];
  const name = translated?.name ?? plan.name;
  const description = translated?.description ?? plan.description;
  const allowance = translated?.allowance ?? plan.allowanceBullets;
  const roles = translated?.roles ?? plan.userRoleBullets;
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
            {name}
          </Typography>
        </Box>

        <Typography variant="p" as="p" className="subscriptionPlanCard__description">
          {description}
        </Typography>

        <Box className="subscriptionPlanCard__allowanceBox" display="flex" flexDirection="column">
          <Typography variant="p" as="p" className="subscriptionPlanCard__allowanceLabel">
            {locale.profile.monthlyAllocation}
          </Typography>
          <AllowanceBulletList items={allowance} />
        </Box>

        <Box className="subscriptionPlanCard__allowanceBox" display="flex" flexDirection="column">
          <Typography variant="p" as="p" className="subscriptionPlanCard__allowanceLabel">
            {locale.profile.includedUserRoles}
          </Typography>
          <AllowanceBulletList items={roles} />
        </Box>

        {plan.id !== "portal" && (
          <Button variant="default" variantType="secondary" size="medium" fullWidth>
            {locale.profile.viewAdditionalFees}
          </Button>
        )}

        <Box className="subscriptionPlanCard__priceBox">
          <Typography variant="p" as="p" className="subscriptionPlanCard__price">
            {plan.id === "portal"
              ? locale.profile.providedByAccountant
              : plan.priceLabel ?? `${formatEur(plan.priceAmount)} ${locale.profile.perMonth}`}
          </Typography>
        </Box>

        {state === "current" && plan.id !== "portal" && (
          <Button
            variant="destructive"
            variantType="primary"
            size="medium"
            fullWidth
            onClick={onCancelSubscription}
          >
            {locale.profile.cancelSubscription}
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
            {locale.profile.deselect}
          </Button>
        )}

        {state === "default" && (
          <Button variant="default" variantType="primary" size="medium" fullWidth onClick={onSelect}>
            {locale.profile.selectSubscription}
          </Button>
        )}
      </Box>

      {state !== "default" && (
        <Box className="subscriptionPlanCard__footer" display="flex" alignItems="center" justifyContent="center">
          <Typography variant="p" as="span" className="subscriptionPlanCard__footerText">
            {state === "current" ? locale.profile.currentSubscription : locale.profile.subscriptionSelected}
          </Typography>
          {state === "selected" && (
            <Icon type="tick_thick" className="subscriptionPlanCard__footerIcon" aria-hidden />
          )}
        </Box>
      )}
    </div>
  );
}
