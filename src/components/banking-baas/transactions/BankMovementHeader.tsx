import { useState, type ReactNode } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import { Option, Select } from "carbon-react/lib/components/select";
import Typography from "carbon-react/lib/components/typography";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";

type Props = {
  accountId: string; accounts: { id: string; name: string }[]; bankBalance: number; ledgerBalance: number;
  amountToJustify: number; suggestedCount: number; onAccountChange: (id: string) => void; onReview: () => void; children: ReactNode;
};

export default function BankMovementHeader({ accountId, accounts, bankBalance, ledgerBalance, amountToJustify, suggestedCount, onAccountChange, onReview, children }: Props) {
  const { copy, money } = useTransactionPresentation();
  const heading = copy.movements;
  const [draftAccount, setDraftAccount] = useState<{ source: string; value: string } | null>(null);
  return <>
    <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography variant="h1" as="h1">{heading.title}</Typography>
        <Typography variant="p" as="p">{heading.subtitle}</Typography>
      </Box>
      <Button variantType="secondary" size="small" disabled={!suggestedCount} onClick={onReview}>{copy.suggestedAction.replace("{count}", String(suggestedCount))}</Button>
    </Box>
    <div className="bankMovementControlBar">
    <div className="bankMovementSummary">
      <Select id="bank-movements-account" label={heading.account} size="small"
        value={draftAccount?.source === accountId ? draftAccount.value : accountId || "all-accounts"}
        onBlur={() => setDraftAccount(null)}
        onChange={event => {
          // Carbon emits provisional arrow-key choices. Commit history/filter changes only on click or Enter.
          if (!("selectionConfirmed" in event) || event.selectionConfirmed) {
            setDraftAccount(null); onAccountChange(event.target.value === "all-accounts" ? "" : event.target.value);
          } else setDraftAccount({ source: accountId, value: event.target.value });
        }}>
        <Option value="all-accounts" text={heading.allAccounts} />
        {accounts.map(account => <Option key={account.id} value={account.id} text={account.name} />)}
      </Select>
      <dl className="bankMovementSummary__metrics">
        {[[heading.bankBalance, bankBalance], [heading.ledgerBalance, ledgerBalance], [heading.toJustifyAmount, amountToJustify]].map(([label, value]) => <div key={label}>
          <dt>{label}</dt><dd className="numericValue">{money(Number(value))}</dd>
        </div>)}
      </dl>
    </div>
    {children}
    </div>
  </>;
}
