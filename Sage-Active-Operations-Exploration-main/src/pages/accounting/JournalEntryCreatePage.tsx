import { useState } from "react";
import CreateJournalEntryFormFields from "../../components/accounting/CreateJournalEntryFormFields";
import CreateRecordPage from "../../components/create-record/CreateRecordPage";
import { ROUTES } from "../../routes";

export default function JournalEntryCreatePage() {
  const [number, setNumber] = useState("");
  const [journal, setJournal] = useState("");
  const [date, setDate] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const [status, setStatus] = useState("");
  const [account, setAccount] = useState("");
  const [thirdParty, setThirdParty] = useState("");
  const [description, setDescription] = useState("");
  const [debitGbp, setDebitGbp] = useState("");
  const [creditGbp, setCreditGbp] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [month, setMonth] = useState("June");

  return (
    <CreateRecordPage title="Journal entry" listRoute={ROUTES.accounting.journalEntries}>
      <CreateJournalEntryFormFields
        number={number}
        journal={journal}
        date={date}
        documentNumber={documentNumber}
        documentDate={documentDate}
        status={status}
        account={account}
        thirdParty={thirdParty}
        description={description}
        debitGbp={debitGbp}
        creditGbp={creditGbp}
        currency={currency}
        month={month}
        onNumberChange={setNumber}
        onJournalChange={setJournal}
        onDateChange={setDate}
        onDocumentNumberChange={setDocumentNumber}
        onDocumentDateChange={setDocumentDate}
        onStatusChange={setStatus}
        onAccountChange={setAccount}
        onThirdPartyChange={setThirdParty}
        onDescriptionChange={setDescription}
        onDebitChange={setDebitGbp}
        onCreditChange={setCreditGbp}
        onCurrencyChange={setCurrency}
        onMonthChange={setMonth}
      />
    </CreateRecordPage>
  );
}
