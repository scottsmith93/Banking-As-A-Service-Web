import type { DebitCard } from "../../data/bankingBaas";

type BaasCardNetworkLogoProps = {
  network: DebitCard["network"];
  tone?: "inverse" | "light";
};

// Sage Wallet cards run on Mastercard only; the mark is the original brand asset.
export default function BaasCardNetworkLogo({ tone = "inverse" }: BaasCardNetworkLogoProps) {
  return (
    <span
      className={`baasCardTile__network${tone === "light" ? " baasCardTile__network--light" : ""}`}
      role="img"
      aria-label="Mastercard"
    >
      <img className="baasCardTile__networkArtwork" src="/assets/banking-baas/mastercard.svg" alt="" aria-hidden="true" />
    </span>
  );
}
