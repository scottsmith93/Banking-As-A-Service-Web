import { useState, type ComponentProps } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import Pill from "carbon-react/lib/components/pill";
import Typography from "carbon-react/lib/components/typography";
import { Breadcrumbs, Crumb } from "carbon-react/lib/components/breadcrumbs";
import { useNavigate, useParams } from "react-router-dom";
import BaasAccountNavigation from "../../components/banking-baas/BaasAccountNavigation";
import BaasRecentTransactions from "../../components/banking-baas/BaasRecentTransactions";
import BaasIssueCardSidebar, { type BaasCardIssueFormData } from "../../components/banking-baas/BaasIssueCardSidebar";
import { baasCardholderActivity, stagedBaasAccounts } from "../../data/bankingBaas";
import { useLanguage } from "../../context/useLanguage";
import { getLocale, getLocaleCode } from "../../locales";
import { interpolate } from "../../utils/interpolate";
import { useBankingBaas } from "../../context/useBankingBaas";
import "../../components/banking-baas/overview.css";

export default function BankingBaasAccountPage() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const { language } = useLanguage();
  const copy = getLocale(language).bankingBaas;
  const locale = getLocaleCode(language);
  const { cards, addCard } = useBankingBaas();
  const [isIssueSidebarOpen, setIsIssueSidebarOpen] = useState(false);
  const [cardIssueMessage, setCardIssueMessage] = useState("");
  const [lastIssuedCardId, setLastIssuedCardId] = useState<string | null>(null);
  const account = stagedBaasAccounts.find((candidate) => candidate.id === accountId) ?? stagedBaasAccounts[0];
  const formatCurrency = (amount: number) => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(amount);
  const issuedDebitCards = cards.filter((card) => card.status === "issued");
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
  const monthlyTransactionCount = Object.values(baasCardholderActivity).reduce((total, activity) => total + activity.transactionCount, 0);
  const cardholders = [...new Set(cards.map((card) => card.cardholder))];

  const handleIssueCard = (formData: BaasCardIssueFormData) => {
    const createdCard = addCard({ cardholder: formData.cardholder, nickname: formData.nickname || copy.cards.newCardNickname,
      colour: formData.colour, network: formData.network, type: formData.type });
    setLastIssuedCardId(createdCard.id);
    setCardIssueMessage(formData.type === "physical" ? copy.cardIssueForm.physicalSuccess.title : interpolate(copy.cards.created, { name: formData.cardholder }));
  };

  return (
    <Box className="bankingBaasDetailPage baasOverviewPage">
      <BaasAccountNavigation accountId={account.id} />
      <Box className="bankingBaasDetailPage__content" display="flex" flexDirection="column" gap={3}>
        <Box className="bankingBaasDetailPage__heading" display="flex" flexDirection="column" gap={1}>
          <Breadcrumbs><Crumb href="/banking" onClick={event => { event.preventDefault(); navigate("/banking"); }}>{copy.dashboard.bankAccountsBreadcrumb}</Crumb></Breadcrumbs>
          <Box className="baasOverviewHeading" display="flex" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
            <Typography variant="h1" as="h1">{copy.dashboard.title}</Typography>
            <Box className="baasOverviewActions" display="flex" flexWrap="wrap">
              {/* PROTOTYPE: statements and money movement are not simulated yet; card issuing is interactive. */}
              <Button className="baasOverviewAction" variantType="secondary" size="small" iconType="pdf" iconPosition="before">{copy.dashboard.actions.statements}</Button>
              <Button className="baasOverviewAction" variantType="secondary" size="small" iconType="credit_card" iconPosition="before" onClick={() => setIsIssueSidebarOpen(true)}>{copy.dashboard.actions.newCard}</Button>
              <Button className="baasOverviewAction" variantType="secondary" size="small" iconType="plus_large" iconPosition="before">{copy.dashboard.addMoney}</Button>
              <Button className="baasOverviewAction" variantType="secondary" size="small" iconType="send" iconPosition="before">{copy.dashboard.actions.transfer}</Button>
            </Box>
          </Box>
        </Box>
        <div className="baasOverviewSummary">
          <Box className="baasOverviewBalance" display="flex" flexDirection="column" gap={1}>
            <Typography className="baasOverviewHero__label" variant="p" as="p">{copy.dashboard.availableBalance}</Typography>
            <Typography className="baasOverviewHero__amount numericValue" variant="h1" as="p">{formatCurrency(account.balanceEur)}</Typography>
          </Box>
          <BaasKpi icon="arrow_bottom_right_circle" iconColor="--colorsSemanticPositive500" title={copy.dashboard.moneyIn} detail={copy.dashboard.transactions.replace("{count}", "20")} amount={formatCurrency(account.monthlyInEur)} />
          <BaasKpi icon="arrow_top_right_circle" iconColor="--colorsSemanticNegative500" title={copy.dashboard.moneyOut} detail={copy.dashboard.transactions.replace("{count}", "20")} amount={formatCurrency(account.monthlyOutEur)} />
          <BaasKpi icon="refresh_clock" iconColor="--colorsSemanticCaution500" title={copy.dashboard.pendingTransactions} detail={copy.dashboard.waitingToClear.replace("{count}", "5")} amount={formatCurrency(account.pendingEur)} />
        </div>

        <BaasRecentTransactions />

        <Box className="baasOverviewSpend" display="flex" flexDirection="column" gap={3}>
          <Box className="baasOverviewSectionHeading" display="flex" justifyContent="space-between" alignItems="center" gap={2}>
            <Typography variant="h2" as="h2">{copy.dashboard.topCardholders}</Typography>
            <Button variantType="secondary" size="small" onClick={() => navigate(`/banking/baas/accounts/${account.id}/cards`)}>{copy.dashboard.viewAllDebitCards}</Button>
          </Box>
          <Box className="baasOverviewSpend__body" display="flex" flexDirection="column">
            <Box className="baasOverviewSpend__summary" display="flex" justifyContent="space-between" alignItems="center" gap={2}>
              <Box display="flex" alignItems="center" gap={1}>
                <Icon type="credit_card" color="--colorsSemanticInfo500" aria-hidden />
                <Typography variant="h3" as="h3">{copy.dashboard.monthlyCardSpend}</Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Typography variant="small" as="p">{interpolate(copy.dashboard.transactions, { count: monthlyTransactionCount })}</Typography>
                <Typography variant="strong" as="p" className="numericValue">{formatCurrency(monthlyCardSpendEur)}</Typography>
              </Box>
            </Box>
            {topCardholders.map((cardholder) => (
              <Box key={cardholder.cardholder} className="baasSpendRow" display="grid" alignItems="center">
                <Typography variant="strong" as="span">{cardholder.cardholder}</Typography>
                <Box className="baasSpendRow__cardStatus" display="flex" flexDirection="column">
                  <Typography variant="small" as="span">{copy.dashboard.debitCards}</Typography>
                  <Pill pillRole="status" colorVariant="positive" size="S" fill>{copy.dashboard.activeCards.replace("{count}", String(cardholder.activeCardCount))}</Pill>
                </Box>
                <Box className="baasSpendRow__activity" display="flex" flexDirection="column">
                  <Typography variant="small" as="span">{copy.dashboard.transactionCount}</Typography>
                  <Typography variant="strong" as="span" className="numericValue">{new Intl.NumberFormat(locale).format(baasCardholderActivity[cardholder.cardholder]?.transactionCount ?? 0)}</Typography>
                </Box>
                <Box className="baasSpendRow__merchant" display="flex" flexDirection="column">
                  <Typography variant="small" as="span">{copy.dashboard.topMerchant}</Typography>
                  <Typography variant="strong" as="span">{baasCardholderActivity[cardholder.cardholder]?.topMerchant ?? "—"}</Typography>
                </Box>
                <Box className="baasSpendRow__spend" display="flex" flexDirection="column">
                  <Typography variant="small" as="span">{copy.dashboard.monthlySpend}</Typography>
                  <Typography variant="strong" as="span" className="numericValue">{formatCurrency(cardholder.monthlySpendEur)}</Typography>
                </Box>
                <Button variantType="secondary" size="small" onClick={() => { const card = issuedDebitCards.find((candidate) => candidate.cardholder === cardholder.cardholder); navigate(`/banking/baas/accounts/${account.id}/cards${card ? `?card=${card.id}` : ""}`); }}>{copy.dashboard.actions.viewDetails}</Button>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {cardIssueMessage && <Typography className="baasCardSuccess" variant="small" as="p" role="status">{cardIssueMessage}</Typography>}
      <BaasIssueCardSidebar
        open={isIssueSidebarOpen}
        cardholders={cardholders}
        onCancel={() => setIsIssueSidebarOpen(false)}
        onIssue={handleIssueCard}
        onManage={() => navigate(`/banking/baas/accounts/${account.id}/cards${lastIssuedCardId ? `?card=${lastIssuedCardId}` : ""}`)}
      />
    </Box>
  );
}

function BaasKpi({ icon, iconColor, title, detail, amount }: { icon: ComponentProps<typeof Icon>["type"]; iconColor: ComponentProps<typeof Icon>["color"]; title: string; detail: string; amount: string }) {
  return (
    <Box className="baasKpi" display="flex" flexDirection="column" gap={1}>
      <Box display="flex" alignItems="center" gap={1}>
        <Icon type={icon} color={iconColor} aria-hidden />
        <Typography variant="strong" as="p">{title}</Typography>
      </Box>
      <Box className="baasKpi__value" display="flex" flexDirection="column">
        <Typography variant="strong" as="p" className="numericValue">{amount}</Typography>
        <Typography variant="small" as="p">{detail}</Typography>
      </Box>
    </Box>
  );
}
