import Box from "carbon-react/lib/components/box";
import Pill from "../../status-pill/StatusPill";
import Typography from "carbon-react/lib/components/typography";
import BaasCardNetworkLogo from "../BaasCardNetworkLogo";
import { useBankingBaas } from "../../../context/useBankingBaas";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { interpolate } from "../../../utils/interpolate";
import type { BankTransaction } from "../../../data/bankingTransactions";
import MoneyValue from "../../money-value/MoneyValue";

export default function BaasTransactionSummary({ transaction }: { transaction: BankTransaction }) {
  const { copy, date, locale } = useTransactionPresentation();
  const { cards } = useBankingBaas();
  const card = cards.find(item => item.lastFour === transaction.lastFour && item.network === transaction.network);
  return <div className="baasTransactionDrawer__summary">
    <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
      <Typography variant="h1" as="p"><MoneyValue amount={transaction.amount} currency={transaction.currency} locale={locale} signed /></Typography>
      <Typography variant="small" as="p">{date(transaction.date)}</Typography>
      <Pill pillRole="status" size="S" colorVariant={transaction.paymentStatus === "completed" ? "positive" : transaction.paymentStatus === "failed" ? "negative" : "neutral"}>{copy.paymentStatuses[transaction.paymentStatus]}</Pill>
    </Box>
    {transaction.network && <div className={`baasTransactionMiniCard baasCardTile__visual baasCardTile__visual--${card?.colour ?? "sage"}`} role="img" aria-label={interpolate(copy.cardEnding, { lastFour: transaction.lastFour ?? "" })}>
      <BaasCardNetworkLogo network={transaction.network} />
    </div>}
  </div>;
}
