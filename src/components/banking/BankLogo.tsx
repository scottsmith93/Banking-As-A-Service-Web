import { useState } from "react";
import Icon from "carbon-react/lib/components/icon";
import "./bank-logo.css";

/** Read-only bank identity pattern. Names are supplied by the surrounding text;
 * Carbon's bank icon remains the fallback for All accounts or unavailable assets. */
export default function BankLogo({ src, size = "medium", className = "" }: { src?: string; size?: "small" | "medium"; className?: string }) {
  const [failed, setFailed] = useState<string | null>(null);
  const sage = src === "/banking/sage-demo-bank-icon.svg";
  // The same Sage artwork, with empty SVG margins removed rather than CSS zoom/cropping.
  const image = sage ? "/banking/sage-wallet-mark.svg" : src;
  return <span className={`bankLogo bankLogo--${size}${sage ? " bankLogo--sage" : ""} ${className}`} aria-hidden="true">
    <span className="bankLogo__mask">
      {image && failed !== image ? <img src={image} alt="" referrerPolicy="no-referrer" onError={() => setFailed(image)} /> : <Icon type="bank" />}
    </span>
  </span>;
}
