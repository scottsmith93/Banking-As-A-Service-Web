import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Dialog from "carbon-react/lib/components/dialog";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import type { SageWalletCopy } from "./sageWalletTypes";

type SageWalletCardholderDialogProps = {
  open: boolean;
  copy: SageWalletCopy["card"]["cardholderDialog"];
  onCancel: () => void;
  onSave: (fullName: string) => void;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A second, smaller window on top of the wallet modal for adding a cardholder.
// The parent re-keys it on every open, so each visit starts with empty fields.
// PROTOTYPE: the new person only lives in this session; no invitation is sent.
export default function SageWalletCardholderDialog({ open, copy, onCancel, onSave }: SageWalletCardholderDialogProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [showErrors, setShowErrors] = useState(false);

  const nameError = showErrors && (!firstName.trim() || !lastName.trim()) ? copy.nameError : undefined;
  const emailError = showErrors && !EMAIL_PATTERN.test(email.trim()) ? copy.emailError : undefined;

  const save = () => {
    if (!firstName.trim() || !lastName.trim() || !EMAIL_PATTERN.test(email.trim())) {
      setShowErrors(true);
      return;
    }
    onSave(`${firstName.trim()} ${lastName.trim()}`);
  };

  return (
    <Dialog open={open} onCancel={onCancel} size="small" title={copy.title} className="sageWalletSubDialog"
      footer={<Box display="flex" justifyContent="flex-end" gap={2}>
        <Button variantType="tertiary" onClick={onCancel}>{copy.cancel}</Button>
        <Button variantType="primary" onClick={save}>{copy.save}</Button>
      </Box>}>
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="p" as="p">{copy.body}</Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Box flexGrow={1}><Textbox id="sage-wallet-new-first-name" label={copy.firstName} required value={firstName}
            error={nameError && !firstName.trim() ? nameError : undefined} onChange={event => setFirstName(event.target.value)} /></Box>
          <Box flexGrow={1}><Textbox id="sage-wallet-new-last-name" label={copy.lastName} required value={lastName}
            error={nameError && !lastName.trim() ? nameError : undefined} onChange={event => setLastName(event.target.value)} /></Box>
        </Box>
        <Textbox id="sage-wallet-new-email" label={copy.email} inputMode="email" autoComplete="email" required value={email} error={emailError}
          onChange={event => setEmail(event.target.value)} />
      </Box>
    </Dialog>
  );
}
