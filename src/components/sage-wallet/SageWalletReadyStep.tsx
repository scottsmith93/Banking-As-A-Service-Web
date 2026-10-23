import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import { sageWalletOpenedAccount } from "../../data/sageWalletOnboarding";
import type { SageWalletCopy } from "./sageWalletTypes";

type SageWalletReadyStepProps = {
  copy: SageWalletCopy["ready"];
  accountName: string;
  openingBalance: string;
};

const NEXT_ICONS = ["bank", "sync", "credit_card"] as const;

// Step 2: the account exists. Show it, explain the payoff, and lead into the card.
export default function SageWalletReadyStep({ copy, accountName, openingBalance }: SageWalletReadyStepProps) {
  const [copied, setCopied] = useState(false);
  const copyIban = async () => {
    try {
      await navigator.clipboard.writeText(sageWalletOpenedAccount.iban);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Box className="sageWalletStep" display="flex" flexDirection="column">
      <div className="sageWalletAccountSummary">
        <Box display="flex" flexDirection="column" gap={1} minWidth={0}>
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <Typography variant="h3" as="p">{accountName}</Typography>
            <span className="sageWalletAccountSummary__realtime"><Icon type="flash" aria-hidden />{copy.realTime}</span>
          </Box>
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            <Typography variant="small" as="span" className="sageWalletStep__muted">{copy.iban} {sageWalletOpenedAccount.maskedIban}</Typography>
            <Button variantType="tertiary" size="small" iconType="copy" iconPosition="before" onClick={() => void copyIban()}>{copy.copyIban}</Button>
          </Box>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
          <Typography variant="small" as="span" className="sageWalletStep__muted">{copy.balance}</Typography>
          <Typography variant="h2" as="p" className="numericValue">{openingBalance}</Typography>
        </Box>
      </div>
      <span role="status" className="sageWalletStep__srOnly">{copied ? copy.ibanCopied : ""}</span>

      <Typography variant="h3" as="h3">{copy.nextHeading}</Typography>
      <ul className="sageWalletStep__next">
        {copy.next.map((item, index) => (
          <li key={item} className={index === copy.next.length - 1 ? "sageWalletStep__next--highlight" : undefined}>
            <span className="sageWalletStep__nextIcon"><Icon type={NEXT_ICONS[index] ?? "tick"} aria-hidden /></span>
            <Typography variant="p" as="span">{item}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
}
