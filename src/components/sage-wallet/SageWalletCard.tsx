import type { DebitCard } from "../../data/bankingBaas";

type SageWalletCardProps = {
  colour: DebitCard["colour"];
  label: string;
  holder: string;
  lastFour: string;
  className?: string;
};

// Decorative Sage debit card drawn in code, in the real ID-1 card proportions.
// Hidden from assistive technology: the surrounding copy names the card.
export default function SageWalletCard({ colour, label, holder, lastFour, className = "" }: SageWalletCardProps) {
  return (
    <div className={`sageWalletCard sageWalletCard--${colour} ${className}`} aria-hidden="true">
      <span className="sageWalletCard__shine" />
      <div className="sageWalletCard__row">
        <img src="/sage-logo.svg" alt="" className="sageWalletCard__logo" />
        <span className="sageWalletCard__label">{label}</span>
      </div>
      <span className="sageWalletCard__chip" />
      <div className="sageWalletCard__row">
        <span className="sageWalletCard__holder">{holder}</span>
        <span className="sageWalletCard__number">•••• {lastFour}</span>
      </div>
    </div>
  );
}
