import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import promotionCardArt from "../../assets/banking-baas/promotion-card-art.png";

type BaasPromotionBannerProps = {
  copy: {
    title: string;
    body: string;
    benefits: string[];
    cta: string;
  };
  onOpen: () => void;
};

export default function BaasPromotionBanner({ copy, onOpen }: BaasPromotionBannerProps) {
  return (
    <Box className="baasPromotion" as="section" aria-labelledby="baas-promotion-title">
      <Box className="baasPromotion__content" display="flex" flexDirection="column">
        <Box className="baasPromotion__heading" display="flex" alignItems="center" gap={2}>
          <img src="/copilot-logo.svg" alt="" aria-hidden="true" className="baasPromotion__copilotMark" />
          <Typography id="baas-promotion-title" variant="h2" as="h2" className="baasPromotion__title">
            {copy.title}
          </Typography>
        </Box>
        <Typography variant="p" as="p" className="baasPromotion__body">
          {copy.body}
        </Typography>
        <Box className="baasPromotion__benefits" as="ul" display="flex" flexWrap="wrap">
          {copy.benefits.map((benefit) => (
            <Box key={benefit} as="li" display="flex" alignItems="center">
              <Icon type="tick_thick" color="--colorsUtilityYang100" aria-hidden />
              <Typography variant="small" as="span" className="baasPromotion__benefit">
                {benefit}
              </Typography>
            </Box>
          ))}
        </Box>
        <Button
          className="baasPromotion__cta"
          variantType="primary"
          inverse
          iconType="credit_card"
          iconPosition="before"
          onClick={onOpen}
        >
          {copy.cta}
        </Button>
      </Box>
      <Box className="baasPromotion__art" aria-hidden="true">
        <img src={promotionCardArt} alt="" />
      </Box>
    </Box>
  );
}
