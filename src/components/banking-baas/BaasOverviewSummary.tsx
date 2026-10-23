import type { ComponentProps } from "react";
import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import { useBankingTransactions } from "../../context/useBankingTransactions";
import { useLanguage } from "../../context/useLanguage";
import { getLocale, getLocaleCode } from "../../locales";
import { bankSnapshotDate } from "../../data/bankingTransactions";
import type { BaaSAccount } from "../../data/bankingBaas";
import { bankCashFlow } from "../../utils/bankCashFlow";
import { interpolate } from "../../utils/interpolate";
import MoneyValue from "../money-value/MoneyValue";
import BaasCashFlowChart from "./BaasCashFlowChart";

export default function BaasOverviewSummary({ account }: { account: BaaSAccount }) {
  const { transactions } = useBankingTransactions();
  const { language } = useLanguage();
  const copy = getLocale(language).bankingBaas.dashboard;
  const locale = getLocaleCode(language);
  const cashFlow = bankCashFlow(transactions, account.id, bankSnapshotDate, account.balanceEur);
  const count = (value: number) => new Intl.NumberFormat(locale).format(value);
  return <div className="baasOverviewSummary">
    <Box className="baasOverviewBalance" display="flex" flexDirection="column" gap={1}>
      <Typography className="baasOverviewHero__label" variant="p" as="p">{copy.availableBalance}</Typography>
      {/* The available balance is an independent API snapshot, not the sum of this month's sample. */}
      <Typography className="baasOverviewHero__amount numericValue" variant="h1" as="p"><MoneyValue amount={account.balanceEur} locale={locale} /></Typography>
    </Box>
    <BaasKpi icon="arrow_bottom_right_circle" iconColor="--colorsSemanticPositive500" title={copy.moneyIn} detail={interpolate(copy.transactions, { count: count(cashFlow.incomingCount) })} amount={cashFlow.moneyIn} locale={locale} direction="in" />
    <BaasKpi icon="arrow_top_right_circle" iconColor="--colorsSemanticNegative500" title={copy.moneyOut} detail={interpolate(copy.transactions, { count: count(cashFlow.outgoingCount) })} amount={cashFlow.moneyOut} locale={locale} direction="out" />
    <BaasKpi icon="refresh_clock" iconColor="--colorsSemanticCaution500" title={copy.pendingTransactions} detail={interpolate(copy.waitingToClear, { count: count(cashFlow.pendingCount) })} amount={cashFlow.pending} locale={locale} />
    <BaasCashFlowChart periods={cashFlow.periods} />
  </div>;
}

function BaasKpi({ icon, iconColor, title, detail, amount, locale, direction }: { icon: ComponentProps<typeof Icon>["type"]; iconColor: ComponentProps<typeof Icon>["color"]; title: string; detail: string; amount: number; locale: string; direction?: "in" | "out" }) {
  return <Box className="baasKpi" display="flex" flexDirection="column" gap={1}>
    <Box display="flex" alignItems="center" gap={1}>
      <Icon type={icon} color={iconColor} aria-hidden />
      <Typography variant="strong" as="p">{title}</Typography>
    </Box>
    <Box className="baasKpi__value" display="flex" flexDirection="column">
      <Typography variant="strong" as="p"><MoneyValue amount={amount} locale={locale} direction={direction} /></Typography>
      <Typography variant="small" as="p">{detail}</Typography>
    </Box>
  </Box>;
}
