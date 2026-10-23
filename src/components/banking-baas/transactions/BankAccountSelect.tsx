import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { Option, Select } from "carbon-react/lib/components/select";
import BankLogo from "../../banking/BankLogo";
import { connectedBankAccounts, connectedBanks } from "../../../data/bankAccountConnections";
import { stagedBaasAccounts } from "../../../data/bankingBaas";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { interpolate } from "../../../utils/interpolate";

type AccountChoice = { id: string; name: string; bank: string; logo?: string; reference: string };
type Props = { accountId: string; accounts: { id: string; name: string }[]; onChange: (accountId: string) => void };

export default function BankAccountSelect({ accountId, accounts, onChange }: Props) {
  const { copy } = useTransactionPresentation();
  const [draft, setDraft] = useState<{ source: string; value: string } | null>(null);
  const [decorationHost, setDecorationHost] = useState<Element | null>(null);
  const attachDecoration = useCallback((input: HTMLInputElement | null) => {
    setDecorationHost(input?.closest('[data-role="input-text-container"]') ?? null);
  }, []);
  const choices: AccountChoice[] = accounts.map(account => {
    const sage = stagedBaasAccounts.find(item => item.id === account.id);
    const connected = connectedBankAccounts.find(item => item.id === account.id);
    const bank = connectedBanks.find(item => item.id === connected?.bankId);
    return { ...account, bank: sage ? copy.movements.sageBank : bank?.name ?? copy.movements.bank, logo: sage ? "/banking/sage-demo-bank-icon.svg" : bank?.logo, reference: sage ? `•••• ${sage.accountEnding}` : connected?.accountNumber ?? "" };
  });
  const value = draft?.source === accountId ? draft.value : accountId || "all-accounts";
  const selected = choices.find(account => account.id === value);
  const optionLabel = (account: AccountChoice) => interpolate(account.bank === account.name ? copy.movements.accountOptionSameBank : copy.movements.accountOption, { bank: account.bank, account: account.name, reference: account.reference });
  return <div className="bankMovementAccountPicker">
    <Select ref={attachDecoration} id="bank-movements-account" label={copy.movements.account} size="small" value={value}
      onBlur={() => setDraft(null)}
      onKeyDown={event => { if (event.key === "Escape") setDraft(null); }}
      onChange={event => {
        // Carbon arrow keys are provisional: navigate only on an explicit committed selection.
        if (!("selectionConfirmed" in event) || event.selectionConfirmed) {
          setDraft(null); onChange(event.target.value === "all-accounts" ? "" : event.target.value);
        } else setDraft({ source: accountId, value: event.target.value });
      }}>
      <Option value="all-accounts" text={copy.movements.allAccounts}>
        <div className="bankMovementAccountOption"><BankLogo size="small" /><span>{copy.movements.allAccounts}</span></div>
      </Option>
      {choices.map(account => <Option key={account.id} value={account.id} text={optionLabel(account)} aria-label={optionLabel(account)}>
        <div className="bankMovementAccountOption">
          <BankLogo src={account.logo} size="small" />
          <span><strong>{account.bank}</strong><span>{account.name} · {account.reference}</span></span>
        </div>
      </Option>)}
    </Select>
    {/* Carbon has no leading image slot. Place the read-only decoration inside its
        positioned input layer so it survives the open-menu stacking context.
        This adapter uses Carbon's input ref/data-role, never mutates focus/DOM,
        and should become a native leading-image slot if Carbon adds one. */}
    {decorationHost && createPortal(<span className="bankMovementAccountPicker__mark" aria-hidden="true"><BankLogo src={selected?.logo} size="small" /></span>, decorationHost)}
  </div>;
}
