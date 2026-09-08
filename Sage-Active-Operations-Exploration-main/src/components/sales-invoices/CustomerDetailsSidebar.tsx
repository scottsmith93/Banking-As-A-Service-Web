import Box from "carbon-react/lib/components/box";
import Sidebar from "carbon-react/lib/components/sidebar";
import Typography from "carbon-react/lib/components/typography";
import type { Customer } from "../../data/customers";

const gbpFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

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
  return (
    <Sidebar
      open={open}
      onCancel={onCancel}
      position="right"
      size="small"
      header={customer?.name ?? "Customer details"}
      aria-label="Customer details"
    >
      {customer && (
        <Box className="customerDetailsSidebar__content">
          <DetailRow label="Customer code" value={customer.customerCode} />
          <DetailRow label="Contact name" value={customer.contactName} />
          <DetailRow label="Email" value={customer.email} />
          <DetailRow label="Phone" value={customer.phone} />
          <DetailRow label="Town" value={customer.town} />
          <DetailRow
            label="Balance due"
            value={gbpFormatter.format(customer.balanceDueGbp)}
          />
          <DetailRow
            label="Status"
            value={customer.status === "active" ? "Active" : "Inactive"}
          />
        </Box>
      )}
    </Sidebar>
  );
}
