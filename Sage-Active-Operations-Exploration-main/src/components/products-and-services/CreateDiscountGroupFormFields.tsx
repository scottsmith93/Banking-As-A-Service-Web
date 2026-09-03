import { Checkbox } from "carbon-react/lib/components/checkbox";
import DateInput from "carbon-react/lib/components/date";
import Textbox from "carbon-react/lib/components/textbox";
import {
  fullWidthFieldProps,
  RecordFormCell,
  RecordFormRow,
} from "../create-record/RecordFormLayout";

type CreateDiscountGroupFormFieldsProps = {
  code: string;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
  onCodeChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onActiveChange: (value: boolean) => void;
};

export default function CreateDiscountGroupFormFields({
  code,
  name,
  startDate,
  endDate,
  active,
  onCodeChange,
  onNameChange,
  onStartDateChange,
  onEndDateChange,
  onActiveChange,
}: CreateDiscountGroupFormFieldsProps) {
  return (
    <div className="salesQuoteCreate__headerFields">
      <RecordFormRow>
        <RecordFormCell>
          <Textbox
            id="discount-group-code"
            label="Code"
            value={code}
            onChange={(event) => onCodeChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id="discount-group-name"
            label="Name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Checkbox
            id="discount-group-active"
            name="discount-group-active"
            label="Active"
            checked={active}
            onChange={() => onActiveChange(!active)}
          />
        </RecordFormCell>
      </RecordFormRow>

      <RecordFormRow>
        <RecordFormCell>
          <DateInput
            id="discount-group-start-date"
            label="Start date"
            value={startDate}
            onChange={(event) => onStartDateChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <DateInput
            id="discount-group-end-date"
            label="End date"
            value={endDate}
            onChange={(event) => onEndDateChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
      </RecordFormRow>
    </div>
  );
}
