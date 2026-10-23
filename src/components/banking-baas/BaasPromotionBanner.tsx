import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import IconButton from "carbon-react/lib/components/icon-button";
import Typography from "carbon-react/lib/components/typography";
import BaasPromotionCards from "./BaasPromotionCards";

type BaasPromotionFeature = {
  title: string;
  body: string;
};

type BaasPromotionBannerProps = {
  copy: {
    eyebrow: string;
    title: string;
    body: string;
    getPaid: BaasPromotionFeature;
    cards: BaasPromotionFeature;
    cta: string;
    note: string;
    dismiss: string;
    cardArt: { virtual: string; business: string };
  };
  onOpen: () => void;
  onDismiss: () => void;
};

export default function BaasPromotionBanner({ copy, onOpen, onDismiss }: BaasPromotionBannerProps) {
  // Plays the exit animation (a cross-fade under reduced motion) first, then lets the page remove the banner.
  const [isClosing, setIsClosing] = useState(false);
  const features = [
    { key: "getPaid", icon: "money_bag" as const, ...copy.getPaid },
    { key: "cards", icon: "credit_card" as const, ...copy.cards },
  ];
  return (
    <section
      className={`baasPromotion${isClosing ? " baasPromotion--closing" : ""}`}
      aria-labelledby="baas-promotion-title"
      onAnimationEnd={(event) => {
        if (isClosing && event.target === event.currentTarget) onDismiss();
      }}
    >
      <span className="baasPromotion__close">
        <IconButton aria-label={copy.dismiss} onClick={() => setIsClosing(true)}>
          <Icon type="close" />
        </IconButton>
      </span>
      <Box className="baasPromotion__content" display="flex" flexDirection="column">
        <Box className="baasPromotion__eyebrow" display="flex" alignItems="center">
          <img src="/banking/sage-demo-bank-icon.svg" alt="" aria-hidden="true" />
          <Typography variant="small" as="span">{copy.eyebrow}</Typography>
        </Box>
        <Typography id="baas-promotion-title" variant="h2" as="h2" className="baasPromotion__title">
          {copy.title}
        </Typography>
        <Typography variant="p" as="p" className="baasPromotion__body">
          {copy.body}
        </Typography>
        <Box className="baasPromotion__features" as="ul">
          {features.map((feature) => (
            <Box key={feature.key} as="li" className="baasPromotion__feature" display="flex">
              <span className="baasPromotion__featureIcon" aria-hidden="true">
                <Icon type={feature.icon} />
              </span>
              <Box display="flex" flexDirection="column">
                <Typography variant="h3" as="h3" className="baasPromotion__featureTitle">{feature.title}</Typography>
                <Typography variant="small" as="p" className="baasPromotion__featureBody">{feature.body}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box className="baasPromotion__actions" display="flex" alignItems="center" flexWrap="wrap">
          <Button variantType="primary" iconType="arrow_right" iconPosition="after" onClick={onOpen}>
            {copy.cta}
          </Button>
          <Typography variant="small" as="span" className="baasPromotion__note">{copy.note}</Typography>
        </Box>
      </Box>
      <Box className="baasPromotion__art">
        <BaasPromotionCards copy={copy.cardArt} />
      </Box>
    </section>
  );
}
