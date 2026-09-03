import DateInput from "carbon-react/lib/components/date";
import Decimal from "carbon-react/lib/components/decimal";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import type { ProductOrServiceCategory } from "../../data/productsAndServices";
import {
  fullWidthFieldProps,
  RecordFormCell,
  RecordFormRow,
} from "../create-record/RecordFormLayout";

type CreateProductOrServiceFormFieldsProps = {
  code: string;
  name: string;
  category: ProductOrServiceCategory;
  releaseDate: string;
  priceWithDiscountGbp: string;
  status: string;
  onCodeChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onCategoryChange: (value: ProductOrServiceCategory) => void;
  onReleaseDateChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onStatusChange: (value: string) => void;
};

export default function CreateProductOrServiceFormFields({
  code,
  name,
  category,
  releaseDate,
  priceWithDiscountGbp,
  status,
  onCodeChange,
  onNameChange,
  onCategoryChange,
  onReleaseDateChange,
  onPriceChange,
  onStatusChange,
}: CreateProductOrServiceFormFieldsProps) {
  return (
    <div className="salesQuoteCreate__headerFields">
      <RecordFormRow>
        <RecordFormCell>
          <Textbox
            id="product-code"
            label="Code"
            value={code}
            onChange={(event) => onCodeChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id="product-name"
            label="Name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Select
            id="product-category"
            label="Category"
            value={category}
            onChange={(event) =>
              onCategoryChange(event.target.value as ProductOrServiceCategory)
            }
            {...fullWidthFieldProps}
          >
            <Option text="Product" value="Product" />
            <Option text="Service" value="Service" />
          </Select>
        </RecordFormCell>
      </RecordFormRow>

      <RecordFormRow>
        <RecordFormCell>
          <DateInput
            id="product-release-date"
            label="Release date"
            value={releaseDate}
            onChange={(event) => onReleaseDateChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Decimal
            id="product-price"
            label="Price with discount"
            value={priceWithDiscountGbp}
            precision={2}
            onChange={(event) => onPriceChange(event.target.value.formattedValue)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
        <RecordFormCell>
          <Textbox
            id="product-status"
            label="Status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            {...fullWidthFieldProps}
          />
        </RecordFormCell>
      </RecordFormRow>
    </div>
  );
}
