import Box from "carbon-react/lib/components/box";
import DateInput from "carbon-react/lib/components/date";
import { Option, Select } from "carbon-react/lib/components/select";
import Textbox from "carbon-react/lib/components/textbox";
import VerticalDivider from "carbon-react/lib/components/vertical-divider";
import DocumentHeaderCard from "../document-header/DocumentHeaderCard";
import { clients } from "../../data/clients";
import { quoteCountryOptions, quotePrefixOptions } from "../../data/salesQuoteForm";

type CreateSalesQuoteHeaderFieldsProps = {
  fieldIdPrefix?: string;
  dateLabel?: string;
  customerId: string;
  prefix: string;
  reference: string;
  quoteDate: string;
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  onCustomerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPrefixChange: (value: string) => void;
  onReferenceChange: (value: string) => void;
  onQuoteDateChange: (value: string) => void;
  onBusinessNameChange: (value: string) => void;
  onContactNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onCountryChange: (value: string) => void;
};

const fullWidthFieldProps = {
  maxWidth: "100%",
  inputWidth: 100,
};

export default function CreateSalesQuoteHeaderFields({
  fieldIdPrefix = "sales-quote",
  dateLabel = "Quote date",
  customerId,
  prefix,
  reference,
  quoteDate,
  businessName,
  contactName,
  email,
  phone,
  country,
  onCustomerChange,
  onPrefixChange,
  onReferenceChange,
  onQuoteDateChange,
  onBusinessNameChange,
  onContactNameChange,
  onEmailChange,
  onPhoneChange,
  onCountryChange,
}: CreateSalesQuoteHeaderFieldsProps) {
  return (
    <DocumentHeaderCard
      sections={[
        <Box
          key="document"
          className="salesQuoteCreate__formRow salesQuoteCreate__formRow--customer"
        >
          <Box className="salesQuoteCreate__formCell">
            <Select
              id={`${fieldIdPrefix}-customer`}
              label="Customer"
              placeholder="Select..."
              value={customerId}
              onChange={onCustomerChange}
              {...fullWidthFieldProps}
            >
              {clients.map((client) => (
                <Option key={client.id} text={client.name} value={client.id} />
              ))}
            </Select>
          </Box>

          <Box
            className="salesQuoteCreate__formCell salesQuoteCreate__customerDivider"
            px={2}
          >
            <VerticalDivider aria-hidden />
          </Box>

          <Box className="salesQuoteCreate__formCell">
            <Select
              id={`${fieldIdPrefix}-prefix`}
              label="Prefix"
              value={prefix}
              onChange={(event) => onPrefixChange(event.target.value)}
              {...fullWidthFieldProps}
            >
              {quotePrefixOptions.map((option) => (
                <Option key={option.value} text={option.text} value={option.value} />
              ))}
            </Select>
          </Box>

          <Box className="salesQuoteCreate__formCell">
            <Textbox
              id={`${fieldIdPrefix}-reference`}
              label="Reference"
              value={reference}
              onChange={(event) => onReferenceChange(event.target.value)}
              {...fullWidthFieldProps}
            />
          </Box>

          <Box className="salesQuoteCreate__formCell">
            <DateInput
              id={`${fieldIdPrefix}-date`}
              label={dateLabel}
              required
              value={quoteDate}
              onChange={(event) => onQuoteDateChange(event.target.value.formattedValue)}
            />
          </Box>
        </Box>,
        <Box
          key="contact"
          className="salesQuoteCreate__formRow salesQuoteCreate__formRow--contact"
        >
          <Box className="salesQuoteCreate__formCell">
            <Textbox
              id={`${fieldIdPrefix}-business-name`}
              label="Business name"
              required
              value={businessName}
              onChange={(event) => onBusinessNameChange(event.target.value)}
              {...fullWidthFieldProps}
            />
          </Box>
          <Box className="salesQuoteCreate__formCell">
            <Textbox
              id={`${fieldIdPrefix}-contact-name`}
              label="Name"
              value={contactName}
              onChange={(event) => onContactNameChange(event.target.value)}
              {...fullWidthFieldProps}
            />
          </Box>
          <Box className="salesQuoteCreate__formCell">
            <Textbox
              id={`${fieldIdPrefix}-email`}
              label="Email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              {...fullWidthFieldProps}
            />
          </Box>
          <Box className="salesQuoteCreate__formCell">
            <Textbox
              id={`${fieldIdPrefix}-phone`}
              label="Phone"
              value={phone}
              onChange={(event) => onPhoneChange(event.target.value)}
              {...fullWidthFieldProps}
            />
          </Box>
          <Box className="salesQuoteCreate__formCell">
            <Select
              id={`${fieldIdPrefix}-country`}
              label="Country"
              required
              value={country}
              onChange={(event) => onCountryChange(event.target.value)}
              {...fullWidthFieldProps}
            >
              {quoteCountryOptions.map((option) => (
                <Option key={option.value} text={option.text} value={option.value} />
              ))}
            </Select>
          </Box>
        </Box>,
      ]}
    />
  );
}
