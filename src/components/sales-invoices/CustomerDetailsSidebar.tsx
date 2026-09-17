import Box from "carbon-react/lib/components/box";
import Sidebar from "carbon-react/lib/components/sidebar";
import Typography from "carbon-react/lib/components/typography";
import { useLanguage } from "../../context/useLanguage";
import type { Customer } from "../../data/customers";
import { getLocale } from "../../locales";
import { formatEur } from "../../utils/formatCurrency";

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <Box className="customerDetailsSidebar__row">
      <Typography variant="small" as="p" className="customerDetailsSidebar__rowLabel">
        {label}
      </Typography>
      <Typography variant="p" as="p" className="customerDetailsSidebar__rowValue">
        {value}
      </Typography>
    </Box>
  );
}

type CustomerDetailsSidebarProps = {
  customer: Customer | undefined;
  open: boolean;
  onCancel: () => void;
};

export default function CustomerDetailsSidebar({
  customer,
  open,
  onCancel,
}: CustomerDetailsSidebarProps) {
  const { language } = useLanguage();
  const copy = getLocale(language).customerManagement;

  return (
    <Sidebar
      open={open}
      onCancel={onCancel}
      position="right"
      size="small"
      header={customer?.name ?? copy.details.title}
      aria-label={copy.details.title}
    >
      {customer && (
        <Box className="customerDetailsSidebar__content">
          <DetailRow label={copy.columns.code} value={customer.customerCode} />
          <DetailRow label={copy.form.fields.contactName} value={customer.contactName} />
          <DetailRow label={copy.columns.email} value={customer.email} />
          <DetailRow label={copy.form.fields.phone} value={customer.phone} />
          <DetailRow label={copy.form.fields.town} value={customer.town} />
          <DetailRow
            label={copy.columns.balanceDue}
            value={formatEur(customer.balanceDueEur, language)}
          />
          <DetailRow
            label={copy.columns.status}
            value={copy.statuses[customer.status]}
          />
        </Box>
      )}
    </Sidebar>
  );
}
