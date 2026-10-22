import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Card from "carbon-react/lib/components/card";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";
import type { CardType } from "./baasCardIssueTypes";
import { ContactlessMark } from "./BaasCardTile";

export function BaasCardIssueSteps({ step }: { step: 1 | 2 }) {
  const { language } = useLanguage();
  const copy = getLocale(language).bankingBaas.cardIssueForm.steps;
  return (
    <ol className="baasCardIssueSteps" aria-label={copy.label}>
      <li aria-current={step === 1 ? "step" : undefined}><span>1</span>{copy.type}</li>
      <li aria-current={step === 2 ? "step" : undefined}><span>2</span>{copy.details}</li>
    </ol>
  );
}

export default function BaasCardTypeChoice({ onSelect }: { onSelect: (type: CardType) => void }) {
  const { language } = useLanguage();
  const { cardIssueForm, cards } = getLocale(language).bankingBaas;
  const copy = cardIssueForm.typeChoice;
  return (
    <Box className="baasCardTypeChoice" display="flex" flexDirection="column" gap={3}>
      <BaasCardIssueSteps step={1} />
      <Typography variant="h2" as="h2" screenReaderOnly>{copy.title}</Typography>
      {(["physical", "virtual"] as const).map(type => (
        <Card key={type} roundness="large" spacing="small" boxShadow="boxShadow050">
          <div className={`baasCardTypeChoice__preview baasCardTypeChoice__preview--${type}`} aria-hidden="true">
            <div className="baasCardTypeChoice__branding">
              <span className="baasCardTypeChoice__type">{cards[type]}{type === "physical" && <ContactlessMark />}</span>
              <img src="/sage-logo.svg" alt="" width={40} height={23} />
            </div>
          </div>
          <Box className="baasCardTypeChoice__heading" display="flex" flexDirection="column">
            <Typography variant="h3" as="h3">{copy[type].title}</Typography>
            <Typography variant="p" as="p">{copy.networks}</Typography>
          </Box>
          <Button variantType="primary" fullWidth onClick={() => onSelect(type)}>{copy[type].choose}</Button>
          <hr className="baasIssueForm__divider" />
          <ul className="baasCardTypeChoice__benefits">
            {copy[type].benefits.map(benefit => <li key={benefit}><Icon type="tick_thick" aria-hidden /><span>{benefit}</span></li>)}
          </ul>
        </Card>
      ))}
    </Box>
  );
}
