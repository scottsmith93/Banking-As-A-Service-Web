import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Loader from "carbon-react/lib/components/loader";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import BaasBankAccountCard from "../../components/banking-baas/BaasBankAccountCard";
import BaasOnboardingDialog from "../../components/banking-baas/BaasOnboardingDialog";
import BaasPromotionBanner from "../../components/banking-baas/BaasPromotionBanner";
import CreateLegacyBankAccountDialog from "../../components/banking-baas/CreateLegacyBankAccountDialog";
import BankBrandHeading from "../../components/banking-baas/BankBrandHeading";
import { connectedBanks, connectedBankAccounts, type ConnectedBankAccount } from "../../data/bankAccountConnections";
import type { LegacyBankAccount } from "../../data/bankingBaas";
import { useBankingBaas } from "../../context/useBankingBaas";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";
import { interpolate } from "../../utils/interpolate";
import "../../components/banking-baas/bank-account-stack.css";

export default function BankingPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { accounts, completeOnboarding } = useBankingBaas();
  const copy = getLocale(language).bankingBaas;
  const [search, setSearch] = useState("");
  const [isBaasDialogOpen, setIsBaasDialogOpen] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [otherAccounts, setOtherAccounts] = useState<ConnectedBankAccount[]>([]);
  const [syncTimes, setSyncTimes] = useState<Record<string, string>>({});
  const [syncingIds, setSyncingIds] = useState<string[]>([]);
  const [syncMessage, setSyncMessage] = useState("");
  const allConnected = [...connectedBankAccounts, ...otherAccounts];
  const query = search.trim().toLocaleLowerCase();
  const matches = (name: string, bank = "") => `${name} ${bank}`.toLocaleLowerCase().includes(query);
  const sageAccounts = accounts.filter(row => matches(row.name, copy.sageAccounts));
  const count = sageAccounts.length + allConnected.filter(row => matches(row.name, connectedBanks.find(bank => bank.id === row.bankId)?.name)).length;
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
      <Button variantType="secondary" iconType="refresh" iconPosition="before" disabled={syncingIds.length > 0} onClick={() => void sync([...connectedBankAccounts.map(row => row.id), ...accounts.filter(row => row.status === "active").map(row => row.id)])}>{copy.syncAll}</Button>
    </Box>
    <div className="bankAccountStack">
      <Box className="bankAccountStack__toolbar" display="flex" justifyContent="space-between" alignItems="flex-end" gap={3}>
        <Button variantType="primary" iconType="add" iconPosition="before" onClick={() => setCreateOpen(true)}>{copy.create}</Button>
        <Textbox id="bank-account-stack-search" label={copy.searchLabel} placeholder={copy.searchPlaceholder} inputIcon="search" value={search} onChange={event => setSearch(event.target.value)} />
      </Box>
      <section className="bankAccountGroup" aria-labelledby="sage-bank-accounts-title">
        <Box display="flex" gap={1} alignItems="center">
          <img className="bankAccountGroup__sageLogo" src="/banking/sage-demo-bank-icon.svg" alt="" />
          <Typography variant="h2" as="h2" id="sage-bank-accounts-title">{copy.sageAccounts}</Typography>
        </Box>
        {sageAccounts.map(account => <BaasBankAccountCard key={account.id} account={account} lastSyncedAt={syncTimes[account.id] ?? (account.status === "active" ? "2026-10-21T22:54:00Z" : null)} syncing={syncingIds.includes(account.id)} onSync={() => void sync([account.id])} />)}
        <BaasPromotionBanner copy={copy.promotion} onOpen={() => setIsBaasDialogOpen(true)} />
      </section>
      {connectedBanks.map(bank => {
        const rows = allConnected.filter(row => row.bankId === bank.id && matches(row.name, bank.name));
        return rows.length > 0 && <section className="bankAccountGroup" key={bank.id} aria-labelledby={`bank-heading-${bank.id}`}>
          <BankBrandHeading bank={bank} />
          {rows.map(account => <BaasBankAccountCard key={account.id} account={account} lastSyncedAt={syncTimes[account.id] ?? account.lastSyncedAt} syncing={syncingIds.includes(account.id)} onSync={() => void sync([account.id])} />)}
        </section>;
      })}
      {otherAccounts.filter(row => matches(row.name)).length > 0 && <section className="bankAccountGroup" aria-labelledby="other-bank-accounts-title">
        <Typography variant="h2" as="h2" id="other-bank-accounts-title">{copy.list.otherAccounts}</Typography>
        {otherAccounts.filter(row => matches(row.name)).map(account => <BaasBankAccountCard key={account.id} account={account} lastSyncedAt={null} syncing={false} onSync={() => {}} />)}
      </section>}
      {query && count === 0 && <Box display="flex" flexDirection="column" gap={2} role="status"><Typography variant="p" as="p">{copy.list.noResults}</Typography><Button variantType="tertiary" onClick={() => setSearch("")}>{copy.list.clearSearch}</Button></Box>}
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
        <Typography variant="small" as="p">{interpolate(copy.items, { count })}</Typography>
        <Typography variant="small" as="p" className="bankAccountStackCard__muted">{copy.list.demoConnections}</Typography>
      </Box>
      {syncingIds.length > 0 && <div role="status" aria-label={copy.list.syncing}><Loader size="small" /></div>}
      <span role="status" className="bankAccountStack__live">{syncMessage}</span>
    </div>
    <BaasOnboardingDialog open={isBaasDialogOpen} copy={copy.onboarding} onClose={() => setIsBaasDialogOpen(false)} onComplete={completeOnboarding} onManageBank={() => { setIsBaasDialogOpen(false); navigate("/banking/baas/accounts/sage-operating-account"); }} />
    <CreateLegacyBankAccountDialog open={isCreateOpen} copy={copy.createDialog} onClose={() => setCreateOpen(false)} onCreate={createAccount} />
  </Box>;
}
