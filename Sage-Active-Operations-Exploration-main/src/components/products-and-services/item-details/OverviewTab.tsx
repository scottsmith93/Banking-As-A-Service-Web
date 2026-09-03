import Box from "carbon-react/lib/components/box";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import CapabilityCard from "./CapabilityCard";
import Field from "./Field";
import KeyRow from "./KeyRow";
import ProductImageCarousel from "./ProductImageCarousel";
import SummaryCard from "./SummaryCard";
import { CAPABILITY_ORDER, type Capability, type ItemWorkspaceTab } from "./capabilityMeta";
import { itemDetailsWorkspace } from "../../../data/itemDetailsWorkspace";
import type { ProductOrService } from "../../../data/productsAndServices";
import { formatCurrencyGbp, formatListingDate } from "../../sales-listing/salesGridShared";

type OverviewTabProps = {
  product: ProductOrService;
  caps: Record<Capability, boolean>;
  toggleCap: (capability: Capability) => void;
  setTab: (tab: ItemWorkspaceTab) => void;
};

function handleEditField() {
  // PROTOTYPE: wire to an inline-edit flow when available
}

export default function OverviewTab({ product, caps, toggleCap, setTab }: OverviewTabProps) {
  const { keyFigures, summary } = itemDetailsWorkspace;

  return (
    <Box className="itemDetailsOverview">
      <Card>
        <CardHeader>
          <CardTitle>How is this item managed?</CardTitle>
        </CardHeader>
        <CardContent>
          <Box className="itemDetailsOverview__capabilityGrid">
            {CAPABILITY_ORDER.map((capability) => (
              <CapabilityCard
                key={capability}
                capability={capability}
                selected={caps[capability]}
                onToggle={toggleCap}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      <Box className="itemDetailsOverview__columns">
        <Box className="itemDetailsOverview__mainColumn">
          <Card>
            <CardHeader>
              <CardTitle>Item information</CardTitle>
            </CardHeader>
            <CardContent>
              <Box className="itemDetailsOverview__infoGrid">
                <Field label="Item name" value={product.name} onEdit={handleEditField} />
                <Field label="Code" value={product.code} onEdit={handleEditField} />
                <Field label="Type" value={product.category} onEdit={handleEditField} />
                <Field label="Category" value={product.categoryGroup} onEdit={handleEditField} />
                <Field label="Unit of measurement" value={product.unitOfMeasurement} onEdit={handleEditField} />
                <Field label="Tax group" value={product.taxGroup} onEdit={handleEditField} />
                <Field label="Release date" value={formatListingDate(product.releaseDate)} onEdit={handleEditField} />
                <Field label="Status" value={product.status} onEdit={handleEditField} />
                <Field
                  label="Description"
                  value={product.description}
                  fullWidth
                  onEdit={handleEditField}
                />
              </Box>
            </CardContent>
          </Card>

          <Box className="itemDetailsOverview__summaryGrid">
            <SummaryCard
              capability="buy"
              enabled={caps.buy}
              rows={summary.procurement}
              emptyStateText="Purchasing isn't configured for this item yet."
              toggleCap={toggleCap}
              setTab={setTab}
            />
            <SummaryCard
              capability="sell"
              enabled={caps.sell}
              rows={summary.sales}
              emptyStateText="Sales pricing isn't configured for this item yet."
              toggleCap={toggleCap}
              setTab={setTab}
            />
            <SummaryCard
              capability="store"
              enabled={caps.store}
              rows={summary.inventory}
              emptyStateText="Inventory tracking isn't configured for this item yet."
              toggleCap={toggleCap}
              setTab={setTab}
            />
            <SummaryCard
              capability="make"
              enabled={caps.make}
              rows={summary.manufacturing}
              emptyStateText="Manufacturing isn't enabled for this item yet."
              toggleCap={toggleCap}
              setTab={setTab}
            />
          </Box>
        </Box>

        <Box className="itemDetailsOverview__sideColumn">
          <Card>
            <CardHeader>
              <CardTitle>Product image</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductImageCarousel code={product.code} name={product.name} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key figures</CardTitle>
            </CardHeader>
            <CardContent>
              <Box className="itemDetailsOverview__keyFigures">
                <KeyRow
                  label="Sales price (Standard)"
                  value={formatCurrencyGbp(product.priceWithDiscountGbp)}
                />
                <KeyRow label="Last purchase price" value={keyFigures.lastPurchasePrice} />
                <KeyRow label="On hand" value={keyFigures.onHand} />
                <KeyRow label="Available" value={keyFigures.available} />
                <KeyRow label="Reserved" value={keyFigures.reserved} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
