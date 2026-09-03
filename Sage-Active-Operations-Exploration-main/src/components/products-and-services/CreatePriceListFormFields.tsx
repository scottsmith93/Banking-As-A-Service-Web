import { Checkbox } from "carbon-react/lib/components/checkbox";
import DateInput from "carbon-react/lib/components/date";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import type { PriceListAdjustmentType } from "../../data/priceLists";
import {
  fullWidthFieldProps,
  RecordFormCell,
  RecordFormRow,
} from "../create-record/RecordFormLayout";

type CreatePriceListFormFieldsProps = {
  code: string;
  name: string;
  startDate: string;
  endDate: string;
  adjustmentType: PriceListAdjustmentType;
  active: boolean;
  onCodeChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onAdjustmentTypeChange: (value: PriceListAdjustmentType) => void;
  onActiveChange: (value: boolean) => void;
};

export default function CreatePriceListFormFields({
  code,
  name,
  startDate,
  endDate,
  adjustmentType,
  active,
  onCodeChange,
  onNameChange,
  onStartDateChange,
  onEndDateChange,
  onAdjustmentTypeChange,
  onActiveChange,
}: CreatePriceListFormFieldsProps) {
  return (
    <div className="salesQuoteCreate__headerFields">
      <RecordFormRow>
        <RecordFormCell>
          <Textbox
            id="price-list-code"
            label="Code"
            value={code}
            onChange={(event) => onCodeChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id="price-list-name"
            label="Name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Select
            id="price-list-adjustment-type"
            label="Adjustment type"
            value={adjustmentType}
            onChange={(event) =>
              onAdjustmentTypeChange(event.target.value as PriceListAdjustmentType)
            }
            {...fullWidthFieldProps}
          >
            <Option text="Price" value="Price" />
            <Option text="Discount" value="Discount" />
          </Select>
        </RecordFormCell>
      </RecordFormRow>

      <RecordFormRow>
        <RecordFormCell>
          <DateInput
            id="price-list-start-date"
            label="Start date"
            value={startDate}
            onChange={(event) => onStartDateChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <DateInput
            id="price-list-end-date"
            label="End date"
            value={endDate}
            onChange={(event) => onEndDateChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Checkbox
            id="price-list-active"
            name="price-list-active"
            label="Active"
            checked={active}
            onChange={() => onActiveChange(!active)}
          />
        </RecordFormCell>
      </RecordFormRow>
    </div>
  );
}
