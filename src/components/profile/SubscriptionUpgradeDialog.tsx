import { useEffect, useState } from "react";
import Dialog from "carbon-react/lib/components/dialog";
import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import Pill from "../status-pill/StatusPill";
import LoaderBar from "carbon-react/lib/components/loader-bar";
import shoppingCartIllustration from "../../assets/subscription-flow/shopping-cart-illustration.png";
import overloadIllustration from "../../assets/subscription-flow/overload-illustration.svg";
import successIllustration from "../../assets/subscription-flow/success-illustration.svg";
import { SUBSCRIPTION_UPGRADE_COPY, DEFAULT_UPGRADE_COPY } from "../../data/subscriptionUpgradeFlow";
import type { SubscriptionPlan } from "../../data/subscriptionPlans";

type WizardStep = 1 | 2 | 3 | 4;

type SubscriptionUpgradeDialogProps = {
  open: boolean;
  plan: SubscriptionPlan | null;
  onClose: () => void;
  onComplete: () => void;
};

// PROTOTYPE: simulated processing delay — replace with the real
// provisioning call once the backend flow exists.
const LOADING_STEP_DURATION_MS = 1800;
const SUCCESS_STEP_DURATION_MS = 1800;

function UpgradeFlowHeader({ planName }: { planName: string }) {
  return (
    <Box className="upgradeFlow__header" display="flex" alignItems="center">
      <img
        src="/icon-sage-active-inverse.svg"
        alt=""
        width={48}
        height={48}
        className="upgradeFlow__headerIcon"
      />
      <Typography variant="h1" as="h1" className="upgradeFlow__headerTitle">
        Sage Active {planName}
      </Typography>
    </Box>
  );
}

