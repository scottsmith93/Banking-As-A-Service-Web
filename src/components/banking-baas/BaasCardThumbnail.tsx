import { useId } from "react";
import type { DebitCard } from "../../data/bankingBaas";

// Native SVG at the same ID-1 ratio as the actual card. Paint values mirror
// the existing Mint/Midnight/Plum tokens; brand artwork stays in local assets.
export default function BaasCardThumbnail({ card }: { card: DebitCard }) {
  const id = useId();
  return <svg className={`baasCardThumbnail baasCardThumbnail--${card.colour}`} viewBox="0 0 85.6 54" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={id + "-base"} x1="0" y1="0" x2="1" y2="1"><stop className="baasCardThumbnail__start" /><stop offset="1" className="baasCardThumbnail__end" /></linearGradient>
      <radialGradient id={id + "-glow"} cx="0.9" cy="0.1" r="0.65"><stop className="baasCardThumbnail__glow" /><stop offset="1" className="baasCardThumbnail__clear" /></radialGradient>
    </defs>
    <rect width="85.6" height="54" rx="8" fill={`url(#${id}-base)`} />
    <rect width="85.6" height="54" rx="8" fill={`url(#${id}-glow)`} />
    <image href="/sage-logo.svg" x="7" y="6" width="25" height="13" />
    <rect className="baasCardThumbnail__chip" x="8" y="27" width="11" height="8" rx="2" />
    <image href="/assets/banking-baas/mastercard.svg" x="61" y="35" width="17" height="11" />
  </svg>;
}
