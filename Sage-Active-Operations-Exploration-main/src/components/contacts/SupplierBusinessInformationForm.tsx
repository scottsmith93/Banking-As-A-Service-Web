import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import { RadioButton, RadioButtonGroup } from "carbon-react/lib/components/radio-button";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import Typography from "carbon-react/lib/components/typography";
import type { Supplier, SupplierCustomerType, SupplierDetail } from "../../data/suppliers";

const countryOptions = [
  { text: "FR-FR", value: "FR-FR" },
  { text: "GB-GB", value: "GB-GB" },
  { text: "ES-ES", value: "ES-ES" },
] as const;

const languageOptions = [
  { text: "English", value: "English" },
  { text: "French", value: "French" },
  { text: "Spanish", value: "Spanish" },
] as const;

type SupplierBusinessInformationFormProps = {
  supplier: Supplier;
  detail: SupplierDetail;
};

export default function SupplierBusinessInformationForm({
  supplier,
  detail,
}: SupplierBusinessInformationFormProps) {
  const [customerType, setCustomerType] = useState<SupplierCustomerType>(detail.customerType);
  const [businessName, setBusinessName] = useState(supplier.name);
  const [tradeName, setTradeName] = useState(detail.tradeName);
  const [buyerReference, setBuyerReference] = useState(detail.buyerReference);
  const [country, setCountry] = useState(detail.country);
  const [nifNumber, setNifNumber] = useState(detail.nifNumber);
  const [euVatNumber, setEuVatNumber] = useState(detail.euVatNumber);
  const [language, setLanguage] = useState(detail.language);
  const [cnaeCode, setCnaeCode] = useState(detail.cnaeCode);
  const [category, setCategory] = useState(detail.category);

  return (
    <Box className="supplierDetail__panel">
      <Typography variant="h3" as="p" className="supplierDetail__panelHeading">
        Business information
      </Typography>

      <RadioButtonGroup
        name="customer-type"
        legend="Customer type"
        required
        value={customerType}
        onChange={(event) =>
          setCustomerType(event.target.value as SupplierCustomerType)
        }
      >
        <RadioButton
          id="customer-type-business"
          value="business"
          label="Business"
          inputHint="Companies, sole-traders and other organisations"
        />
        <RadioButton
          id="customer-type-individual"
          value="individual"
          label="Individual"
          inputHint="Private consumers"
        />
      </RadioButtonGroup>

      <Textbox
        id="supplier-code"
        label="Code"
        required
        readOnly
        value={supplier.supplierCode}
        onChange={() => {
          // PROTOTYPE: supplier code is system-assigned and not directly editable
        }}
      />

      <Textbox
        id="supplier-business-name"
        label="Business name"
        required
        value={businessName}
        onChange={(event) => setBusinessName(event.target.value)}
      />

      <Textbox
        id="supplier-trade-name"
        label="Trade name"
        value={tradeName}
        onChange={(event) => setTradeName(event.target.value)}
      />

      <Textbox
        id="supplier-buyer-reference"
        label="Buyer reference"
        value={buyerReference}
        onChange={(event) => setBuyerReference(event.target.value)}
      />

      <Select
        id="supplier-country"
        label="Country"
        value={country}
        onChange={(event) => setCountry(event.target.value as string)}
      >
        {countryOptions.map((option) => (
          <Option key={option.value} text={option.text} value={option.value} />
        ))}
      </Select>

      <Textbox
        id="supplier-nif-number"
        label="NIF number"
        value={nifNumber}
        onChange={(event) => setNifNumber(event.target.value)}
      />

      <Textbox
        id="supplier-eu-vat-number"
        label="EU VAT number"
        value={euVatNumber}
        onChange={(event) => setEuVatNumber(event.target.value)}
      />

      <Box>
        <Select
          id="supplier-language"
          label="Language"
          value={language}
          onChange={(event) => setLanguage(event.target.value as string)}
        >
          {languageOptions.map((option) => (
            <Option key={option.value} text={option.text} value={option.value} />
          ))}
        </Select>
        <Typography variant="small" as="p" className="supplierDetail__fieldHint">
          Applies to section titles and column headers in sales document PDFs.
        </Typography>
      </Box>

      <Textbox
        id="supplier-cnae-code"
        label="CNAE code"
        value={cnaeCode}
        onChange={(event) => setCnaeCode(event.target.value)}
      />

      <Select
        id="supplier-category"
        label="Category"
        value={category}
        onChange={(event) => setCategory(event.target.value as string)}
      >
        <Option text={detail.category} value={detail.category} />
      </Select>
    </Box>
  );
}
