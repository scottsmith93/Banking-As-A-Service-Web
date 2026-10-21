import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";
import { interpolate } from "../../utils/interpolate";
import BaasCardNetworkLogo from "./BaasCardNetworkLogo";
import { ContactlessMark } from "./BaasCardTile";

type BaasIssueCardPreviewProps = {
  cardholder: string;
  nickname: string;
  network: "visa" | "mastercard";
  colour: "sage" | "night" | "plum";
  copy: {
    cardholder: string;
    virtual: string;
    nicknamePlaceholder: string;
    previewDescription: string;
    unnamedCardholder: string;
    network: { visa: string; mastercard: string };
  };
};

export default function BaasIssueCardPreview({ cardholder, nickname, network, colour, copy }: BaasIssueCardPreviewProps) {
  const networkName = copy.network[network];
  const cardholderName = cardholder || copy.unnamedCardholder;

  return (
    <Box
      className={`baasCardTile baasIssueCardPreview baasCardTile__visual--${colour}`}
      role="img"
      aria-label={interpolate(copy.previewDescription, { network: networkName, name: cardholderName })}
    >
      <Box className={`baasCardTile__visual baasCardTile__visual--${colour}`}>
        <Box className="baasCardTile__topline" display="flex" justifyContent="space-between" alignItems="center">
          <BaasCardNetworkLogo network={network} />
        </Box>
        <Box className="baasCardTile__nicknameRow" display="flex" justifyContent="space-between" alignItems="center" gap={2}>
          <Typography variant="small" as="span" className="baasCardTile__secondaryText">
            {nickname || copy.nicknamePlaceholder}
          </Typography>
          <Box className="baasCardTile__brand" display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
            <img className="baasCardTile__sageLogo" src="/sage-logo.svg" alt="" aria-hidden="true" />
            <Box className="baasCardTile__cardType" display="flex" alignItems="center" gap={1}>
              <Typography variant="small" as="span" className="baasCardTile__secondaryText">{copy.virtual}</Typography>
              <ContactlessMark />
            </Box>
          </Box>
        </Box>
        <span className="baasIssueCardPreview__chip" aria-hidden="true" />
        <Typography variant="strong" as="p" className="baasCardTile__number">•••• •••• •••• ••••</Typography>
        <Box className="baasCardTile__holderRow" display="flex" justifyContent="space-between" alignItems="flex-end" gap={2}>
          <Box display="flex" flexDirection="column">
            <Typography variant="small" as="span" className="baasCardTile__secondaryText">{copy.cardholder}</Typography>
            <Typography variant="strong" as="span" className="baasCardTile__holder">{cardholderName}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
