import { useState, type ComponentProps } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import Pill from "carbon-react/lib/components/pill";
import Typography from "carbon-react/lib/components/typography";
import {
  FlatTable,
  FlatTableBody,
  FlatTableCell,
  FlatTableHead,
  FlatTableHeader,
  FlatTableRow,
} from "carbon-react/lib/components/flat-table";
import { Breadcrumbs, Crumb } from "carbon-react/lib/components/breadcrumbs";
import { useNavigate, useParams } from "react-router-dom";
import BaasIssueCardSidebar, { type BaasCardIssueFormData } from "../../components/banking-baas/BaasIssueCardSidebar";
import { baasBusinessProfile, baasTransactions, debitCards, stagedBaasAccounts } from "../../data/bankingBaas";
import { useLanguage } from "../../context/useLanguage";
import { getLocale, getLocaleCode } from "../../locales";
import { interpolate } from "../../utils/interpolate";

export default function BankingBaasAccountPage() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const { language } = useLanguage();
  const copy = getLocale(language).bankingBaas;
  const locale = getLocaleCode(language);
  const [isIssueSidebarOpen, setIsIssueSidebarOpen] = useState(false);
  const [cardIssueMessage, setCardIssueMessage] = useState("");
  const account = stagedBaasAccounts.find((candidate) => candidate.id === accountId) ?? stagedBaasAccounts[0];
  const formatCurrency = (amount: number) => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(amount);
  const issuedDebitCards = debitCards.filter((card) => card.status === "issued");
  const monthlyCardSpendEur = issuedDebitCards.reduce((total, card) => total + card.monthlySpendEur, 0);
  const topCardholders = Object.values(
    issuedDebitCards.reduce<Record<string, { cardholder: string; activeCardCount: number; monthlySpendEur: number }>>((summaries, card) => {
      const currentSummary = summaries[card.cardholder] ?? { cardholder: card.cardholder, activeCardCount: 0, monthlySpendEur: 0 };
      summaries[card.cardholder] = {
        cardholder: card.cardholder,
        activeCardCount: currentSummary.activeCardCount + 1,
        monthlySpendEur: currentSummary.monthlySpendEur + card.monthlySpendEur,
      };
      return summaries;
    }, {}),
  ).sort((first, second) => second.monthlySpendEur - first.monthlySpendEur).slice(0, 3);
  const cardholders = [...new Set(debitCards.map((card) => card.cardholder))];

  const handleIssueCard = (formData: BaasCardIssueFormData) => {
    // PROTOTYPE: pass this form payload to the issuing API in the integrated product.
    setCardIssueMessage(interpolate(copy.cards.created, { name: formData.cardholder }));
    setIsIssueSidebarOpen(false);
  };

  return (
    <Box className="bankingBaasDetailPage">
      <Box className="bankingBaasDetailPage__content" display="flex" flexDirection="column" gap={3}>
        <Box className="bankingBaasDetailPage__heading" display="flex" flexDirection="column" gap={1}>
          <Breadcrumbs>
            <Crumb
              href="/banking"
              onClick={(event) => {
                event.preventDefault();
                navigate("/banking");
              }}
            >
              {copy.onboarding.back}
            </Crumb>
          </Breadcrumbs>
          <Typography variant="h1" as="h1">{copy.dashboard.title}</Typography>
          <Typography variant="p" as="p">{copy.dashboard.subtitle}</Typography>
        </Box>

        <Box className="baasAccountHero" display="flex" justifyContent="space-between" alignItems="center" gap={3}>
          <Box className="baasAccountHero__account" display="flex" flexDirection="column" gap={1}>
            <Typography variant="h2" as="h2">{baasBusinessProfile.businessName}</Typography>
            <Typography variant="strong" as="p">{copy.dashboard.primaryBusinessAccount}</Typography>
            <Typography variant="small" as="p">{copy.dashboard.accountEnding} {account.accountEnding}</Typography>
            <Box className="baasAccountHero__accountActions" display="flex" gap={2} flexWrap="wrap">
              <Button variantType="secondary" iconType="view" iconPosition="before">{copy.dashboard.viewDetails}</Button>
            </Box>
          </Box>
          <Box className="baasAccountHero__balance" display="flex" flexDirection="column" alignItems="flex-end" gap={2}>
            <Box display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
              <Typography variant="small" as="p">{copy.dashboard.availableBalance}</Typography>
              <Typography variant="h2" as="p" className="numericValue">{formatCurrency(account.balanceEur)}</Typography>
            </Box>
            <Box display="flex" gap={2} flexWrap="wrap" justifyContent="flex-end">
              <Button variantType="secondary" iconType="pdf" iconPosition="before">{copy.dashboard.viewStatements}</Button>
              <Button variantType="secondary" iconType="credit_card" iconPosition="before" onClick={() => setIsIssueSidebarOpen(true)}>{copy.cards.issueNewCard}</Button>
              <Button variantType="primary" iconType="add" iconPosition="before">{copy.dashboard.addMoney}</Button>
            </Box>
          </Box>
        </Box>

        <Box className="baasKpiGrid">
          <BaasKpi icon="arrow_bottom_right_circle" iconColor="--colorsSemanticPositive500" title={copy.dashboard.moneyIn} detail={copy.dashboard.transactions.replace("{count}", "20")} amount={formatCurrency(account.monthlyInEur)} />
          <BaasKpi icon="arrow_top_right_circle" iconColor="--colorsSemanticNegative500" title={copy.dashboard.moneyOut} detail={copy.dashboard.transactions.replace("{count}", "20")} amount={formatCurrency(account.monthlyOutEur)} />
          <BaasKpi icon="refresh_clock" iconColor="--colorsSemanticCaution500" title={copy.dashboard.pendingTransactions} detail={copy.dashboard.waitingToClear.replace("{count}", "5")} amount={formatCurrency(account.pendingEur)} />
        </Box>

        <Box className="baasSpendPanel" display="flex" gap={3}>
          <Box className="baasSpendPanel__summary" display="flex" flexDirection="column" gap={2}>
            <Box className="baasSpendPanel__cardPreview" aria-hidden="true">
              <Typography variant="strong" as="span">Sage</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Icon type="credit_card" color="--colorsSemanticInfo500" aria-hidden />
              <Typography variant="strong" as="p">{copy.dashboard.monthlyCardSpend}</Typography>
            </Box>
            <Box className="baasSpendPanel__value" display="flex" flexDirection="column">
              <Typography variant="small" as="p">{copy.dashboard.transactions.replace("{count}", "20")}</Typography>
              <Typography variant="h3" as="p" className="numericValue">{formatCurrency(monthlyCardSpendEur)}</Typography>
            </Box>
          </Box>
          <Box className="baasSpendPanel__list" display="flex" flexDirection="column" gap={2} flex="1">
            <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
              <Typography variant="h2" as="h2">{copy.dashboard.topCardholders}</Typography>
              <Button variantType="secondary" size="small" onClick={() => navigate(`/banking/baas/accounts/${account.id}/cards`)}>{copy.dashboard.viewAllDebitCards}</Button>
            </Box>
            {topCardholders.map((cardholder) => (
              <Box key={cardholder.cardholder} className="baasSpendRow" display="grid" alignItems="center">
                <Typography variant="strong" as="span">{cardholder.cardholder}</Typography>
                <Box className="baasSpendRow__cardStatus" display="flex" flexDirection="column">
                  <Typography variant="small" as="span">{copy.dashboard.debitCards}</Typography>
                  <Pill pillRole="status" colorVariant="positive" size="S" fill>{copy.dashboard.activeCards.replace("{count}", String(cardholder.activeCardCount))}</Pill>
                </Box>
                <Box className="baasSpendRow__spend" display="flex" flexDirection="column">
                  <Typography variant="small" as="span">{copy.dashboard.monthlySpend}</Typography>
                  <Typography variant="strong" as="span" className="numericValue">{formatCurrency(cardholder.monthlySpendEur)}</Typography>
                </Box>
                <Button variantType="tertiary" size="small">{copy.dashboard.viewDetails}</Button>
              </Box>
            ))}
          </Box>
        </Box>

        <Box className="baasTransactionsPanel" display="flex" flexDirection="column" gap={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
            <Typography variant="h2" as="h2">{copy.dashboard.recentTransactions}</Typography>
            <Button variantType="secondary" size="small">{copy.dashboard.viewAllTransactions}</Button>
          </Box>
          <FlatTable width="100%" overflowX="auto">
            <FlatTableHead>
              <FlatTableRow>
                <FlatTableHeader>{copy.dashboard.table.date}</FlatTableHeader>
                <FlatTableHeader>{copy.dashboard.table.cardholder}</FlatTableHeader>
                <FlatTableHeader>{copy.dashboard.table.type}</FlatTableHeader>
                <FlatTableHeader>{copy.dashboard.table.description}</FlatTableHeader>
                <FlatTableHeader>{copy.dashboard.table.status}</FlatTableHeader>
                <FlatTableHeader align="right">{copy.dashboard.table.amount}</FlatTableHeader>
              </FlatTableRow>
            </FlatTableHead>
            <FlatTableBody>
              {baasTransactions.map((transaction) => (
                <FlatTableRow key={transaction.id}>
                  <FlatTableCell>{transaction.date}</FlatTableCell>
                  <FlatTableCell>
                    <Box className="baasTransactionCardholder" display="flex" alignItems="center" gap={1}>
                      {transaction.cardNetwork && <CardNetworkMark network={transaction.cardNetwork} />}
                      <span>{transaction.cardholder}</span>
                    </Box>
                  </FlatTableCell>
                  <FlatTableCell>{transaction.type}</FlatTableCell>
                  <FlatTableCell>{transaction.description}</FlatTableCell>
                  <FlatTableCell><span className="baasStatusPill"><Pill pillRole="status" colorVariant={transaction.status === "completed" ? "positive" : transaction.status === "failed" ? "negative" : "neutral"} size="S">{copy.dashboard.statuses[transaction.status]}</Pill></span></FlatTableCell>
                  <FlatTableCell align="right"><span className={`numericValue${transaction.amountEur < 0 ? " baasTransactionAmount--negative" : ""}`}>{formatCurrency(transaction.amountEur)}</span></FlatTableCell>
                </FlatTableRow>
              ))}
            </FlatTableBody>
          </FlatTable>
        </Box>
      </Box>
      {cardIssueMessage && <Typography className="baasCardSuccess" variant="small" as="p" role="status">{cardIssueMessage}</Typography>}
      <BaasIssueCardSidebar
        open={isIssueSidebarOpen}
        cardholders={cardholders}
        onCancel={() => setIsIssueSidebarOpen(false)}
        onIssue={handleIssueCard}
      />
    </Box>
  );
}

