import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button, { type ButtonHandle } from "carbon-react/lib/components/button/__next__";
import Loader from "carbon-react/lib/components/loader";
import Typography from "carbon-react/lib/components/typography";
import BaasBankAccountCard from "../../components/banking-baas/BaasBankAccountCard";
import BaasPromotionBanner from "../../components/banking-baas/BaasPromotionBanner";
import CreateLegacyBankAccountDialog from "../../components/banking-baas/CreateLegacyBankAccountDialog";
import SageWalletOnboardingDialog from "../../components/sage-wallet/SageWalletOnboardingDialog";
import BankBrandHeading from "../../components/banking-baas/BankBrandHeading";
import BankLogo from "../../components/banking/BankLogo";
import { connectedBanks, connectedBankAccounts, type ConnectedBankAccount } from "../../data/bankAccountConnections";
import type { LegacyBankAccount } from "../../data/bankingBaas";
import { sageWalletOpenedAccount } from "../../data/sageWalletOnboarding";
import { useBankingBaas } from "../../context/useBankingBaas";
import { ROUTES } from "../../routes";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";
import { interpolate } from "../../utils/interpolate";
import "../../components/banking-baas/bank-account-stack.css";

export default function BankingPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { accounts, completeOnboarding, addCard } = useBankingBaas();
  const copy = getLocale(language).bankingBaas;
  const [isBaasDialogOpen, setIsBaasDialogOpen] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  // PROTOTYPE: dismissal lasts until the page reloads; a product would remember it per user.
  const [isPromotionDismissed, setPromotionDismissed] = useState(false);
  const createButtonRef = useRef<ButtonHandle>(null);
  const [otherAccounts, setOtherAccounts] = useState<ConnectedBankAccount[]>([]);
  const [syncTimes, setSyncTimes] = useState<Record<string, string>>({});
  const [syncingIds, setSyncingIds] = useState<string[]>([]);
  const [syncMessage, setSyncMessage] = useState("");
  const allConnected = [...connectedBankAccounts, ...otherAccounts];
  const count = accounts.length + allConnected.length;
  const sync = async (ids: string[]) => {
    setSyncingIds(ids); setSyncMessage("");
    // PROTOTYPE: simulate provider latency only; no bank data is retrieved or invented.
    await new Promise(resolve => window.setTimeout(resolve, 900));
    const timestamp = new Date().toISOString();
    setSyncTimes(current => ({ ...current, ...Object.fromEntries(ids.map(id => [id, timestamp])) }));
    setSyncingIds([]); setSyncMessage(copy.list.syncComplete);
  };
  const createAccount = (account: LegacyBankAccount) => setOtherAccounts(current => [...current, {
    id: account.id, name: account.name, bankId: "other", accountNumber: account.accountNumber, balanceEur: account.balanceEur, lastSyncedAt: null,
  }]);
  return <Box className="pageContent bankAccountStackPage">
    <Box display="flex" justifyContent="space-between" alignItems="center" gap={3} flexWrap="wrap">
      <Typography variant="h1" as="h1">{copy.title}</Typography>
      <Button ref={createButtonRef} variantType="primary" iconType="add" iconPosition="before" onClick={() => setCreateOpen(true)}>{copy.create}</Button>
    </Box>
    <div className="bankAccountStack">
      {/* The offer stays until a Sage Wallet account exists; dismissing hides it for this visit. */}
      {!isPromotionDismissed && accounts.length === 0 && <BaasPromotionBanner
        copy={copy.promotion}
        onOpen={() => setIsBaasDialogOpen(true)}
        // Keep keyboard focus on the page once the banner (and its close button) disappears.
        onDismiss={() => { setPromotionDismissed(true); createButtonRef.current?.focusButton(); }}
      />}
      {accounts.length > 0 && <section className="bankAccountGroup" aria-labelledby="sage-bank-accounts-title">
        <Box display="flex" gap={1} alignItems="center">
          <BankLogo src="/banking/sage-demo-bank-icon.svg" />
          <Typography variant="h2" as="h2" id="sage-bank-accounts-title">{copy.sageAccounts}</Typography>
        </Box>
        {accounts.map(account => <BaasBankAccountCard key={account.id} account={account} lastSyncedAt={syncTimes[account.id] ?? (account.status === "active" ? "2026-10-21T22:54:00Z" : null)} syncing={syncingIds.includes(account.id)} onSync={() => void sync([account.id])} />)}
      </section>}
      {connectedBanks.map(bank => {
        const rows = allConnected.filter(row => row.bankId === bank.id);
        return rows.length > 0 && <section className="bankAccountGroup" key={bank.id} aria-labelledby={`bank-heading-${bank.id}`}>
          <BankBrandHeading bank={bank} />
          {rows.map(account => <BaasBankAccountCard key={account.id} account={account} lastSyncedAt={syncTimes[account.id] ?? account.lastSyncedAt} syncing={syncingIds.includes(account.id)} onSync={() => void sync([account.id])} />)}
        </section>;
      })}
      {otherAccounts.length > 0 && <section className="bankAccountGroup" aria-labelledby="other-bank-accounts-title">
        <Typography variant="h2" as="h2" id="other-bank-accounts-title">{copy.list.otherAccounts}</Typography>
        {otherAccounts.map(account => <BaasBankAccountCard key={account.id} account={account} lastSyncedAt={null} syncing={false} onSync={() => {}} />)}
      </section>}
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
        <Typography variant="small" as="p">{interpolate(copy.items, { count })}</Typography>
        <Typography variant="small" as="p" className="bankAccountStackCard__muted">{copy.list.demoConnections}</Typography>
      </Box>
      {syncingIds.length > 0 && <div role="status" aria-label={copy.list.syncing}><Loader size="small" /></div>}
      <span role="status" className="bankAccountStack__live">{syncMessage}</span>
    </div>
    <SageWalletOnboardingDialog
      open={isBaasDialogOpen}
      onClose={() => setIsBaasDialogOpen(false)}
      onAccountOpened={completeOnboarding}
      onCreateCard={addCard}
      onViewAccount={() => { setIsBaasDialogOpen(false); navigate(ROUTES.banking.baasAccount(sageWalletOpenedAccount.id)); }}
      onViewCards={() => { setIsBaasDialogOpen(false); navigate(ROUTES.banking.baasCards(sageWalletOpenedAccount.id)); }}
    />
    <CreateLegacyBankAccountDialog open={isCreateOpen} copy={copy.createDialog} onClose={() => setCreateOpen(false)} onCreate={createAccount} />
  </Box>;
}