export default function SubscriptionUpgradeDialog({
  open,
  plan,
  onClose,
  onComplete,
}: SubscriptionUpgradeDialogProps) {
  const [step, setStep] = useState<WizardStep>(1);

  useEffect(() => {
    if (!open) return;

    if (step === 3) {
      const timer = setTimeout(() => setStep(4), LOADING_STEP_DURATION_MS);
      return () => clearTimeout(timer);
    }

    if (step === 4) {
      const timer = setTimeout(onComplete, SUCCESS_STEP_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [open, step, onComplete]);

  if (!open || !plan) {
    return null;
  }

  const copy = SUBSCRIPTION_UPGRADE_COPY[plan.id] ?? DEFAULT_UPGRADE_COPY;

  return (
    <Dialog
      open={open}
      size="large"
      onCancel={onClose}
      showCloseIcon={step < 3}
      contentPadding={{ p: 0 }}
      aria-label={`Switch to Sage Active ${plan.name}`}
    >
      <Box className="upgradeFlow" display="flex">
        {step <= 2 && (
          <Box
            className="upgradeFlow__darkPanel upgradeFlow__darkPanel--split"
            display="flex"
            flexDirection="column"
          >
            <UpgradeFlowHeader planName={plan.name} />

            {step === 1 ? (
              <Box
                className="upgradeFlow__heroContent"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <img src={shoppingCartIllustration} alt="" className="upgradeFlow__heroIllustration" />
                <Typography variant="p" as="p" className="upgradeFlow__heroCaption">
                  Upgrading takes about a minute. Your existing products, sales and accounts will stay
                  exactly where they are.
                </Typography>
              </Box>
            ) : (
              <Box
                className="upgradeFlow__heroContent"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <img src={overloadIllustration} alt="" className="upgradeFlow__heroIllustration" />
                <Typography variant="p" as="p" className="upgradeFlow__heroCaption">
                  Your data is safe. Nothing is deleted or overwritten. All your existing transactions,
                  contacts, and settings stay exactly as they are.
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {step <= 2 && (
          <Box className="upgradeFlow__lightPanel" display="flex" flexDirection="column">
            <Box className="upgradeFlow__lightPanelBody" display="flex" flexDirection="column">
              {step === 1 ? (
                <>
                  <Box className="upgradeFlow__section" display="flex" flexDirection="column">
                    <Typography variant="h2" as="h2" className="upgradeFlow__heading">
                      {copy.stepOneTitle}
                    </Typography>
                    <Typography variant="p" as="p" className="upgradeFlow__body">
                      {copy.stepOneDescription}
                    </Typography>
                  </Box>

                  {copy.features.length > 0 && (
                    <Box className="upgradeFlow__section" display="flex" flexDirection="column">
                      <Typography variant="h2" as="h2" className="upgradeFlow__heading">
                        Here&apos;s what you&apos;ll get
                      </Typography>
                      <Box className="upgradeFlow__featureList" display="flex" flexDirection="column">
                        {copy.features.map((feature) => (
                          <Box
                            key={feature.title}
                            className="upgradeFlow__featureCard"
                            display="flex"
                            alignItems="flex-start"
                            justifyContent="space-between"
                          >
                            <Box display="flex" alignItems="flex-start">
                              <img src={feature.icon} alt="" className="upgradeFlow__featureIcon" />
                              <Box display="flex" flexDirection="column">
                                <Typography
                                  variant="strong"
                                  as="p"
                                  className="upgradeFlow__featureTitle"
                                >
                                  {feature.title}
                                </Typography>
                                <Typography variant="p" as="p" className="upgradeFlow__featureDescription">
                                  {feature.description}
                                </Typography>
                              </Box>
                            </Box>
                            <Pill colorVariant="positive" fill={false}>
                              {feature.pillLabel}
                            </Pill>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </>
              ) : (
                <Box className="upgradeFlow__section" display="flex" flexDirection="column">
                  <Typography variant="h2" as="h2" className="upgradeFlow__heading">
                    {copy.stepTwoTitle}
                  </Typography>
                  <Box className="upgradeFlow__changeList" display="flex" flexDirection="column">
                    {copy.changes.map((change) => (
                      <Box
                        key={change.title}
                        className="upgradeFlow__changeRow"
                        display="flex"
                        alignItems="flex-start"
                      >
                        <Typography variant="strong" as="p" className="upgradeFlow__changeLabel">
                          {change.label}
                        </Typography>
                        <Icon type="arrow_right" className="upgradeFlow__changeArrow" aria-hidden />
                        <Box display="flex" flexDirection="column">
                          <Typography variant="strong" as="p" className="upgradeFlow__changeTitle">
                            {change.title}
                          </Typography>
                          <Typography variant="p" as="p" className="upgradeFlow__changeDescription">
                            {change.description}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

            <Box className="upgradeFlow__footer" display="flex" alignItems="center" justifyContent="flex-end">
              <Button
                variant="default"
                variantType="primary"
                size="medium"
                iconType="chevron_right_thick"
                iconPosition="after"
                onClick={() => setStep(step === 1 ? 2 : 3)}
              >
                {step === 1 ? "Continue" : "Next"}
              </Button>
            </Box>
          </Box>
        )}

        {step === 3 && (
          <Box className="upgradeFlow__darkPanel upgradeFlow__darkPanel--full" display="flex" flexDirection="column">
            <UpgradeFlowHeader planName={plan.name} />
            <Box
              className="upgradeFlow__centerContent"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h2" as="h2" className="upgradeFlow__centerHeading">
                We&apos;re preparing everything for your business.
              </Typography>
              <Box className="upgradeFlow__loaderWrap" display="flex" flexDirection="column" alignItems="center">
                <LoaderBar size="large" />
                <Typography variant="p" as="p" className="upgradeFlow__loaderLabel">
                  Loading...
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {step === 4 && (
          <Box className="upgradeFlow__darkPanel upgradeFlow__darkPanel--full" display="flex" flexDirection="column">
            <UpgradeFlowHeader planName={plan.name} />
            <Box
              className="upgradeFlow__centerContent"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h2" as="h2" className="upgradeFlow__centerHeading">
                Welcome to Sage Active {plan.name}
              </Typography>
              <img src={successIllustration} alt="" className="upgradeFlow__successIllustration" />
            </Box>
          </Box>
        )}
      </Box>
    </Dialog>
  );
}
