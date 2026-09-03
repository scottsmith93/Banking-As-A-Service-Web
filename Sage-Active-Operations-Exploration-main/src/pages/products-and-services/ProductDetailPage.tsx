import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button/__next__";
import Form from "carbon-react/lib/components/form";
import { Tab, TabList, TabPanel, Tabs } from "carbon-react/lib/components/tabs/__next__";
import Typography from "carbon-react/lib/components/typography";
import EnableManufacturingDialog from "../../components/products-and-services/item-details/EnableManufacturingDialog";
import InventoryTab from "../../components/products-and-services/item-details/InventoryTab";
import ManufacturingTab, {
  type ManufacturingSubTab,
} from "../../components/products-and-services/item-details/ManufacturingTab";
import OverviewTab from "../../components/products-and-services/item-details/OverviewTab";
import ProcurementTab from "../../components/products-and-services/item-details/ProcurementTab";
import SalesTab from "../../components/products-and-services/item-details/SalesTab";
import type { Capability, ItemWorkspaceTab } from "../../components/products-and-services/item-details/capabilityMeta";
import ProductDetailFooter from "../../components/products-and-services/ProductDetailFooter";
import ProductDetailHeader from "../../components/products-and-services/ProductDetailHeader";
import { productsAndServices } from "../../data/productsAndServices";
import { ROUTES } from "../../routes";

export default function ProductDetailPage() {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();

  const product = useMemo(
    () => productsAndServices.find((item) => item.id === productId),
    [productId],
  );

  const [caps, setCaps] = useState<Record<Capability, boolean>>(() => ({
    buy: product?.purchased ?? false,
    sell: product?.sold ?? false,
    store: product?.stockManaged ?? false,
    make: product?.manufactured ?? false,
  }));
  const [tab, setTab] = useState<ItemWorkspaceTab>("overview");
  const [manufacturingSub, setManufacturingSub] = useState<ManufacturingSubTab>("bom");
  const [isEnableManufacturingDialogOpen, setIsEnableManufacturingDialogOpen] = useState(false);

  const toggleCap = (capability: Capability) => {
    if (capability === "make" && !caps.make) {
      setIsEnableManufacturingDialogOpen(true);
      return;
    }

    setCaps((current) => {
      const next = { ...current, [capability]: !current[capability] };
      return next;
    });

    // Disabling a capability whose workspace is currently open sends the user
    // back to Overview rather than leaving them on a tab that just vanished.
    const tabForCapability: Partial<Record<Capability, ItemWorkspaceTab>> = {
      buy: "procurement",
      sell: "sales",
      store: "inventory",
    };
    if (caps[capability] && tabForCapability[capability] === tab) {
      setTab("overview");
    }
  };

  const handleConfirmEnableManufacturing = () => {
    setCaps((current) => ({ ...current, make: true }));
    setIsEnableManufacturingDialogOpen(false);
    setTab("manufacturing");
  };

  const handleBack = () => navigate(ROUTES.productsAndServices.catalog);

  if (!product) {
    return (
      <Box className="pageContent">
        <Typography variant="h1" as="h1">
          Product or service not found
        </Typography>
        <Typography variant="p" as="p">
          We could not find this item in the prototype data set.
        </Typography>
        <Box>
          <Button variantType="secondary" onClick={handleBack}>
            Back to products and services
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="pageContent productDetail">
      <Form
        stickyFooter
        stickyFooterVariant="light"
        height="100%"
        footerPadding={{ py: 0, px: 3 }}
        footerChildren={<ProductDetailFooter product={product} onCancel={handleBack} />}
      >
        <ProductDetailHeader title={product.name} onBack={handleBack} />

        <Tabs selectedTabId={tab}>
          <TabList
            ariaLabel="Item detail sections"
            onTabChange={(id) => setTab(id as ItemWorkspaceTab)}
          >
            <Tab id="overview" controls="overview-panel" label="Overview" />
            {caps.buy && <Tab id="procurement" controls="procurement-panel" label="Procurement" />}
            {caps.sell && <Tab id="sales" controls="sales-panel" label="Sales" />}
            {caps.store && <Tab id="inventory" controls="inventory-panel" label="Inventory" />}
            <Tab id="manufacturing" controls="manufacturing-panel" label="Manufacturing" />
          </TabList>

          <TabPanel id="overview-panel" tabId="overview">
            <OverviewTab product={product} caps={caps} toggleCap={toggleCap} setTab={setTab} />
          </TabPanel>

          {caps.buy && (
            <TabPanel id="procurement-panel" tabId="procurement">
              <ProcurementTab />
            </TabPanel>
          )}

          {caps.sell && (
            <TabPanel id="sales-panel" tabId="sales">
              <SalesTab />
            </TabPanel>
          )}

          {caps.store && (
            <TabPanel id="inventory-panel" tabId="inventory">
              <InventoryTab />
            </TabPanel>
          )}

          <TabPanel id="manufacturing-panel" tabId="manufacturing">
            <ManufacturingTab
              enabled={caps.make}
              sub={manufacturingSub}
              setSub={setManufacturingSub}
              onEnable={() => setIsEnableManufacturingDialogOpen(true)}
            />
          </TabPanel>
        </Tabs>
      </Form>

      <EnableManufacturingDialog
        open={isEnableManufacturingDialogOpen}
        onCancel={() => setIsEnableManufacturingDialogOpen(false)}
        onConfirm={handleConfirmEnableManufacturing}
      />
    </Box>
  );
}
