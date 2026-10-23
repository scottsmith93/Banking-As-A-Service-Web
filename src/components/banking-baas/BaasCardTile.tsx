import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Pill from "carbon-react/lib/components/pill";
import Typography from "carbon-react/lib/components/typography";
import BaasCardNetworkLogo from "./BaasCardNetworkLogo";
import type { DebitCard } from "../../data/bankingBaas";

type BaasCardTileProps = {
  card: DebitCard;
  copy: {
    deactivated: string;
    monthlySpend: string;
    validThrough: string;
    manage: string;
    active: string;
    ordered: string;
    cardholder: string;
    virtual: string;
    physical: string;
    expiry: string;
  };
  locale: string;
  onOpenDetails: (card: DebitCard) => void;
};

// A debit card drawn as the real thing (ID-1 proportions, Sage Wallet styles),
// sitting in a tile with its monthly spend and actions underneath.
export default function BaasCardTile({ card, copy, locale, onOpenDetails }: BaasCardTileProps) {
  const formattedSpend = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
  }).format(card.monthlySpendEur);

  return (
    <Box className={`baasCardTile baasCardTile--${card.colour}${card.status === "deactivated" ? " baasCardTile--deactivated" : ""}`} as="article">
      <Box className={`baasCardTile__visual baasCardTile__visual--${card.colour}`}>
        <span className="baasCardTile__shine" aria-hidden="true" />
        <Box className="baasCardTile__topline" display="flex" justifyContent="space-between" alignItems="center">
          <img className="baasCardTile__sageLogo" src="/sage-logo.svg" alt="Sage" />
          <Box className="baasCardTile__statusPill">
            <Pill pillRole="status" colorVariant={card.status === "issued" ? "positive" : "neutral"} size="S" fill>
              {card.status === "issued" ? copy.active : card.status === "ordered" ? copy.ordered : copy.deactivated}
            </Pill>
          </Box>
        </Box>
        <Box className="baasCardTile__nicknameRow" display="flex" justifyContent="space-between" alignItems="center" gap={2}>
          <Typography variant="small" as="span" className="baasCardTile__secondaryText baasCardTile__nickname">{card.nickname}</Typography>
          <Box className="baasCardTile__cardType" display="flex" alignItems="center" gap={1}>
            <Typography variant="small" as="span" className="baasCardTile__secondaryText">
              {card.type === "virtual" ? copy.virtual : copy.physical}
            </Typography>
            <ContactlessMark />
          </Box>
        </Box>
        <Typography variant="strong" as="p" className="baasCardTile__number">•••• •••• •••• {card.lastFour}</Typography>
        <Box className="baasCardTile__holderRow" display="flex" justifyContent="space-between" alignItems="flex-end" gap={2}>
          <Box display="flex" gap={3} minWidth={0}>
            <Box display="flex" flexDirection="column" minWidth={0}>
              <Typography variant="small" as="span" className="baasCardTile__secondaryText">{copy.cardholder}</Typography>
              <Typography variant="strong" as="span" className="baasCardTile__holder">{card.cardholder}</Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography variant="small" as="span" className="baasCardTile__secondaryText">{copy.expiry}</Typography>
              <Typography variant="strong" as="span" className="baasCardTile__primaryText">{card.validThrough}</Typography>
            </Box>
          </Box>
          <BaasCardNetworkLogo network={card.network} />
        </Box>
      </Box>
      <Box className="baasCardTile__footer" display="flex" justifyContent="space-between" alignItems="center" gap={2}>
        <Box display="flex" flexDirection="column">
          <Typography variant="small" as="span">{copy.monthlySpend}</Typography>
          <Typography variant="strong" as="span" className="numericValue">{formattedSpend}</Typography>
        </Box>
        <Box className="baasCardTile__actions" display="flex" gap={1}>
          <Button variantType="secondary" size="small" onClick={() => onOpenDetails(card)}>{copy.manage}</Button>
        </Box>
      </Box>
    </Box>
  );
}

export function ContactlessMark() {
  return (
    <svg className="baasCardTile__contactless" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M8 8a5.65 5.65 0 0 1 0 8M11 5a9.9 9.9 0 0 1 0 14M14 2a14.1 14.1 0 0 1 0 20" />
      <circle cx="5" cy="12" r="1.25" />
    </svg>
  );
}
