import { useState } from "react";
import Portrait from "carbon-react/lib/components/portrait";
import { cardholderPortraits } from "../../data/cardholderPortraits";
import "./cardholder-avatar.css";

// Shared by recent/full transaction Source and monthly card spend. Surrounding
// names supply accessible context; Carbon's person icon is the offline fallback.
export default function BaasCardholderAvatar({ name, className = "" }: { name: string; className?: string }) {
  const portrait = cardholderPortraits[name];
  const [failed, setFailed] = useState<string | null>(null);
  return <span className={`baasCardholderAvatar ${className}`} aria-hidden="true" onErrorCapture={() => { if (portrait) setFailed(portrait); }}>
    <Portrait size="XS" src={portrait && portrait !== failed ? portrait : undefined} alt="" />
  </span>;
}
