import { useEffect, useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import { Checkbox } from "carbon-react/lib/components/checkbox";
import Dialog from "carbon-react/lib/components/dialog";
import Icon from "carbon-react/lib/components/icon";
import Loader from "carbon-react/lib/components/loader/__next__";
import { RadioButton, RadioButtonGroup } from "carbon-react/lib/components/radio-button";
import { StepSequence, StepSequenceItem } from "carbon-react/lib/components/step-sequence";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import successIllustration from "../../assets/subscription-flow/success-illustration.svg";
import { baasBusinessProfile, baasOnboardingDemoAnswers } from "../../data/bankingBaas";

type BaasOnboardingCopy = {
  title: string;
  chooseTitle: string;
  chooseBody: string;
  paymentsTitle: string;
  businessTitle: string;
  physicalDigital: string;
  providerPoweredBy: string;
  selectAccount: string;
  benefits: string[];
  startProviderTitle: string;
  startTitle: string;
  startBody: string;
  startConsent: string;
  startContinue: string;
  startReadyTitle: string;
  startReadyItems: string[];
  startExpectTitle: string;
  startExpectItems: string[];
  startTerms: string;
  startAgreement: string;
  startCancel: string;
  applicationTitle: string;
  applicationBody: string;
  requiredInformation: string;
  formTitleOverrides: string[];
  formFields: Array<Array<{
    label: string;
    variant?: string;
    helper?: string;
    placeholder?: string;
  }>>;
  formStepActions: string[];
  accountType: string;
  typeOfEntity: string;
  entityHints: string[];
  individual: string;
  organization: string;
  soleProprietorship: string;
  trust: string;
  partnership: string;
  discard: string;
  back: string;
  continue: string;
  loadingTitle: string;
  loadingBody: string;
  processingTitle: string;
  processingBody: string;
  approvedTitle: string;
  approvedBody: string;
  returnToBanking: string;
  manageBank: string;
  reviewTerms: string;
  reviewAgreement: string;
  edit: string;
  submit: string;
  reviewSections: Array<{
    title: string;
    rows: Array<{
      label: string;
      value?: string;
      variant?: string;
    }>;
  }>;
  steps: string[];
  stepDescriptions: string[];
  stepFields: string[];
  stepPlaceholders: string[];
  reviewTitle: string;
  reviewBody: string;
  summary: {
    businessName: string;
    businessOwner: string;
    entityType: string;
    email: string;
  };
};

type BaasOnboardingDialogProps = {
  open: boolean;
  copy: BaasOnboardingCopy;
  onClose: () => void;
  onComplete: () => void;
  onManageBank?: () => void;
};

type OnboardingView = "loading" | "choose" | "start" | "form" | "processing" | "approved";

const FORM_STEP_COUNT = 8;

export default function BaasOnboardingDialog({
  open,
  copy,
  onClose,
  onComplete,
  onManageBank,
}: BaasOnboardingDialogProps) {
  const [view, setView] = useState<OnboardingView>("loading");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAccountType, setSelectedAccountType] = useState(copy.accountType);
  const [entityType, setEntityType] = useState<string>(baasBusinessProfile.entityType);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(baasOnboardingDemoAnswers.formFields);
  const [hasAgreed, setHasAgreed] = useState(true);

  useEffect(() => {
    if (!open || (view !== "loading" && view !== "processing")) return undefined;

    const timer = window.setTimeout(() => {
      if (view === "loading") {
        setView("choose");
        return;
      }

      onComplete();
      setView("approved");
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [open, onComplete, view]);

  const handleClose = () => {
    setView("loading");
    setCurrentStep(0);
    setSelectedAccountType(copy.accountType);
    setEntityType(baasBusinessProfile.entityType);
    setFieldValues(baasOnboardingDemoAnswers.formFields);
    setHasAgreed(true);
    onClose();
  };

  const handleAccountSelected = (accountType: string) => {
    setCurrentStep(0);
    setSelectedAccountType(accountType);
    setView("start");
  };

  const handleContinue = () => {
    if (currentStep < FORM_STEP_COUNT - 1) {
      setCurrentStep((step) => step + 1);
      return;
    }

    setView("processing");
  };

  const updateFieldValue = (fieldId: string, value: string) => {
    setFieldValues((values) => ({ ...values, [fieldId]: value }));
  };

  const providerTitle = copy.startProviderTitle.replace("{accountType}", selectedAccountType);
  const applicationTitle = copy.applicationTitle.replace("{accountType}", selectedAccountType);
  const processingTitle = copy.processingTitle.replace("{accountType}", selectedAccountType);
  const approvedTitle = copy.approvedTitle.replace("{accountType}", selectedAccountType);
  const approvedBody = copy.approvedBody.replaceAll("{accountType}", selectedAccountType.toLowerCase());

  return (
    <Dialog
      open={open}
      onCancel={handleClose}
      size="large"
      className="baasOnboardingDialog"
      title={copy.title}
      showCloseIcon={view !== "loading" && view !== "processing" && view !== "approved"}
      contentPadding={{ p: 0 }}
      aria-label={copy.title}
    >
      {view === "loading" && <BaasLoadingState title={copy.loadingTitle} body={copy.loadingBody} />}

      {view === "choose" && (
        <Box className="baasOnboarding" display="flex" flexDirection="column">
          <Box className="baasOnboarding__selection" display="flex" flexDirection="column">
            <Typography variant="h2" as="h2" className="baasOnboarding__title">
              {copy.chooseTitle}
            </Typography>
            <Typography variant="p" as="p" className="baasOnboarding__intro">
              {copy.chooseBody}
            </Typography>

            <BaasAccountOption
              title={copy.paymentsTitle}
              copy={copy}
              benefits={copy.benefits}
              onSelect={() => handleAccountSelected(copy.paymentsTitle.replace(/\s+powered by.*$/i, "").trim() || copy.accountType)}
            />
            <BaasAccountOption
              title={copy.businessTitle}
              copy={copy}
              benefits={copy.benefits}
              onSelect={() => handleAccountSelected(copy.businessTitle.replace(/\s+powered by.*$/i, "").trim() || copy.accountType)}
            />
          </Box>
        </Box>
      )}

      {view === "start" && (
        <Box className="baasOnboarding baasOnboarding--providerStart" display="flex" flexDirection="column">
          <Box className="baasOnboarding__providerStartBody" display="flex" flexDirection="column">
            <BaasProviderHeader title={providerTitle} />
            <BaasProviderList title={copy.startReadyTitle} items={copy.startReadyItems} />
            <BaasProviderList title={copy.startExpectTitle} items={copy.startExpectItems} />
            <Typography variant="small" as="p" className="baasOnboarding__providerTerms">
              {copy.startTerms}
            </Typography>
            <Box className="baasOnboarding__providerAgreement" display="flex" alignItems="center">
              <Checkbox
                id="baas-start-agreement"
                label={copy.startAgreement}
                checked={hasAgreed}
                onChange={(event) => setHasAgreed(event.target.checked)}
              />
            </Box>
            <Box className="baasOnboarding__providerActions" display="flex" justifyContent="flex-end" gap={2}>
              <Button variantType="secondary" onClick={handleClose}>{copy.startCancel}</Button>
              <Button variantType="primary" disabled={!hasAgreed} onClick={() => setView("form")}>
                {copy.startContinue}
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {view === "form" && (
        <Box className="baasOnboarding baasOnboarding--application" display="flex">
          <Box className="baasOnboarding__stepRail">
            <StepSequence orientation="vertical" aria-label={applicationTitle}>
              {copy.steps.map((label, index) => (
                <StepSequenceItem
                  key={label}
                  aria-label={label}
                  hiddenCompleteLabel="Complete"
                  hiddenCurrentLabel="Current"
                  indicator={`${index + 1}`}
                  status={index < currentStep ? "complete" : index === currentStep ? "current" : "incomplete"}
                >
                  {label}
                </StepSequenceItem>
              ))}
            </StepSequence>
          </Box>

          <Box className="baasOnboarding__applicationBody" display="flex" flexDirection="column">
            <BaasProviderHeader title={applicationTitle} providerPoweredBy={copy.providerPoweredBy} />
            <Typography variant="p" as="p" className="baasOnboarding__intro">
              {copy.applicationBody}
            </Typography>
            <Box className="baasOnboarding__formCard" display="flex" flexDirection="column">
              <Typography variant="h2" as="h2">{copy.formTitleOverrides[currentStep]}</Typography>
              <Typography variant="small" as="p" className="baasOnboarding__required">{copy.requiredInformation}</Typography>

              {currentStep === 0 ? (
                <RadioButtonGroup
                  legend={copy.typeOfEntity}
                  name="baas-entity-type"
                  value={entityType}
                  onChange={(event) => setEntityType(event.target.value)}
                >
                  <RadioButton id="baas-entity-individual" value="individual" label={copy.individual} inputHint={copy.entityHints[0]} />
                  <RadioButton id="baas-entity-organization" value="organization" label={copy.organization} inputHint={copy.entityHints[1]} />
                  <RadioButton id="baas-entity-sole" value="sole" label={copy.soleProprietorship} inputHint={copy.entityHints[2]} />
                  <RadioButton id="baas-entity-trust" value="trust" label={copy.trust} inputHint={copy.entityHints[3]} />
                  <RadioButton id="baas-entity-partnership" value="partnership" label={copy.partnership} inputHint={copy.entityHints[4]} />
                </RadioButtonGroup>
              ) : currentStep === FORM_STEP_COUNT - 1 ? (
                <>
                  <BaasReviewSummary copy={copy} entityType={entityType} fieldValues={fieldValues} />
                  <Box className="baasOnboarding__providerAgreement" display="flex" alignItems="center">
                    <Checkbox
                      id="baas-review-agreement"
                      label={copy.reviewAgreement}
                      checked={hasAgreed}
                      onChange={(event) => setHasAgreed(event.target.checked)}
                    />
                  </Box>
                </>
              ) : (
                <BaasFormFields
                  fields={copy.formFields[currentStep]}
                  step={currentStep}
                  values={fieldValues}
                  onChange={updateFieldValue}
                />
              )}
              {currentStep !== 0 && currentStep !== FORM_STEP_COUNT - 1 && copy.formStepActions[currentStep] && (
                <Button variantType="tertiary">{copy.formStepActions[currentStep]}</Button>
              )}
            </Box>
            <Box className="baasOnboarding__actions" display="flex" justifyContent="space-between" alignItems="center">
              <Button variantType="secondary" destructive iconType="delete" iconPosition="before" onClick={handleClose}>
                {copy.discard}
              </Button>
              <Box display="flex" gap={2}>
                {currentStep > 0 && (
                  <Button variantType="secondary" onClick={() => setCurrentStep((step) => step - 1)}>
                    {copy.back}
                  </Button>
                )}
                <Button variantType="primary" disabled={currentStep === FORM_STEP_COUNT - 1 && !hasAgreed} onClick={handleContinue}>
                  {currentStep === FORM_STEP_COUNT - 1 ? copy.submit : copy.continue}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {view === "processing" && <BaasLoadingState title={processingTitle} body={copy.processingBody} />}

      {view === "approved" && (
        <Box className="baasOnboarding baasOnboarding--approved" display="flex" alignItems="center">
          <Box className="baasOnboarding__approvedIllustration" aria-hidden="true">
            <img src={successIllustration} alt="" />
          </Box>
          <Box className="baasOnboarding__reviewContent" display="flex" flexDirection="column" gap={3}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h2" as="h2">{approvedTitle}</Typography>
              <Typography variant="p" as="p">{approvedBody}</Typography>
            </Box>
            <Button variantType="primary" onClick={onManageBank ?? handleClose}>{copy.manageBank}</Button>
          </Box>
        </Box>
      )}
    </Dialog>
  );
}

function BaasLoadingState({ title, body }: { title: string; body: string }) {
  return (
    <Box
      className="baasOnboarding baasOnboarding--loading"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
      aria-live="polite"
    >
      <Box className="baasOnboarding__loader">
        <Loader
          loaderType="ring"
          size="medium"
          loaderLabel={title}
          showLabel={false}
        />
      </Box>
      <Typography variant="strong" as="p" className="baasOnboarding__loadingTitle">{title}</Typography>
      <Typography variant="p" as="p">{body}</Typography>
    </Box>
  );
}

function BaasProviderHeader({ title, providerPoweredBy }: { title: string; providerPoweredBy?: string }) {
  return (
    <Box className="baasOnboarding__providerHeader" display="flex" alignItems="center" gap={2}>
      <img className="baasOnboarding__providerLogo" src="/icon-sage-active.svg" alt="" aria-hidden="true" />
      <Box display="flex" flexDirection="column">
        <Typography variant="h2" as="h2">{title}</Typography>
        {providerPoweredBy && <Typography variant="small" as="p">{providerPoweredBy}</Typography>}
      </Box>
    </Box>
  );
}

function BaasProviderList({ title, items }: { title: string; items: string[] }) {
  return (
    <Box className="baasOnboarding__providerList" display="flex" flexDirection="column">
      <Typography variant="strong" as="h3">{title}</Typography>
      <Box as="ul">
        {items.map((item) => (
          <Box key={item} as="li">
            <Typography variant="small" as="span">{item}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function BaasFormFields({
  fields,
  step,
  values,
  onChange,
}: {
  fields: Array<{
    label: string;
    variant?: string;
    helper?: string;
    placeholder?: string;
  }>;
  step: number;
  values: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
}) {
  return (
    <Box className="baasOnboarding__fieldGrid">
      {fields.map((field, index) => {
        const fieldId = `baas-form-${step}-${index}`;

        if (field.variant === "heading") {
          return <Typography key={fieldId} variant="strong" as="h3" className="baasOnboarding__fieldHeading">{field.label}</Typography>;
        }

        if (field.variant === "checkbox") {
          return (
            <Box key={fieldId} className="baasOnboarding__fieldFullWidth">
              <Checkbox
                id={fieldId}
                label={field.label}
                checked={values[fieldId] === "true"}
                onChange={(event) => onChange(fieldId, String(event.target.checked))}
              />
            </Box>
          );
        }

        if (field.variant === "note") {
          return <Typography key={fieldId} variant="small" as="p" className="baasOnboarding__fieldNote">{field.label}</Typography>;
        }

        if (field.variant === "action") {
          return <Button key={fieldId} variantType="secondary">{field.label}</Button>;
        }

        if (field.variant === "date") {
          return (
            <Box key={fieldId} className="baasOnboarding__dateField" display="flex" flexDirection="column" gap={1}>
              <Typography variant="small" as="p">{field.label}</Typography>
              <Box display="flex" gap={2}>
                {[
                  { label: "Year", placeholder: "Year" },
                  { label: "Month", placeholder: "Month" },
                  { label: "Day", placeholder: "Day" },
                ].map((datePart) => {
                  const datePartId = `${fieldId}-${datePart.label.toLowerCase()}`;
                  return (
                    <Textbox
                      key={datePartId}
                      id={datePartId}
                      label={datePart.label}
                      placeholder={datePart.placeholder}
                      value={values[datePartId] ?? ""}
                      onChange={(event) => onChange(datePartId, event.target.value)}
                    />
                  );
                })}
              </Box>
            </Box>
          );
        }

        return (
          <Box key={fieldId} className="baasOnboarding__fieldCell">
            <Textbox
              id={fieldId}
              label={field.label}
              placeholder={field.placeholder}
              inputHint={field.helper}
              value={values[fieldId] ?? ""}
              onChange={(event) => onChange(fieldId, event.target.value)}
            />
          </Box>
        );
      })}
    </Box>
  );
}

const reviewFieldIds: Record<number, Record<number, string | readonly string[]>> = {
  1: {
    0: "baas-form-1-0",
    1: "baas-form-1-1",
    2: "baas-form-1-2",
    3: "baas-form-1-3",
    4: ["baas-form-1-4-year", "baas-form-1-4-month", "baas-form-1-4-day"],
    5: "baas-form-1-6",
    6: "baas-form-1-7",
    8: "baas-form-1-9",
    9: "baas-form-1-10",
    10: "baas-form-1-11",
    11: "baas-form-1-12",
    12: "baas-form-1-13",
    13: "baas-form-1-14",
  },
  2: {
    0: "baas-form-2-0",
    1: "baas-form-2-1",
    2: "baas-form-2-2",
    3: "baas-form-2-3",
    4: "baas-form-2-4",
  },
  3: {
    0: "baas-form-3-0",
    1: "baas-form-3-1",
    2: "baas-form-3-2",
    3: "baas-form-3-3",
  },
  4: {
    0: "baas-form-4-0",
    1: "baas-form-4-1",
    2: "baas-form-4-2",
  },
  5: {
    0: "baas-form-5-1",
    1: "baas-form-5-2",
  },
};

function getReviewAnswer(
  sectionIndex: number,
  rowIndex: number,
  fieldValues: Record<string, string>,
): string | undefined {
  const fieldId = reviewFieldIds[sectionIndex]?.[rowIndex];
  if (!fieldId) return undefined;

  if (typeof fieldId !== "string") {
    const [year, month, day] = fieldId.map((id) => fieldValues[id] ?? "");
    if (!year || !month || !day) return undefined;
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
    if (Number.isNaN(date.getTime())) return undefined;
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  }

  return fieldValues[fieldId] || "—";
}

function BaasReviewSummary({
  copy,
  entityType,
  fieldValues,
}: {
  copy: BaasOnboardingCopy;
  entityType: string;
  fieldValues: Record<string, string>;
}) {
  const entityTypeLabel = entityType === "organization"
    ? copy.organization
    : entityType === "individual"
      ? copy.individual
      : entityType === "sole"
        ? copy.soleProprietorship
        : entityType === "trust"
          ? copy.trust
          : copy.partnership;

  return (
    <Box className="baasOnboarding__reviewSections" display="flex" flexDirection="column" gap={3}>
      {copy.reviewSections.map((section, sectionIndex) => (
        <Box key={section.title} className="baasOnboarding__reviewCard" display="flex" flexDirection="column">
          <Box className="baasOnboarding__reviewCardHeader" display="flex" justifyContent="space-between" alignItems="center" gap={2}>
            <Typography variant="strong" as="h3">{section.title}</Typography>
            <Button variantType="secondary">{copy.edit}</Button>
          </Box>
          {section.rows.map((row, index) => (
            row.variant === "subheading" ? (
              <Typography key={`${section.title}-${row.label}-${index}`} variant="strong" as="h4" className="baasOnboarding__reviewSubheading">
                {row.label}
              </Typography>
            ) : (
              <Box key={`${section.title}-${row.label}-${index}`} className="baasOnboarding__reviewRow" display="flex" justifyContent="space-between" gap={2}>
                <Typography variant="small" as="span">{row.label}</Typography>
                <Typography variant="small" as="span">
                  {row.label === copy.summary.entityType
                    ? entityTypeLabel
                    : getReviewAnswer(sectionIndex, index, fieldValues)
                      ?? (baasOnboardingDemoAnswers.reviewSections as readonly (readonly (string | null)[])[])[sectionIndex]?.[index]
                      ?? row.value}
                </Typography>
              </Box>
            )
          ))}
        </Box>
      ))}
      <Typography variant="small" as="p" className="baasOnboarding__reviewTerms">{copy.reviewTerms}</Typography>
    </Box>
  );
}

function BaasAccountOption({
  title,
  copy,
  benefits,
  onSelect,
}: {
  title: string;
  copy: BaasOnboardingCopy;
  benefits: string[];
  onSelect: () => void;
}) {
  return (
    <Box className="baasOnboarding__option" as="article" display="flex" flexDirection="column">
      <Box display="flex" alignItems="center" justifyContent="space-between" gap={3}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box className="baasOnboarding__providerIcon" aria-hidden="true">
            <Icon type="credit_card" />
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant="strong" as="p">{title}</Typography>
            <Typography variant="small" as="p">{copy.physicalDigital}</Typography>
          </Box>
        </Box>
        <Button variantType="primary" onClick={onSelect}>{copy.selectAccount}</Button>
      </Box>
      <Box className="baasOnboarding__benefitList" as="ul" display="flex" flexDirection="column">
        {benefits.map((benefit) => (
          <Box key={benefit} as="li" display="flex" alignItems="flex-start" gap={2}>
            <Icon type="tick_thick" aria-hidden />
            <Typography variant="small" as="span">{benefit}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
