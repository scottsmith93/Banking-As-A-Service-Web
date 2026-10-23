import { useRef, type PointerEvent } from "react";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import { interpolate } from "../../utils/interpolate";
import SageWalletCard from "./SageWalletCard";
import type { SageWalletCardDraft, SageWalletCopy, SageWalletView } from "./sageWalletTypes";

type SageWalletHeroProps = {
  view: SageWalletView;
  copy: SageWalletCopy["hero"];
  cardPitch: { body: string; perks: string[] };
  cardDraft: SageWalletCardDraft;
  cardLabels: { virtual: string; physical: string };
  createdLastFour: string | null;
  paymentAmount: string;
  invoiceNumber: string;
};

const POINT_ICONS = ["flash", "link", "shield_with_tick"] as const;
const PERK_ICONS = ["camera", "locked"] as const;
const PREVIEW_LAST_FOUR = "7302";

// Twelve pieces of confetti; their angles and colours live in the stylesheet.
function Confetti() {
  return <div className="sageWalletHero__confetti" aria-hidden="true">{Array.from({ length: 12 }, (_, index) => <span key={index} />)}</div>;
}

// The dark brand panel on the left of the modal. Each step swaps in its own
// animated scene; the moving aurora and stripes stay put so the panel feels
// like one continuous surface rather than a new page.
export default function SageWalletHero({ view, copy, cardPitch, cardDraft, cardLabels, createdLastFour, paymentAmount, invoiceNumber }: SageWalletHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const scene = view;

  // Direct manipulation: the card tilts toward the pointer, 1:1, and eases back on leave.
  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    hero.style.setProperty("--tilt-x", `${(-y * 14).toFixed(2)}deg`);
    hero.style.setProperty("--tilt-y", `${(x * 18).toFixed(2)}deg`);
  };
  const resetTilt = () => {
    heroRef.current?.style.setProperty("--tilt-x", "0deg");
    heroRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  const cardLabel = cardDraft.type === "virtual" ? cardLabels.virtual : cardLabels.physical;

  return (
    <div ref={heroRef} className={`sageWalletHero sageWalletHero--${scene}`} onPointerMove={tilt} onPointerLeave={resetTilt}>
      <div className="sageWalletHero__aurora" aria-hidden="true"><span /><span /><span /></div>
      <div className="sageWalletHero__stripes" aria-hidden="true" />
      <div className="sageWalletHero__brand">
        <img src="/sage-logo.svg" alt="" />
        <span>{copy.brand}</span>
      </div>

      <div key={scene} className="sageWalletHero__scene">
        {scene === "account" && <>
          <div className="sageWalletHero__stage">
            <SageWalletCard colour="sage" label={cardLabels.virtual} holder={cardDraft.cardholder} lastFour="8842" className="sageWalletHero__card" />
            <div className="sageWalletHero__toast sageWalletHero__toast--payment" aria-hidden="true">
              <span className="sageWalletHero__toastIcon"><Icon type="euro" /></span>
              {interpolate(copy.paymentToast, { amount: paymentAmount, invoice: invoiceNumber })}
            </div>
            <div className="sageWalletHero__toast sageWalletHero__toast--matched" aria-hidden="true">
              <span className="sageWalletHero__toastIcon"><Icon type="tick" /></span>
              {copy.matchedToast}
            </div>
          </div>
          <div className="sageWalletHero__copy">
            <Typography variant="h2" as="p" className="sageWalletHero__title">{copy.accountTitle}</Typography>
            <Typography variant="p" as="p" className="sageWalletHero__body">{copy.accountBody}</Typography>
            <ul className="sageWalletHero__points">
              {copy.accountPoints.map((point, index) => <li key={point}><Icon type={POINT_ICONS[index] ?? "tick"} aria-hidden />{point}</li>)}
            </ul>
          </div>
        </>}

        {scene === "opening" && <>
          <div className="sageWalletHero__orb" aria-hidden="true"><span /><span /><span /><img src="/banking/sage-demo-bank-icon.svg" alt="" /></div>
          <Typography variant="h2" as="p" className="sageWalletHero__title">{copy.openingTitle}</Typography>
        </>}

        {scene === "ready" && <>
          <div className="sageWalletHero__success" aria-hidden="true">
            <Confetti />
            <svg viewBox="0 0 64 64" className="sageWalletHero__tick">
              <circle cx="32" cy="32" r="29" />
              <path d="M19 33.5 28 42 45 23" />
            </svg>
          </div>
          <Typography variant="h2" as="p" className="sageWalletHero__title">{copy.readyTitle}</Typography>
          <Typography variant="p" as="p" className="sageWalletHero__body">{copy.readyBody}</Typography>
        </>}

        {(scene === "card" || scene === "done") && <>
          <div className="sageWalletHero__cardStage">
            {scene === "done" && <Confetti />}
            {/* Re-keyed on style and type so each change flips the card in. */}
            <SageWalletCard key={`${cardDraft.colour}-${cardDraft.type}`} colour={cardDraft.colour} label={cardLabel}
              holder={cardDraft.cardholder} lastFour={createdLastFour ?? PREVIEW_LAST_FOUR} className="sageWalletHero__card sageWalletHero__card--large" />
          </div>
          {scene === "card"
            ? <div className="sageWalletHero__copy">
              <Typography variant="p" as="p" className="sageWalletHero__body">{cardPitch.body}</Typography>
              <ul className="sageWalletHero__points">
                {cardPitch.perks.map((perk, index) => <li key={perk}><Icon type={PERK_ICONS[index] ?? "tick"} aria-hidden />{perk}</li>)}
              </ul>
            </div>
            : <Typography variant="h2" as="p" className="sageWalletHero__title sageWalletHero__title--live"><span className="sageWalletHero__liveDot" aria-hidden="true" />{copy.doneTitle}</Typography>}
        </>}
      </div>
    </div>
  );
}
