import type { DebitCard } from "../../data/bankingBaas";

type BaasCardNetworkLogoProps = {
  network: DebitCard["network"];
  tone?: "inverse" | "light";
};

export default function BaasCardNetworkLogo({ network, tone = "inverse" }: BaasCardNetworkLogoProps) {
  const name = network === "visa" ? "Visa" : "Mastercard";

  return (
    <span
      className={`baasCardTile__network${tone === "light" ? " baasCardTile__network--light" : ""}`}
      role="img"
      aria-label={name}
    >
      <img
        className="baasCardTile__networkArtwork"
        src={`/assets/banking-baas/${network}.${network === "visa" ? "png" : "svg"}`}
        alt=""
        aria-hidden="true"
      />
    </span>
  );
}
