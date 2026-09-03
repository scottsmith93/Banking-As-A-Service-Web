import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Form from "carbon-react/lib/components/form";
import { Tab, TabList, TabPanel, Tabs } from "carbon-react/lib/components/tabs/__next__";
import Typography from "carbon-react/lib/components/typography";
import SupplierAdditionalInformation from "../../components/contacts/SupplierAdditionalInformation";
import SupplierAddressContactCards from "../../components/contacts/SupplierAddressContactCards";
import SupplierBusinessInformationForm from "../../components/contacts/SupplierBusinessInformationForm";
import SupplierDetailFooter from "../../components/contacts/SupplierDetailFooter";
import SupplierDetailHeader from "../../components/contacts/SupplierDetailHeader";
import SupplierKpiTiles from "../../components/contacts/SupplierKpiTiles";
import { getSupplierDetail, suppliers } from "../../data/suppliers";
import { ROUTES } from "../../routes";

export default function SupplierDetailPage() {
  const navigate = useNavigate();
  const { supplierId } = useParams<{ supplierId: string }>();

  const supplier = useMemo(
    () => suppliers.find((item) => item.id === supplierId),
    [supplierId],
  );

  const detail = useMemo(() => (supplier ? getSupplierDetail(supplier) : null), [supplier]);

  const [inactive, setInactive] = useState(supplier?.status === "inactive");

  const handleBack = () => navigate(ROUTES.contacts.suppliers);

  if (!supplier || !detail) {
    return (
      <Box className="pageContent">
        <Typography variant="h1" as="h1">
          Supplier not found
        </Typography>
        <Typography variant="p" as="p">
          We could not find this supplier in the prototype data set.
        </Typography>
        <Box>
          <Button variantType="secondary" onClick={handleBack}>
            Back to suppliers
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="pageContent supplierDetail">
      <Form
        stickyFooter
        stickyFooterVariant="light"
        height="100%"
        footerPadding={{ py: 0, px: 3 }}
        footerChildren={<SupplierDetailFooter onCancel={handleBack} />}
      >
        <SupplierDetailHeader title={supplier.name} onBack={handleBack} />

        <SupplierKpiTiles
          accountingBalanceGbp={supplier.balanceOwedGbp}
          overdueOpenItemsGbp={detail.overdueOpenItemsGbp}
        />

        <Tabs>
          <TabList ariaLabel="Supplier record sections">
            <Tab id="information-tab" controls="information-panel" label="Information" />
            <Tab id="contacts-tab" controls="contacts-panel" label="Contacts" />
            <Tab id="payment-terms-tab" controls="payment-terms-panel" label="Payment terms" />
            <Tab id="addresses-tab" controls="addresses-panel" label="Addresses" />
            <Tab
              id="sales-terms-tab"
              controls="sales-terms-panel"
              label="Sales terms and conditions"
            />
          </TabList>

          <TabPanel id="information-panel" tabId="information-tab">
            <Box className="supplierDetail__infoGrid" display="flex" gap={4}>
              <SupplierBusinessInformationForm supplier={supplier} detail={detail} />
              <SupplierAddressContactCards supplier={supplier} detail={detail} />
            </Box>
            <SupplierAdditionalInformation
              detail={detail}
              inactive={inactive}
              onInactiveChange={setInactive}
            />
          </TabPanel>

          <TabPanel id="contacts-panel" tabId="contacts-tab">
            <Typography variant="p" as="p" className="supplierDetail__tabPlaceholder">
              Additional contacts for this supplier will appear here.
            </Typography>
          </TabPanel>

          <TabPanel id="payment-terms-panel" tabId="payment-terms-tab">
            <Typography variant="p" as="p" className="supplierDetail__tabPlaceholder">
              Payment terms for this supplier will appear here.
            </Typography>
          </TabPanel>

          <TabPanel id="addresses-panel" tabId="addresses-tab">
            <Typography variant="p" as="p" className="supplierDetail__tabPlaceholder">
              Delivery and billing addresses for this supplier will appear here.
            </Typography>
          </TabPanel>

          <TabPanel id="sales-terms-panel" tabId="sales-terms-tab">
            <Typography variant="p" as="p" className="supplierDetail__tabPlaceholder">
              Sales terms and conditions for this supplier will appear here.
            </Typography>
          </TabPanel>
        </Tabs>
      </Form>
    </Box>
  );
}
