import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import { Checkbox } from "carbon-react/lib/components/checkbox";
import Link from "carbon-react/lib/components/link";
import { Option, Select } from "carbon-react/lib/components/select";
import Typography from "carbon-react/lib/components/typography";
import type { Supplier, SupplierDetail } from "../../data/suppliers";

const ledgerAccountOptions = [
  { text: "40100000 - Suppliers", value: "40100000 - Suppliers" },
  { text: "40800000 - Supplier advances", value: "40800000 - Supplier advances" },
] as const;

type SupplierAddressContactCardsProps = {
  supplier: Supplier;
  detail: SupplierDetail;
};

export default function SupplierAddressContactCards({
  supplier,
  detail,
}: SupplierAddressContactCardsProps) {
  const [sameAsDeliveryAddress, setSameAsDeliveryAddress] = useState(
    detail.sameAsDeliveryAddress,
  );
  const [ledgerAccount, setLedgerAccount] = useState(detail.ledgerAccount);
  const [advancePaymentAccount, setAdvancePaymentAccount] = useState(
    detail.advancePaymentAccount,
  );

  return (
    <Box className="supplierDetail__panel">
      <Typography variant="h3" as="p" className="supplierDetail__panelHeading">
        Address and contact information
      </Typography>

      <Box className="supplierDetail__card">
        <Box className="supplierDetail__cardBody" display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="strong" as="p" className="supplierDetail__cardLabel">
              Main address
            </Typography>
            <Typography variant="p" as="p" className="supplierDetail__cardLine">
              {detail.addressLine}
            </Typography>
            <Typography variant="p" as="p" className="supplierDetail__cardLine">
              {detail.postcode} {detail.cityCountry}
            </Typography>
          </Box>
          <Checkbox
            id="supplier-same-as-delivery-address"
            label="Same as delivery address"
            checked={sameAsDeliveryAddress}
            onChange={(event) => setSameAsDeliveryAddress(event.target.checked)}
          />
        </Box>
        <Box className="supplierDetail__cardFooter">
          <Button
            variantType="tertiary"
            iconType="edit"
            iconPosition="before"
            onClick={() => {
              // PROTOTYPE: wire to address edit flow when available
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>

      <Box className="supplierDetail__card">
        <Box className="supplierDetail__cardBody" display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="strong" as="p" className="supplierDetail__cardLabel">
              Main contact
            </Typography>
            <Typography variant="p" as="p" className="supplierDetail__cardLine">
              {supplier.contactName}
            </Typography>
            <Typography variant="p" as="p" className="supplierDetail__cardLine">
              {detail.postcode} {detail.cityCountry}
            </Typography>
          </Box>
          <Box className="supplierDetail__cardContactLinks">
            <Link href={`mailto:${supplier.email}`} icon="email">
              {supplier.email}
            </Link>
            <Link href={`tel:${supplier.phone}`} icon="call">
              {supplier.phone}
            </Link>
          </Box>
        </Box>
        <Box className="supplierDetail__cardFooter">
          <Button
            variantType="tertiary"
            iconType="edit"
            iconPosition="before"
            onClick={() => {
              // PROTOTYPE: wire to contact edit flow when available
            }}
          >
            Edit
          </Button>
        </Box>
      </Box>

      <Typography variant="h3" as="p" className="supplierDetail__panelHeading">
        Accounting information
      </Typography>

      <Select
        id="supplier-ledger-account"
        label="Ledger account"
        value={ledgerAccount}
        onChange={(event) => setLedgerAccount(event.target.value as string)}
      >
        {ledgerAccountOptions.map((option) => (
          <Option key={option.value} text={option.text} value={option.value} />
        ))}
      </Select>

      <Select
        id="supplier-advance-payment-account"
        label="Advance payment account"
        value={advancePaymentAccount}
        onChange={(event) => setAdvancePaymentAccount(event.target.value as string)}
      >
        {ledgerAccountOptions.map((option) => (
          <Option key={option.value} text={option.text} value={option.value} />
        ))}
      </Select>
    </Box>
  );
}
