import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import { interpolate } from "../../utils/interpolate";
import BaasCardNetworkLogo from "./BaasCardNetworkLogo";
import { ContactlessMark } from "./BaasCardTile";

type BaasIssueCardPreviewProps = {
  cardholder: string;
  network: "visa" | "mastercard";
  copy: {
    cardholder: string;
    cardType: string;
    previewDescription: string;
    network: { visa: string; mastercard: string };
  };
};

export default function BaasIssueCardPreview({ cardholder, network, copy }: BaasIssueCardPreviewProps) {
  const networkName = copy.network[network];
  const cardholderName = cardholder || "—";
  const maskedCardNumber = "•••• •••• •••• ••••";

  return (
    <Box
      className="baasIssueCardPreview baasCardTile__visual baasCardTile__visual--sage"
      role="img"
      aria-label={interpolate(copy.previewDescription, { network: networkName, name: cardholderName })}
    >
      <Box className="baasIssueCardPreview__topline" display="flex" justifyContent="space-between" alignItems="center">
        <img className="baasCardTile__sageLogo" src="/sage-logo.svg" alt="" aria-hidden="true" />
      </Box>

      <Box className="baasIssueCardPreview__details">
        <Box className="baasIssueCardPreview__cardholder" display="flex" flexDirection="column">
          <Typography variant="strong" as="p" className="baasCardTile__number">{maskedCardNumber}</Typography>
          <Box display="flex" flexDirection="column">
            <Typography variant="small" as="span" className="baasCardTile__secondaryText">{copy.cardholder}</Typography>
            <Typography variant="strong" as="span" className="baasCardTile__holder">{cardholderName}</Typography>
          </Box>
        </Box>
        <Box className="baasIssueCardPreview__cardType" display="flex" alignItems="center" gap={1}>
          <Typography variant="small" as="span" className="baasCardTile__secondaryText">{copy.cardType}</Typography>
          <ContactlessMark />
        </Box>
      </Box>

      <span className="baasIssueCardPreview__network" aria-hidden="true">
        <BaasCardNetworkLogo network={network} tone="light" />
      </span>
    </Box>
  );
}
