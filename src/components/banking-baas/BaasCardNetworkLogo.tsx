import { useState } from "react";
import type { DebitCard } from "../../data/bankingBaas";

type BaasCardNetworkLogoProps = {
  network: DebitCard["network"];
};

export default function BaasCardNetworkLogo({ network }: BaasCardNetworkLogoProps) {
  const [loaded, setLoaded] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const name = network === "visa" ? "Visa" : "Mastercard";

  return (
    <span className="baasCardTile__network" role="img" aria-label={name}>
      {!loaded && (
        <span className={`baasCardTile__networkFallback baasCardTile__networkFallback--${network}`} aria-hidden="true">
          {network === "visa" ? "VISA" : <span className="baasCardTile__mastercardMark"><i /><i /></span>}
        </span>
      )}
      {!unavailable && (
        <img
          className={`baasCardTile__networkImage${loaded ? " baasCardTile__networkImage--loaded" : ""}`}
          src={network === "visa"
            ? "https://cdn.simpleicons.org/visa/FFFFFF"
            : "https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"}
          alt=""
          aria-hidden="true"
          onLoad={() => setLoaded(true)}
          onError={() => setUnavailable(true)}
        />
      )}
    </span>
  );
}