function CardNetworkMark({ network }: { network: "visa" | "mastercard" }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const networkName = network === "visa" ? "Visa" : "Mastercard";

  return (
    <span className="baasTransactionCardholder__networkFrame" role="img" aria-label={networkName}>
      {!imageLoaded && (
        <span className={`baasTransactionCardholder__networkFallback baasTransactionCardholder__networkFallback--${network}`} aria-hidden="true">
          {network === "visa" ? <span>VISA</span> : <span className="baasTransactionCardholder__mastercardMark"><i /><i /></span>}
        </span>
      )}
      {!imageUnavailable && (
        <img
          className={`baasTransactionCardholder__network baasTransactionCardholder__network--${network}${imageLoaded ? " baasTransactionCardholder__network--loaded" : ""}`}
          src={`https://cdn.simpleicons.org/${network}/${network === "visa" ? "1A1F71" : "EB001B"}`}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageUnavailable(true)}
        />
      )}
    </span>
  );
}

function BaasKpi({ icon, iconColor, title, detail, amount }: { icon: ComponentProps<typeof Icon>["type"]; iconColor: ComponentProps<typeof Icon>["color"]; title: string; detail: string; amount: string }) {
  return (
    <Box className="baasKpi" display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" gap={1}>
        <Icon type={icon} color={iconColor} aria-hidden />
        <Typography variant="strong" as="p">{title}</Typography>
      </Box>
      <Box className="baasKpi__value" display="flex" flexDirection="column">
        <Typography variant="small" as="p">{detail}</Typography>
        <Typography variant="h3" as="p" className="numericValue">{amount}</Typography>
      </Box>
    </Box>
  );
}
