import { useState } from "react";
import Box from "carbon-react/lib/components/box";
import { Tab, TabList, TabPanel, Tabs } from "carbon-react/lib/components/tabs/__next__";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import Field from "./Field";
import SwitchRow from "./SwitchRow";
import WorkspaceHeader from "./WorkspaceHeader";
import { itemDetailsWorkspace } from "../../../data/itemDetailsWorkspace";

type InventorySubTab = "stock-rules" | "replenishment" | "valuation" | "tracking";

type TrackingState = {
  batchTracking: boolean;
  serialNumberTracking: boolean;
  expiryDateTracking: boolean;
  barcodeScanning: boolean;
};

type StockRulesPanelProps = {
  stockManagementEnabled: boolean;
  onStockManagementChange: (checked: boolean) => void;
  tracking: TrackingState;
  onTrackingChange: (key: keyof TrackingState, checked: boolean) => void;
};

function StockRulesPanel({
  stockManagementEnabled,
  onStockManagementChange,
  tracking,
  onTrackingChange,
}: StockRulesPanelProps) {
  const { stockRules } = itemDetailsWorkspace;

  return (
    <Box className="itemDetailsInventory__stockRulesRow" display="flex" gap={3}>
      <Card className="itemDetailsInventory__stockRulesCard">
        <CardHeader>
          <CardTitle>Stock management</CardTitle>
        </CardHeader>
        <CardContent>
          <SwitchRow
            id="inventory-stock-management-enabled"
            label="Stock management enabled"
            hint="Track quantities on hand, available, and reserved for this item."
            checked={stockManagementEnabled}
            onChange={onStockManagementChange}
          />
          <Box className="itemDetailsFieldGrid">
            <Field label="Safety stock" value={stockRules.safetyStock} />
            <Field label="Reorder point" value={stockRules.reorderPoint} />
          </Box>
        </CardContent>
      </Card>

      <Card className="itemDetailsInventory__stockRulesCard">
        <CardHeader>
          <CardTitle>Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <SwitchRow
            id="inventory-batch-tracking-preview"
            label="Batch tracking"
            checked={tracking.batchTracking}
            onChange={(checked) => onTrackingChange("batchTracking", checked)}
          />
          <SwitchRow
            id="inventory-serial-tracking-preview"
            label="Serial number tracking"
            checked={tracking.serialNumberTracking}
            onChange={(checked) => onTrackingChange("serialNumberTracking", checked)}
          />
          <SwitchRow
            id="inventory-expiry-tracking-preview"
            label="Expiry date tracking"
            checked={tracking.expiryDateTracking}
            onChange={(checked) => onTrackingChange("expiryDateTracking", checked)}
          />
        </CardContent>
      </Card>
    </Box>
  );
}

function ReplenishmentPanel() {
  const { replenishment } = itemDetailsWorkspace;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Replenishment</CardTitle>
      </CardHeader>
      <CardContent>
        <Box className="itemDetailsFieldGrid">
          <Field label="Replenishment method" value={replenishment.method} />
          <Field label="Order quantity" value={replenishment.orderQuantity} />
          <Field label="Lead time buffer" value={replenishment.leadTimeBuffer} />
          <Field label="Preferred warehouse" value={replenishment.preferredWarehouse} />
        </Box>
      </CardContent>
    </Card>
  );
}

function ValuationPanel() {
  const { valuation } = itemDetailsWorkspace;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Valuation</CardTitle>
      </CardHeader>
      <CardContent>
        <Box className="itemDetailsFieldGrid">
          <Field label="Valuation method" value={valuation.method} />
          <Field label="Standard cost" value={valuation.standardCost} />
          <Field label="Last cost" value={valuation.lastCost} />
          <Field label="Average cost" value={valuation.averageCost} />
        </Box>
      </CardContent>
    </Card>
  );
}

type TrackingPanelProps = {
  tracking: TrackingState;
  onTrackingChange: (key: keyof TrackingState, checked: boolean) => void;
};

function TrackingPanel({ tracking, onTrackingChange }: TrackingPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <SwitchRow
          id="inventory-batch-tracking"
          label="Batch tracking"
          checked={tracking.batchTracking}
          onChange={(checked) => onTrackingChange("batchTracking", checked)}
        />
        <SwitchRow
          id="inventory-serial-tracking"
          label="Serial number tracking"
          checked={tracking.serialNumberTracking}
          onChange={(checked) => onTrackingChange("serialNumberTracking", checked)}
        />
        <SwitchRow
          id="inventory-expiry-tracking"
          label="Expiry date tracking"
          checked={tracking.expiryDateTracking}
          onChange={(checked) => onTrackingChange("expiryDateTracking", checked)}
        />
        <SwitchRow
          id="inventory-barcode-scanning"
          label="Barcode scanning"
          checked={tracking.barcodeScanning}
          onChange={(checked) => onTrackingChange("barcodeScanning", checked)}
        />
      </CardContent>
    </Card>
  );
}

export default function InventoryTab() {
  const [subTab, setSubTab] = useState<InventorySubTab>("stock-rules");
  const [stockManagementEnabled, setStockManagementEnabled] = useState(
    itemDetailsWorkspace.stockRules.stockManagementEnabled,
  );
  const [tracking, setTracking] = useState<TrackingState>({ ...itemDetailsWorkspace.tracking });

  const handleTrackingChange = (key: keyof TrackingState, checked: boolean) => {
    setTracking((current) => ({ ...current, [key]: checked }));
  };

  return (
    <Box className="itemDetailsWorkspace">
      <WorkspaceHeader
        icon="stacked_boxes"
        title="Inventory"
        description="Stock rules, replenishment, valuation, and tracking for this item."
      />

      <Box className="itemDetailsSegmentedTabs">
        <Tabs selectedTabId={subTab}>
          <TabList
            ariaLabel="Inventory sections"
            onTabChange={(id) => setSubTab(id as InventorySubTab)}
          >
            <Tab id="stock-rules" controls="stock-rules-panel" label="Stock rules" />
            <Tab id="replenishment" controls="replenishment-panel" label="Replenishment" />
            <Tab id="valuation" controls="valuation-panel" label="Valuation" />
            <Tab id="tracking" controls="tracking-panel" label="Tracking" />
          </TabList>

          <TabPanel id="stock-rules-panel" tabId="stock-rules">
            <StockRulesPanel
              stockManagementEnabled={stockManagementEnabled}
              onStockManagementChange={setStockManagementEnabled}
              tracking={tracking}
              onTrackingChange={handleTrackingChange}
            />
          </TabPanel>
          <TabPanel id="replenishment-panel" tabId="replenishment">
            <ReplenishmentPanel />
          </TabPanel>
          <TabPanel id="valuation-panel" tabId="valuation">
            <ValuationPanel />
          </TabPanel>
          <TabPanel id="tracking-panel" tabId="tracking">
            <TrackingPanel tracking={tracking} onTrackingChange={handleTrackingChange} />
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
}
