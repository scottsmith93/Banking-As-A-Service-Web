import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Typography from "carbon-react/lib/components/typography";
import { FlatTable, FlatTableBody, FlatTableCell, FlatTableHead, FlatTableHeader, FlatTableRow } from "carbon-react/lib/components/flat-table";
import { useNavigate } from "react-router-dom";
import { useBankingBaas } from "../../context/useBankingBaas";
import { useLanguage } from "../../context/useLanguage";
import { getLocale, getLocaleCode } from "../../locales";
import { bankSnapshotDate } from "../../data/bankingTransactions";
import { cardSpendAccountId, cardSpendSnapshots } from "../../data/cardSpendSummaries";
import { cardSpendComparison, cardSpendPeriods } from "../../utils/cardSpendComparison";
import { interpolate } from "../../utils/interpolate";
import MoneyValue from "../money-value/MoneyValue";
import BaasCardholderAvatar from "./BaasCardholderAvatar";
import BaasCardThumbnail from "./BaasCardThumbnail";
import "./monthly-card-spend.css";

export default function BaasMonthlyCardSpend({ accountId }: { accountId: string }) {
  const { cards } = useBankingBaas();
  const { language } = useLanguage();
  const locale = getLocaleCode(language), copy = getLocale(language).bankingBaas.dashboard;
  const navigate = useNavigate();
  // PROTOTYPE: the shared card fixtures belong to the operating account only.
  const active = accountId === cardSpendAccountId ? cards.filter(card => card.status === "issued").sort((a, b) => b.monthlySpendEur - a.monthlySpendEur) : [];
  const rows = active.slice(0, 5);
  const current = active.reduce((sum, card) => sum + Math.round(card.monthlySpendEur * 100), 0) / 100;
  const previous = active.every(card => cardSpendSnapshots[card.id]) ? active.reduce((sum, card) => sum + Math.round(cardSpendSnapshots[card.id].previousPeriodSpendEur * 100), 0) / 100 : null;
  const transactions = active.reduce((sum, card) => sum + (cardSpendSnapshots[card.id]?.transactionCount ?? 0), 0);
  const periods = cardSpendPeriods(bankSnapshotDate);
  const dates = new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" });
  const number = (value: number) => new Intl.NumberFormat(locale).format(value);
  return <section className="baasMonthlyCardSpend" aria-labelledby="monthly-card-spend-title">
    <Box className="baasOverviewSectionHeading baasMonthlyCardSpend__heading" display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography variant="h2" as="h2" id="monthly-card-spend-title">{copy.monthlyCardSpend}</Typography>
        <Typography variant="small" as="p">{interpolate(copy.cardSpend.period, { currentPeriod: dates.formatRange(periods.from, periods.to), previousPeriod: dates.formatRange(periods.previousFrom, periods.previousTo) })}</Typography>
      </Box>
      <Button variantType="secondary" size="small" onClick={() => navigate(`/banking/baas/accounts/${accountId}/cards`)}>{copy.viewAllDebitCards}</Button>
    </Box>
    {active.length ? <>
      <div className="baasMonthlyCardSpend__summary">
        <Typography variant="small" as="p">{interpolate(copy.cardSpend.rowsHint, { shown: number(rows.length), count: number(active.length), transactions: number(transactions) })}</Typography>
        <div><MoneyValue amount={current} locale={locale} direction="out" /><SpendComparison current={current} previous={previous} /></div>
      </div>
      <FlatTable width="100%" overflowX="auto" colorTheme="transparent-base" title={copy.monthlyCardSpend}>
        <FlatTableHead><FlatTableRow>
          <FlatTableHeader>{copy.table.cardholder}</FlatTableHeader><FlatTableHeader>{copy.cardSpend.card}</FlatTableHeader>
          <FlatTableHeader align="right">{copy.transactionCount}</FlatTableHeader><FlatTableHeader>{copy.topMerchant}</FlatTableHeader>
          <FlatTableHeader align="right">{copy.monthlySpend}</FlatTableHeader><FlatTableHeader align="right">{copy.cardSpend.comparison}</FlatTableHeader>
        </FlatTableRow></FlatTableHead>
        <FlatTableBody>{rows.map(card => {
          const activity = cardSpendSnapshots[card.id];
          return <FlatTableRow key={card.id} horizontalBorderColor="--colorsUtilityMajor050" onClick={() => navigate(`/banking/baas/accounts/${accountId}/cards?card=${card.id}`)}>
            <FlatTableCell><span className="baasMonthlyCardSpend__holder"><BaasCardholderAvatar name={card.cardholder} /><Typography variant="small" as="span">{card.cardholder}</Typography></span></FlatTableCell>
            <FlatTableCell><span className="baasMonthlyCardSpend__card"><BaasCardThumbnail card={card} /><span><Typography variant="small" as="span">{card.nickname}</Typography><Typography variant="small" as="span" className="baasMonthlyCardSpend__muted">•••• {card.lastFour}</Typography></span></span></FlatTableCell>
            <FlatTableCell align="right">{number(activity?.transactionCount ?? 0)}</FlatTableCell>
            <FlatTableCell>{activity?.topMerchant ?? "—"}</FlatTableCell>
            <FlatTableCell align="right"><MoneyValue amount={card.monthlySpendEur} locale={locale} direction="out" /></FlatTableCell>
            <FlatTableCell align="right"><SpendComparison current={card.monthlySpendEur} previous={activity?.previousPeriodSpendEur ?? null} /></FlatTableCell>
          </FlatTableRow>;
        })}</FlatTableBody>
      </FlatTable>
    </> : <Typography variant="p" as="p" className="baasMonthlyCardSpend__empty">{copy.cardSpend.empty}</Typography>}
  </section>;
}

function SpendComparison({ current, previous }: { current: number; previous: number | null }) {
  const { language } = useLanguage(), copy = getLocale(language).bankingBaas.dashboard.cardSpend;
  const locale = getLocaleCode(language), comparison = cardSpendComparison(current, previous);
  const percentage = new Intl.NumberFormat(locale, { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(comparison.percentage);
  return <span className="baasMonthlyCardSpend__comparison">
    <Typography variant="small" as="span">{interpolate(copy.change[comparison.kind], { percentage })}</Typography>
    {previous !== null && <Typography variant="small" as="span" className="baasMonthlyCardSpend__muted">{interpolate(copy.previousSpend, { amount: new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(previous) })}</Typography>}
  </span>;
}
