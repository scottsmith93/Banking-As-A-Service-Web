import { useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Icon from "carbon-react/lib/components/icon";
import { ActionPopover, ActionPopoverItem } from "carbon-react/lib/components/action-popover";
import Pill from "carbon-react/lib/components/pill";
import Typography from "carbon-react/lib/components/typography";
import { useLanguage } from "../../context/useLanguage";
import { useBankingTransactions } from "../../context/useBankingTransactions";
import { getLocale, getLocaleCode } from "../../locales";
import { interpolate } from "../../utils/interpolate";
import { needsJustification } from "../../utils/transactionMatching";
import type { BaaSAccount } from "../../data/bankingBaas";
import type { ConnectedBankAccount } from "../../data/bankAccountConnections";

import { bankMovementsHref } from "../../utils/bankMovementNavigation";

type Props = { account: BaaSAccount | ConnectedBankAccount; lastSyncedAt: string | null; syncing: boolean; onSync: () => void };
export default function BaasBankAccountCard({ account, lastSyncedAt, syncing, onSync }: Props) {
  const { language } = useLanguage();
  const { transactions } = useBankingTransactions();
  const navigate = useNavigate();
  const copy = getLocale(language).bankingBaas;
  const locale = getLocaleCode(language);
  const sage = "status" in account;
  const pending = sage && account.status === "pending";
  const manual = !sage && account.bankId === "other";
  const count = transactions.filter(row => row.accountId === account.id && needsJustification(row)).length;
  const href = `/banking/baas/accounts/${account.id}`;
  const lastSync = lastSyncedAt ? new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" }).format(new Date(lastSyncedAt)) : copy.list.notSynced;
  return <article className={`bankAccountStackCard${sage ? " bankAccountStackCard--sage" : ""}`} aria-label={account.name}>
    <Box className="bankAccountStackCard__identity" display="flex" flexDirection="column" gap={1}>
      <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <Typography variant="strong" as="h3">{account.name}</Typography>
        {pending && <Pill pillRole="status" size="S" colorVariant="neutral">{copy.accounts.pending}</Pill>}
      </Box>
      <Typography variant="small" as="p" className="bankAccountStackCard__muted">{sage ? interpolate(copy.list.accountReference, { lastFour: account.accountEnding }) : account.accountNumber}</Typography>
      <Box display="flex" gap={2} flexWrap="wrap" alignItems="center" className="bankAccountStackCard__sync">
        {sage && !pending && <span className="bankAccountStackCard__realtime"><Icon type="flash" aria-hidden />{copy.list.realTimeSync}</span>}
        <Typography variant="small" as="p" role={syncing ? "status" : undefined}>{syncing ? copy.list.syncing : interpolate(copy.list.lastSync, { timestamp: lastSync })}</Typography>
      </Box>
    </Box>
    <Box className="bankAccountStackCard__task" display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
      {!pending && !manual && (count > 0 ? <Button variantType="secondary" size="small" onClick={() => navigate(bankMovementsHref(account.id, { view: "needsAction" }))}>{interpolate(copy.list.matchTransactions, { count })}</Button> : <Typography variant="small" as="p" className="bankAccountStackCard__muted">{copy.list.upToDate}</Typography>)}
      {!pending && !manual && <Button variantType="tertiary" size="small" onClick={() => navigate(sage ? href : bankMovementsHref(account.id))}>{sage ? copy.accounts.viewAccount : copy.list.viewTransactions}</Button>}
    </Box>
    <Box className="bankAccountStackCard__balance" display="flex" flexDirection="column" alignItems="flex-end" gap={1}>
      <Typography variant="small" as="p" className="bankAccountStackCard__muted">{copy.accounts.balance}</Typography>
      <Typography variant="h3" as="p" className="numericValue">{new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" }).format(account.balanceEur)}</Typography>
    </Box>
    <div className="bankAccountStackCard__menu">{!pending && !manual && <ActionPopover aria-label={interpolate(copy.list.accountActions, { account: account.name })}>
      <ActionPopoverItem icon="refresh" disabled={syncing} onClick={onSync}>{copy.list.syncAccount}</ActionPopoverItem>
    </ActionPopover>}</div>
  </article>;
}
