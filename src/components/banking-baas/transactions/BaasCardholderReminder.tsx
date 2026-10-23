import { useEffect, useRef, useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Loader from "carbon-react/lib/components/loader";
import Message from "carbon-react/lib/components/message";
import Typography from "carbon-react/lib/components/typography";
import type { BankTransaction } from "../../../data/bankingTransactions";
import { useTransactionPresentation } from "../../../hooks/useTransactionPresentation";
import { interpolate } from "../../../utils/interpolate";
import { needsInvoice } from "../../../utils/transactionMatching";

export default function BaasCardholderReminder({ transaction }: { transaction: BankTransaction }) {
  const { copy } = useTransactionPresentation();
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  if (!needsInvoice(transaction) || !transaction.cardholder) return null;
  const simulateReminder = () => {
    if (status !== "idle") return;
    setStatus("sending");
    // PROTOTYPE: local non-fallible simulation only. No message, email or API
    // request is sent. Replace with the notification API and delivery/retry states.
    timer.current = setTimeout(() => setStatus("sent"), 650);
  };
  const buttonLabel = status === "sending" ? copy.reminder.sending : status === "sent" ? copy.reminder.simulated : copy.reminder.send;
  return <Box className="baasCardholderReminder" display="flex" flexDirection="column" gap={1}>
    <Button variantType="secondary" fullWidth noWrap={false} iconType={status === "idle" ? "email" : undefined} iconPosition="before" disabled={status !== "idle"} onClick={simulateReminder} aria-label={buttonLabel} aria-describedby={`reminder-note-${transaction.id}`}>
      {status === "sending" && <Loader isInsideButton size="small" loaderLabel={copy.reminder.sending} />}
      {buttonLabel}
    </Button>
    <Typography variant="small" as="p" id={`reminder-note-${transaction.id}`}>{interpolate(copy.reminder.recipient, { cardholder: transaction.cardholder })}</Typography>
    <Typography variant="small" as="p">{copy.reminder.demoHint}</Typography>
    <div role="status" aria-live="polite">{status === "sent" && <Message variant="success-subtle">{interpolate(copy.reminder.confirmation, { cardholder: transaction.cardholder })}</Message>}</div>
  </Box>;
}
