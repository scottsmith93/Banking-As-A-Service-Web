import type { ReactNode } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Typography from "carbon-react/lib/components/typography";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import MoneyValue from "../../money-value/MoneyValue";
import BankAccountSelect from "./BankAccountSelect";

type Props = {
  accountId: string; accounts: { id: string; name: string }[]; bankBalance: number; ledgerBalance: number;
  amountToJustify: number; suggestedCount: number; onAccountChange: (id: string) => void; onReview: () => void; children: ReactNode;
};

export default function BankMovementHeader({ accountId, accounts, bankBalance, ledgerBalance, amountToJustify, suggestedCount, onAccountChange, onReview, children }: Props) {
  const { copy, locale } = useTransactionPresentation();
  const heading = copy.movements;
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
      <BankAccountSelect accountId={accountId} accounts={accounts} onChange={onAccountChange} />
      <dl className="bankMovementSummary__metrics">
        {[[heading.bankBalance, bankBalance], [heading.ledgerBalance, ledgerBalance], [heading.toJustifyAmount, amountToJustify]].map(([label, value]) => <div key={label}>
          <dt>{label}</dt><dd className="numericValue"><MoneyValue amount={Number(value)} locale={locale} /></dd>
        </div>)}
      </dl>
    </div>
    {children}
    </div>
  </>;
}
