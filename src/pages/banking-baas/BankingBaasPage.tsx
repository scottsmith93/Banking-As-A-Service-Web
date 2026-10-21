import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import { useNavigate } from "react-router-dom";
import BaasBankAccountCard from "../../components/banking-baas/BaasBankAccountCard";
import BaasOnboardingDialog from "../../components/banking-baas/BaasOnboardingDialog";
import BaasPromotionBanner from "../../components/banking-baas/BaasPromotionBanner";
import CreateLegacyBankAccountDialog from "../../components/banking-baas/CreateLegacyBankAccountDialog";
import { legacyBankAccounts, type LegacyBankAccount } from "../../data/bankingBaas";
import { useBankingBaas } from "../../context/useBankingBaas";
import { useLanguage } from "../../context/useLanguage";
import { getLocale, getLocaleCode } from "../../locales";

export default function BankingBaasPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { accounts, completeOnboarding } = useBankingBaas();
  const copy = getLocale(language).bankingBaas;
  const locale = getLocaleCode(language);
  const [searchText, setSearchText] = useState("");
  const [legacyAccounts, setLegacyAccounts] = useState(legacyBankAccounts);
  const [isBaasDialogOpen, setIsBaasDialogOpen] = useState(false);
  const [isLegacyDialogOpen, setIsLegacyDialogOpen] = useState(false);

  const query = searchText.trim().toLowerCase();
  const filteredLegacyAccounts = legacyAccounts.filter((account) => account.name.toLowerCase().includes(query));
  const filteredBaasAccounts = accounts.filter((account) => account.name.toLowerCase().includes(query));
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

  const handleCreateLegacyAccount = (account: LegacyBankAccount) => {
    setLegacyAccounts((current) => [...current, account]);
  };

  return (
    <Box className="pageContent bankingBaasPage">
      <Box className="bankingBaasPage__titleRow" display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h1" as="h1">{copy.title}</Typography>
          <Typography variant="p" as="p" className="bankingBaasPage__description">{copy.description}</Typography>
        </Box>
        <Button variantType="tertiary" iconType="refresh" iconPosition="before">{copy.syncAll}</Button>
      </Box>

      <BaasPromotionBanner copy={copy.promotion} onOpen={() => setIsBaasDialogOpen(true)} />

      <Box className="bankingBaasPage__toolbar" display="flex" justifyContent="space-between" alignItems="flex-end" gap={3}>
        <Button variantType="primary" iconType="add" iconPosition="before" onClick={() => setIsLegacyDialogOpen(true)}>
          {copy.create}
        </Button>
        <Box className="bankingBaasPage__search">
          <Textbox
            id="banking-baas-search"
            label={copy.searchLabel}
            placeholder={copy.searchPlaceholder}
            inputIcon="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </Box>
      </Box>

      <Box className="bankingBaasPage__section" display="flex" flexDirection="column" gap={2}>
        <Typography variant="h2" as="h2">{copy.existingAccounts}</Typography>
        <Box className="bankingBaasPage__accountGrid">
          {filteredLegacyAccounts.map((account) => (
            <BaasBankAccountCard key={account.id} account={account} copy={cardCopy} locale={locale} />
          ))}
        </Box>
      </Box>

      {filteredBaasAccounts.length > 0 && (
        <Box className="bankingBaasPage__section" display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="h2" as="h2">{copy.sageAccounts}</Typography>
              <Typography variant="p" as="p" className="bankingBaasPage__sectionDescription">{copy.sageAccountsDescription}</Typography>
            </Box>
            <Typography variant="small" as="p">{copy.accountCount.replace("{count}", String(filteredBaasAccounts.length))}</Typography>
          </Box>
          <Box className="bankingBaasPage__accountGrid">
            {filteredBaasAccounts.map((account) => (
              <BaasBankAccountCard
                key={account.id}
                account={account}
                copy={cardCopy}
                locale={locale}
                onOpen={() => navigate(`/banking/baas/accounts/${account.id}`)}
              />
            ))}
          </Box>
          <Box className="bankingBaasPage__demoNote" display="flex" alignItems="flex-start" gap={2}>
            <Typography variant="strong" as="span">{copy.demoNoteLabel}</Typography>
            <Typography variant="small" as="span">{copy.demoNote}</Typography>
          </Box>
        </Box>
      )}

      <Typography variant="small" as="p" className="bankingBaasPage__itemCount">
        {copy.items.replace("{count}", String(filteredLegacyAccounts.length + filteredBaasAccounts.length))}
      </Typography>

      <BaasOnboardingDialog
        open={isBaasDialogOpen}
        copy={copy.onboarding}
        onClose={() => setIsBaasDialogOpen(false)}
        onComplete={completeOnboarding}
        onManageBank={() => {
          setIsBaasDialogOpen(false);
          navigate("/banking/baas/accounts/sage-operating-account");
        }}
      />
      <CreateLegacyBankAccountDialog
        open={isLegacyDialogOpen}
        copy={copy.createDialog}
        onClose={() => setIsLegacyDialogOpen(false)}
        onCreate={handleCreateLegacyAccount}
      />
    </Box>
  );
}
