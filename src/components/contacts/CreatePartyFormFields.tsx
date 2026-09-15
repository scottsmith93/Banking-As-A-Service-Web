import DateInput from "carbon-react/lib/components/date";
import Decimal from "carbon-react/lib/components/decimal";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import {
  fullWidthFieldProps,
  RecordFormCell,
  RecordFormRow,
} from "../create-record/RecordFormLayout";

type PartyStatus = "active" | "inactive";

type CreatePartyFormFieldsProps = {
  fieldIdPrefix: string;
  codeLabel: string;
  nameLabel: string;
  balanceLabel: string;
  showLastActivity?: boolean;
  code: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  town: string;
  status: PartyStatus;
  balanceGbp: string;
  lastActivity: string;
  onCodeChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onContactNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onTownChange: (value: string) => void;
  onStatusChange: (value: PartyStatus) => void;
  onBalanceChange: (value: string) => void;
  onLastActivityChange: (value: string) => void;
};

export default function CreatePartyFormFields({
  fieldIdPrefix,
  codeLabel,
  nameLabel,
  balanceLabel,
  showLastActivity = true,
  code,
  name,
  contactName,
  email,
  phone,
  town,
  status,
  balanceGbp,
  lastActivity,
  onCodeChange,
  onNameChange,
  onContactNameChange,
  onEmailChange,
  onPhoneChange,
  onTownChange,
  onStatusChange,
  onBalanceChange,
  onLastActivityChange,
}: CreatePartyFormFieldsProps) {
  return (
    <div className="salesQuoteCreate__headerFields">
      <RecordFormRow>
        <RecordFormCell>
          <Textbox
            id={`${fieldIdPrefix}-code`}
            label={codeLabel}
            value={code}
            onChange={(event) => onCodeChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id={`${fieldIdPrefix}-name`}
            label={nameLabel}
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id={`${fieldIdPrefix}-contact`}
            label="Contact"
            value={contactName}
            onChange={(event) => onContactNameChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
      </RecordFormRow>

      <RecordFormRow>
        <RecordFormCell>
          <Textbox
            id={`${fieldIdPrefix}-email`}
            label="Email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id={`${fieldIdPrefix}-phone`}
            label="Phone"
            value={phone}
            onChange={(event) => onPhoneChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id={`${fieldIdPrefix}-town`}
            label="Town"
            value={town}
            onChange={(event) => onTownChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
      </RecordFormRow>

      <RecordFormRow>
        <RecordFormCell>
          <Select
            id={`${fieldIdPrefix}-status`}
            label="Status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value as PartyStatus)}
            {...fullWidthFieldProps}
          >
            <Option text="Active" value="active" />
            <Option text="Inactive" value="inactive" />
          </Select>
        </RecordFormCell>
        <RecordFormCell>
          <Decimal
            id={`${fieldIdPrefix}-balance`}
            label={balanceLabel}
            value={balanceGbp}
            precision={2}
            onChange={(event) => onBalanceChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        {showLastActivity && (
          <RecordFormCell>
            <DateInput
              id={`${fieldIdPrefix}-last-activity`}
              label="Last activity"
              value={lastActivity}
              onChange={(event) => onLastActivityChange(event.target.value.formattedValue)}
              {...fullWidthFieldProps}
            />
          </RecordFormCell>
        )}
      </RecordFormRow>
    </div>
  );
}
