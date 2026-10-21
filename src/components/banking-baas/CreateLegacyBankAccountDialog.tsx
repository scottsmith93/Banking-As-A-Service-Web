import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Dialog from "carbon-react/lib/components/dialog";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import type { LegacyBankAccount } from "../../data/bankingBaas";

type CreateLegacyBankAccountDialogProps = {
  open: boolean;
  copy: {
    title: string;
    description: string;
    accountName: string;
    accountNumber: string;
    ledgerAccount: string;
    cancel: string;
    create: string;
  };
  onClose: () => void;
  onCreate: (account: LegacyBankAccount) => void;
};

export default function CreateLegacyBankAccountDialog({
  open,
  copy,
  onClose,
  onCreate,
}: CreateLegacyBankAccountDialogProps) {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ledgerAccount, setLedgerAccount] = useState("");

  const handleClose = () => {
    setName("");
    setAccountNumber("");
    setLedgerAccount("");
    onClose();
  };

  const handleCreate = () => {
    if (!name.trim() || !ledgerAccount.trim()) return;

    onCreate({
      id: `legacy-${Date.now()}`,
      name: name.trim(),
      accountNumber: accountNumber.trim(),
      ledgerAccount: ledgerAccount.trim(),
      balanceEur: 0,
      lastUpdated: "Not yet synced",
      kind: "bank",
    });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onCancel={handleClose}
      title={copy.title}
      size="medium"
      footer={
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variantType="secondary" onClick={handleClose}>{copy.cancel}</Button>
          <Button variantType="primary" onClick={handleCreate}>{copy.create}</Button>
        </Box>
      }
    >
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="p" as="p">{copy.description}</Typography>
        <Textbox id="legacy-bank-name" label={copy.accountName} required value={name} onChange={(event) => setName(event.target.value)} />
        <Textbox id="legacy-bank-number" label={copy.accountNumber} value={accountNumber} onChange={(event) => setAccountNumber(event.target.value)} />
        <Textbox id="legacy-bank-ledger" label={copy.ledgerAccount} required value={ledgerAccount} onChange={(event) => setLedgerAccount(event.target.value)} />
      </Box>
    </Dialog>
  );
}
