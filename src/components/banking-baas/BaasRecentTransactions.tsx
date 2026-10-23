import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Message from "carbon-react/lib/components/message";
import Typography from "carbon-react/lib/components/typography";
import { FlatTable, FlatTableBody, FlatTableCell, FlatTableHead, FlatTableHeader, FlatTableRow } from "carbon-react/lib/components/flat-table";
import { useBankingTransactions } from "../../context/useBankingTransactions";
import { needsJustification } from "../../utils/transactionMatching";
import { useLanguage } from "../../context/useLanguage";
import { getLocale, getLocaleCode } from "../../locales";
import { interpolate } from "../../utils/interpolate";
import { useTransactionTableColumns } from "../../hooks/useTransactionTableColumns";
import { bankMovementsHref } from "../../utils/bankMovementNavigation";
import "./transactions/transactions.css";

// Carbon FlatTable owns the small overview table; invoice association is explicit mock data.
export default function BaasRecentTransactions() {
  const { language } = useLanguage();
  const columns = useTransactionTableColumns({ overview: true });
  const navigate = useNavigate();
  const { accountId = "sage-operating-account" } = useParams();
  const { transactions } = useBankingTransactions();
  const accountTransactions = transactions.filter(transaction => transaction.accountId === accountId);
  const recentTransactions = [...accountTransactions].sort((first, second) => second.date.localeCompare(first.date)).slice(0, 10);
  const transactionCopy = getLocale(language).bankingBaas.transactions;
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === "#recent-transactions") document.getElementById("recent-transactions")?.scrollIntoView();
  }, [hash]);
  const copy = getLocale(language).bankingBaas.dashboard;
  const locale = getLocaleCode(language);
  const missing = accountTransactions.filter(needsJustification);
  const money = new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" });
  return (
    <section className="baasOverviewTransactions" id="recent-transactions" aria-labelledby="recent-transactions-title">
      <Box className="baasOverviewSectionHeading" display="flex" justifyContent="space-between" alignItems="center" gap={2}>
        <Box className="baasOverviewTransactions__headingGroup" display="flex" flexDirection="column" gap={0.5}>
          <Typography variant="h2" as="h2" id="recent-transactions-title">{copy.recentTransactions}</Typography>
          <Typography variant="small" as="p">{interpolate(transactionCopy.justification.recentHint, { count: recentTransactions.length })}</Typography>
        </Box>
        <Box className="baasOverviewTransactions__actions" display="flex" alignItems="center" flexWrap="wrap" gap={2}>
          {missing.length > 0 && <div className="baasOverviewTransactions__notice"><Message variant="info-subtle" size="medium" width="fit-content">{interpolate(transactionCopy.taskDescription, { count: missing.length, amount: money.format(missing.reduce((sum, row) => sum + Math.round(Math.abs(row.amount) * 100), 0) / 100) })}</Message></div>}
          <Button variantType="secondary" size="small" onClick={() => navigate(bankMovementsHref(accountId))}>{copy.viewAllTransactions}</Button>
        </Box>
      </Box>
      <FlatTable width="100%" overflowX="auto" colorTheme="transparent-base" title={copy.recentTransactions} bottomBorderRadius="borderRadius100">
        <FlatTableHead><FlatTableRow>{columns.map(column => <FlatTableHeader key={column.id} data-role={`baasTransactionColumn--${column.id}`} align={column.align}>{column.label}</FlatTableHeader>)}</FlatTableRow></FlatTableHead>
        <FlatTableBody>{recentTransactions.map(transaction => <FlatTableRow key={transaction.id}
          horizontalBorderColor="--colorsUtilityMajor050"
          onClick={() => navigate(bankMovementsHref(accountId, { transaction: transaction.id }))}
        >{columns.map(column => <FlatTableCell key={column.id} data-role={`baasTransactionColumn--${column.id}`} align={column.align}>{column.render(transaction)}</FlatTableCell>)}</FlatTableRow>)}</FlatTableBody>
      </FlatTable>
    </section>
  );
}
