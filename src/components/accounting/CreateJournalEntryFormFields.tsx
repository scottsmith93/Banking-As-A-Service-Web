import DateInput from "carbon-react/lib/components/date";
import Decimal from "carbon-react/lib/components/decimal";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import {
  fullWidthFieldProps,
  RecordFormCell,
  RecordFormRow,
} from "../create-record/RecordFormLayout";

const journalOptions = ["VTE", "ACH", "BNK"];
const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type CreateJournalEntryFormFieldsProps = {
  number: string;
  journal: string;
  date: string;
  documentNumber: string;
  documentDate: string;
  status: string;
  account: string;
  thirdParty: string;
  description: string;
  debitGbp: string;
  creditGbp: string;
  currency: string;
  month: string;
  onNumberChange: (value: string) => void;
  onJournalChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onDocumentNumberChange: (value: string) => void;
  onDocumentDateChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onAccountChange: (value: string) => void;
  onThirdPartyChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onDebitChange: (value: string) => void;
  onCreditChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  onMonthChange: (value: string) => void;
};

export default function CreateJournalEntryFormFields({
  number,
  journal,
  date,
  documentNumber,
  documentDate,
  status,
  account,
  thirdParty,
  description,
  debitGbp,
  creditGbp,
  currency,
  month,
  onNumberChange,
  onJournalChange,
  onDateChange,
  onDocumentNumberChange,
  onDocumentDateChange,
  onStatusChange,
  onAccountChange,
  onThirdPartyChange,
  onDescriptionChange,
  onDebitChange,
  onCreditChange,
  onCurrencyChange,
  onMonthChange,
}: CreateJournalEntryFormFieldsProps) {
  return (
    <div className="salesQuoteCreate__headerFields">
      <RecordFormRow>
        <RecordFormCell>
          <Textbox
            id="journal-entry-number"
            label="Number"
            value={number}
            onChange={(event) => onNumberChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Select
            id="journal-entry-journal"
            label="Journal"
            placeholder="Select..."
            value={journal}
            onChange={(event) => onJournalChange(event.target.value)}
            {...fullWidthFieldProps}
          >
            {journalOptions.map((option) => (
              <Option key={option} text={option} value={option} />
            ))}
          </Select>
        </RecordFormCell>
        <RecordFormCell>
          <DateInput
            id="journal-entry-date"
            label="Date"
            value={date}
            onChange={(event) => onDateChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
      </RecordFormRow>

      <RecordFormRow>
        <RecordFormCell>
          <Textbox
            id="journal-entry-document-number"
            label="Document number"
            value={documentNumber}
            onChange={(event) => onDocumentNumberChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <DateInput
            id="journal-entry-document-date"
            label="Document date"
            value={documentDate}
            onChange={(event) => onDocumentDateChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id="journal-entry-status"
            label="Status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
      </RecordFormRow>

      <RecordFormRow>
        <RecordFormCell>
          <Textbox
            id="journal-entry-account"
            label="Account"
            value={account}
            onChange={(event) => onAccountChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id="journal-entry-third-party"
            label="Third party"
            value={thirdParty}
            onChange={(event) => onThirdPartyChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id="journal-entry-description"
            label="Description"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
      </RecordFormRow>

      <RecordFormRow>
        <RecordFormCell>
          <Decimal
            id="journal-entry-debit"
            label="Debit"
            value={debitGbp}
            precision={2}
            onChange={(event) => onDebitChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Decimal
            id="journal-entry-credit"
            label="Credit"
            value={creditGbp}
            precision={2}
            onChange={(event) => onCreditChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Select
            id="journal-entry-currency"
            label="Currency"
            value={currency}
            onChange={(event) => onCurrencyChange(event.target.value)}
            {...fullWidthFieldProps}
          >
            <Option text="EUR" value="EUR" />
            <Option text="EUR" value="EUR" />
            <Option text="USD" value="USD" />
          </Select>
        </RecordFormCell>
      </RecordFormRow>

      <RecordFormRow>
        <RecordFormCell>
          <Select
            id="journal-entry-month"
            label="Month"
            value={month}
            onChange={(event) => onMonthChange(event.target.value)}
            {...fullWidthFieldProps}
          >
            {monthOptions.map((option) => (
              <Option key={option} text={option} value={option} />
            ))}
          </Select>
        </RecordFormCell>
      </RecordFormRow>
    </div>
  );
}
