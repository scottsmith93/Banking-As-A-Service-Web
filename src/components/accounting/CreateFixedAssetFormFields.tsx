import DateInput from "carbon-react/lib/components/date";
import Decimal from "carbon-react/lib/components/decimal";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import {
  fullWidthFieldProps,
  RecordFormCell,
  RecordFormRow,
} from "../create-record/RecordFormLayout";

const categoryOptions = [
  "TANGIBLE - Other tangible fixed assets",
  "TANGIBLE - Computer equipment",
  "TANGIBLE - Motor vehicles",
  "INTANGIBLE - Software licences",
];

type CreateFixedAssetFormFieldsProps = {
  code: string;
  name: string;
  category: string;
  acquisitionDate: string;
  currentValueGbp: string;
  onCodeChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onAcquisitionDateChange: (value: string) => void;
  onCurrentValueChange: (value: string) => void;
};

export default function CreateFixedAssetFormFields({
  code,
  name,
  category,
  acquisitionDate,
  currentValueGbp,
  onCodeChange,
  onNameChange,
  onCategoryChange,
  onAcquisitionDateChange,
  onCurrentValueChange,
}: CreateFixedAssetFormFieldsProps) {
  return (
    <div className="salesQuoteCreate__headerFields">
      <RecordFormRow>
        <RecordFormCell>
          <Textbox
            id="fixed-asset-code"
            label="Code"
            value={code}
            onChange={(event) => onCodeChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id="fixed-asset-name"
            label="Fixed asset name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Select
            id="fixed-asset-category"
            label="Category"
            placeholder="Select..."
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            {...fullWidthFieldProps}
          >
            {categoryOptions.map((option) => (
              <Option key={option} text={option} value={option} />
            ))}
          </Select>
        </RecordFormCell>
      </RecordFormRow>

      <RecordFormRow>
        <RecordFormCell>
          <DateInput
            id="fixed-asset-acquisition-date"
            label="Acquisition date"
            value={acquisitionDate}
            onChange={(event) => onAcquisitionDateChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Decimal
            id="fixed-asset-current-value"
            label="Current value"
            value={currentValueGbp}
            precision={2}
            onChange={(event) => onCurrentValueChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
      </RecordFormRow>
    </div>
  );
}
