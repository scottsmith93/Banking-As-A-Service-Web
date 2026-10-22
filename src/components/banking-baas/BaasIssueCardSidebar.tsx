import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Loader from "carbon-react/lib/components/loader/__next__";
import Link from "carbon-react/lib/components/link";
import Sidebar from "carbon-react/lib/components/sidebar";
import Typography from "carbon-react/lib/components/typography";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";
import { useBaasCardIssueForm } from "../../hooks/useBaasCardIssueForm";
import BaasIssueCardPreview from "./BaasIssueCardPreview";
import BaasCardIssueSuccess from "./BaasCardIssueSuccess";
import BaasCardTypeChoice, { BaasCardIssueSteps } from "./BaasCardTypeChoice";
import BaasCardIssueDetails from "./BaasCardIssueDetails";
import BaasCardIssueRestrictions from "./BaasCardIssueRestrictions";
import BaasCardIssueFormFrame from "./BaasCardIssueFormFrame";
import type { BaasCardIssueFormData } from "./baasCardIssueTypes";

export type { BaasCardIssueFormData } from "./baasCardIssueTypes";

type BaasIssueCardSidebarProps = {
  open: boolean;
  cardholders: string[];
  onCancel: () => void;
  onIssue: (formData: BaasCardIssueFormData) => void;
  onManage: () => void;
};

export default function BaasIssueCardSidebar({ open, cardholders, onCancel, onIssue, onManage }: BaasIssueCardSidebarProps) {
  const { language } = useLanguage();
  const { cards: copy, cardIssueForm: formCopy } = getLocale(language).bankingBaas;
  const form = useBaasCardIssueForm(onIssue);
  const isProcessing = form.stage === "processing";
  const handleCancel = () => { form.reset(); onCancel(); };
  const successCopy = { ...formCopy.success, ...(form.cardType === "physical" ? formCopy.physicalSuccess : {}) };

  return (
    <Sidebar className="baasIssueSidebar" open={open} onCancel={handleCancel} position="right" width="600px"
      header={(
        <Box className="baasIssueSidebar__header" display="flex" flexDirection="column">
          <Typography variant="h1" as="h1">{formCopy.title}</Typography>
          <Typography variant="p" as="p">{formCopy.description}</Typography>
        </Box>
      )} headerPadding={{ py: 2, px: 5 }} p={0} aria-label={formCopy.title}>
      {form.stage === "success" ? (
        <BaasCardIssueSuccess copy={successCopy} onCreateAnother={form.reset} onManage={() => { handleCancel(); onManage(); }} />
      ) : !form.cardType ? (
        <BaasCardTypeChoice onSelect={form.selectType} />
      ) : (
        <BaasCardIssueFormFrame cardType={form.cardType} isProcessing={isProcessing} onSubmit={form.submit} errors={form.errors} validationAttempt={form.validationAttempt}>
          {/* Carbon selects use separate display text; validation reads the selected value. */}
          <Box className="baasIssueForm__stepHeader" display="flex" flexDirection="column" gap={2}>
            <BaasCardIssueSteps step={2} />
            <Link className="baasIssueForm__backLink" href="#card-type" icon="chevron_left" aria-disabled={isProcessing}
              onClick={event => { event.preventDefault(); if (!isProcessing) form.backToType(); }}>
              {getLocale(language).bankingBaas.onboarding.back}
            </Link>
            <h2 tabIndex={-1}><Typography variant="h2" as="span">{formCopy.detailsTitles[form.cardType]}</Typography></h2>
          </Box>
          <Box className="baasIssueForm__previewStage" display="flex" alignItems="center" justifyContent="center">
            <BaasIssueCardPreview cardholder={form.cardholder} network={form.network} copy={{
              cardholder: copy.cardholder, cardType: copy[form.cardType], previewDescription: formCopy.previewDescription,
              network: { visa: copy.visa, mastercard: copy.mastercard },
            }} />
          </Box>
          <Box className="baasIssueForm__fields" display="flex" flexDirection="column">
            <fieldset className="baasIssueForm__inputs" disabled={isProcessing}>
              <BaasCardIssueDetails form={form} cardholders={cardholders} />
              <BaasCardIssueRestrictions form={form} />
            </fieldset>
            <Box className="baasIssueForm__closing" display="flex" flexDirection="column" gap={3}>
              <Typography variant="small" as="p" className="baasIssueForm__disclaimer">
                {formCopy.issuerDisclaimer}{" "}<a href="https://www.adyen.com/privacy-policy" target="_blank" rel="noreferrer">{formCopy.privacyStatement}</a>
              </Typography>
              <Box className="baasIssueForm__actions" display="flex" flexDirection="column" gap={2}>
                <Typography as="span" screenReaderOnly role="status">{isProcessing ? formCopy.processing : ""}</Typography>
                <Button type="submit" variantType="primary" aria-disabled={isProcessing} aria-label={isProcessing ? formCopy.processing : formCopy.createCard}>
                  <span className="baasIssueForm__submitLabel">
                    {isProcessing && <Loader loaderType="ring" size="extra-small" inverse showLabel={false} />}
                    {isProcessing ? formCopy.processing : formCopy.createCard}
                  </span>
                </Button>
                <Button type="button" variantType="tertiary" onClick={handleCancel}>{copy.cancel}</Button>
              </Box>
            </Box>
          </Box>
        </BaasCardIssueFormFrame>
      )}
    </Sidebar>
  );
}
