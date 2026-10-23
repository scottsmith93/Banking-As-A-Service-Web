import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Typography from "carbon-react/lib/components/typography";
import { ActionPopover, ActionPopoverItem } from "carbon-react/lib/components/action-popover";
import { Breadcrumbs, Crumb } from "carbon-react/lib/components/breadcrumbs";
import { useNavigate, useParams } from "react-router-dom";
import BaasAccountNavigation from "../../components/banking-baas/BaasAccountNavigation";
import BaasRecentTransactions from "../../components/banking-baas/BaasRecentTransactions";
import SageWalletOnboardingDialog from "../../components/sage-wallet/SageWalletOnboardingDialog";
import { sageWalletCardholders } from "../../data/sageWalletOnboarding";
import { stagedBaasAccounts } from "../../data/bankingBaas";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";
import { interpolate } from "../../utils/interpolate";
import { useBankingBaas } from "../../context/useBankingBaas";
import "../../components/banking-baas/overview.css";
import BaasMonthlyCardSpend from "../../components/banking-baas/BaasMonthlyCardSpend";
import BaasOverviewSummary from "../../components/banking-baas/BaasOverviewSummary";
import BankLogo from "../../components/banking/BankLogo";

export default function BankingBaasAccountPage() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const { language } = useLanguage();
  const copy = getLocale(language).bankingBaas;
  const { cards, addCard } = useBankingBaas();
  const [isIssueWizardOpen, setIsIssueWizardOpen] = useState(false);
  const [cardIssueMessage, setCardIssueMessage] = useState("");
  const account = stagedBaasAccounts.find((candidate) => candidate.id === accountId) ?? stagedBaasAccounts[0];

  // The wizard offers the Sage Wallet team plus anyone who already holds a card here.
  const cardholders = [...new Set([...sageWalletCardholders, ...cards.map((card) => card.cardholder)])];
  const handleIssueCard = (draft: Parameters<typeof addCard>[0]) => {
    const createdCard = addCard(draft);
    setCardIssueMessage(interpolate(copy.cards.created, { name: draft.cardholder }));
    return createdCard;
  };

  return (
    <Box className="bankingBaasDetailPage baasOverviewPage">
      <BaasAccountNavigation accountId={account.id} />
      <Box className="bankingBaasDetailPage__content" display="flex" flexDirection="column" gap={3}>
        <Box className="bankingBaasDetailPage__heading" display="flex" flexDirection="column" gap={1}>
          <Breadcrumbs><Crumb href="/banking" onClick={event => { event.preventDefault(); navigate("/banking"); }}>{copy.dashboard.bankAccountsBreadcrumb}</Crumb></Breadcrumbs>
          <Box className="baasOverviewHeading" display="flex" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
            <Box className="baasOverviewIdentity">
              <BankLogo src="/banking/sage-demo-bank-icon.svg" />
              <Typography variant="h1" as="h1">{copy.dashboard.title}</Typography>
            </Box>
            <Box className="baasOverviewActions" display="flex" flexWrap="wrap">
              {/* PROTOTYPE: statements and money movement are not simulated yet; card issuing is interactive. */}
              <Button className="baasOverviewAction" variantType="secondary" size="small" iconType="credit_card" iconPosition="before" onClick={() => setIsIssueWizardOpen(true)}>{copy.dashboard.actions.newCard}</Button>
              <Button className="baasOverviewAction" variantType="secondary" size="small" iconType="send" iconPosition="before">{copy.dashboard.actions.transfer}</Button>
              <ActionPopover aria-label={copy.dashboard.moreActions} rightAlignMenu>
                <ActionPopoverItem icon="plus_large">{copy.dashboard.addMoney}</ActionPopoverItem>
                <ActionPopoverItem icon="pdf">{copy.dashboard.actions.statements}</ActionPopoverItem>
              </ActionPopover>
            </Box>
          </Box>
        </Box>
        <BaasOverviewSummary account={account} />

        <BaasRecentTransactions />

        <BaasMonthlyCardSpend accountId={account.id} />
      </Box>
      {cardIssueMessage && <Typography className="baasCardSuccess" variant="small" as="p" role="status">{cardIssueMessage}</Typography>}
      {/* Same Sage Wallet wizard as the cards page, starting at the card step. */}
      <SageWalletOnboardingDialog
        open={isIssueWizardOpen}
        mode="issueCard"
        initialCardholders={cardholders}
        onClose={() => setIsIssueWizardOpen(false)}
        onCreateCard={handleIssueCard}
        onViewAccount={() => setIsIssueWizardOpen(false)}
        onViewCards={() => { setIsIssueWizardOpen(false); navigate(`/banking/baas/accounts/${account.id}/cards`); }}
      />
    </Box>
  );
}
