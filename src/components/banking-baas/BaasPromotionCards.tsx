type BaasPromotionCardsProps = {
  copy: {
    virtual: string;
    business: string;
  };
};

// Decorative, code-drawn Sage cards for the promotion banner. Two light cards
// stack and float; hovering the banner fans them apart. Hidden from assistive
// technology because the banner copy already describes the offer.
// PROTOTYPE: the card number and holder are illustrative, not account data.
export default function BaasPromotionCards({ copy }: BaasPromotionCardsProps) {
  return (
    <div className="baasPromoCards" aria-hidden="true">
      <div className="baasPromoCard baasPromoCard--back">
        <div className="baasPromoCard__top">
          <img src="/sage-logo.svg" alt="" className="baasPromoCard__logo" />
          <span className="baasPromoCard__label">{copy.virtual}</span>
        </div>
        <div className="baasPromoCard__bottom">
          <span className="baasPromoCard__number">•••• 7302</span>
        </div>
      </div>
      <div className="baasPromoCard baasPromoCard--front">
        <span className="baasPromoCard__shine" />
        <div className="baasPromoCard__top">
          <img src="/sage-logo.svg" alt="" className="baasPromoCard__logo" />
          <span className="baasPromoCard__label">{copy.business}</span>
        </div>
        <span className="baasPromoCard__chip" />
        <div className="baasPromoCard__bottom">
          <span className="baasPromoCard__holder">Oscar Hairless</span>
          <span className="baasPromoCard__number">•••• 4821</span>
        </div>
      </div>
    </div>
  );
}
