import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Typography from "carbon-react/lib/components/typography";
import { useNavigate } from "react-router-dom";
import BankAccountCards from "../../components/banking/BankAccountCards";
import BaasBankAccountCard from "../../components/banking-baas/BaasBankAccountCard";
import BaasOnboardingDialog from "../../components/banking-baas/BaasOnboardingDialog";
import BaasPromotionBanner from "../../components/banking-baas/BaasPromotionBanner";
import { bankAccounts } from "../../data/bankAccounts";
import { useBankingBaas } from "../../context/useBankingBaas";
import { useLanguage } from "../../context/useLanguage";
import { getLocale, getLocaleCode } from "../../locales";
import { ROUTES } from "../../routes";

export default function BankingPage() {
  const navigate = useNavigate();
  const [isBaasDialogOpen, setIsBaasDialogOpen] = useState(false);
  const { language } = useLanguage();
  const { accounts, completeOnboarding } = useBankingBaas();
  const copy = getLocale(language).bankingBaas;
  const locale = getLocaleCode(language);
  const legacyAccounts = bankAccounts.slice(0, 2);
  const cardCopy = {
    sageAccount: copy.accounts.sageAccount,
    pending: copy.accounts.pending,
    active: copy.accounts.active,
    realTime: copy.accounts.realTime,
    poweredByAdyen: copy.accounts.poweredByAdyen,
    balance: copy.accounts.balance,
    accountEnding: copy.accounts.accountEnding,
    ledgerAccount: copy.accounts.ledgerAccount,
    lastUpdated: copy.accounts.lastUpdated,
    openAccount: copy.accounts.openAccount,
    viewAccount: copy.accounts.viewAccount,
    manageMovements: copy.accounts.manageMovements,
    edit: copy.accounts.edit,
    delete: copy.accounts.delete,
    cashAccount: copy.accounts.cashAccount,
    existingBankAccount: copy.accounts.existingBankAccount,
  };

  return (
    <Box className="pageContent salesListingPage bankingAccountsPage">
      <Box className="salesListingPage__titleRow" display="flex" justifyContent="space-between">
        <Typography variant="h1" as="h1" className="salesListingPage__title">
          {copy.title}
        </Typography>
        <Button variantType="tertiary" iconType="refresh" iconPosition="before">
          {copy.syncAll}
        </Button>
      </Box>

      <BaasPromotionBanner copy={copy.promotion} onOpen={() => setIsBaasDialogOpen(true)} />

      <Box className="salesListingPage__toolbar" display="flex" alignItems="center">
        <Button variantType="primary" iconType="add" iconPosition="before">
          {copy.create}
        </Button>
      </Box>

      {accounts.length > 0 && (
        <Box className="bankingAccountsPage__baasAccounts">
          {accounts.map((account) => (
            <BaasBankAccountCard
              key={account.id}
              account={account}
              copy={cardCopy}
              locale={locale}
              onOpen={() => navigate(ROUTES.banking.baasAccount(account.id))}
            />
          ))}
        </Box>
      )}

      <BankAccountCards accounts={legacyAccounts} />

      <Typography variant="p" as="p" className="salesListingPage__itemCount">
        {copy.items.replace("{count}", String(accounts.length + legacyAccounts.length))}
      </Typography>

      <BaasOnboardingDialog
        open={isBaasDialogOpen}
        copy={copy.onboarding}
        onClose={() => setIsBaasDialogOpen(false)}
        onComplete={completeOnboarding}
        onManageBank={() => {
          setIsBaasDialogOpen(false);
          navigate(ROUTES.banking.baasAccount("sage-operating-account"));
        }}
      />
    </Box>
  );
}
