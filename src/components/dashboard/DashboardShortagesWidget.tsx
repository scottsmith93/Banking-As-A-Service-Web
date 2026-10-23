import { useState } from "react";
import { Link } from "react-router-dom";
import { ActionPopover, ActionPopoverItem } from "carbon-react/lib/components/action-popover";
import Box from "carbon-react/lib/components/box";
import { ButtonToggle, ButtonToggleGroup } from "carbon-react/lib/components/button-toggle";
import { Checkbox } from "carbon-react/lib/components/checkbox";
import Pill from "../status-pill/StatusPill";
import Portrait from "carbon-react/lib/components/portrait";
import Typography from "carbon-react/lib/components/typography";
import { getProductImage } from "../../data/productImages";
import { itemShortages } from "../../data/itemShortages";
import { productsAndServices } from "../../data/productsAndServices";
import { ROUTES } from "../../routes";

function getInitialsFromName(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

type ShortageListItem = {
  id: string;
  code: string;
  name: string;
  variant: string;
  shortageQuantity: number;
};

// Shortages reference real catalogue items by code (name, id, and image all
// resolved from productsAndServices.ts) so this widget can link straight
// through to the existing item detail page.
const shortageListItems: ShortageListItem[] = itemShortages.flatMap((shortage) => {
  const product = productsAndServices.find((item) => item.code === shortage.itemCode);
  if (!product) return [];
  return [
    {
      id: product.id,
      code: product.code,
      name: product.name,
      variant: shortage.variant,
      shortageQuantity: shortage.shortageQuantity,
    },
  ];
});

type ShortagesView = "list" | "grid";

export default function DashboardShortagesWidget() {
  const [view, setView] = useState<ShortagesView>("grid");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const allSelected = selectedIds.size === shortageListItems.length;

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? new Set(shortageListItems.map((item) => item.id)) : new Set());
  };

  const handleToggleItem = (id: string, checked: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  return (
    <Box className="dashboardKpiCard dashboardShortages">
      <Box className="dashboardShortages__header">
        <Typography variant="strong" as="p" className="dashboardKpiCard__title">
          Shortages ({shortageListItems.length})
        </Typography>

        <Box className="dashboardShortages__headerActions">
          <ButtonToggleGroup
            id="shortages-view-toggle"
            aria-label="Switch between list and grid view"
            value={view}
            onChange={(_event, value) => setView(value === "grid" ? "grid" : "list")}
          >
            <ButtonToggle value="list" size="small" buttonIcon="list_view" aria-label="List view" />
            <ButtonToggle value="grid" size="small" buttonIcon="card_view" aria-label="Grid view" />
          </ButtonToggleGroup>

          <ActionPopover aria-label="More shortage actions">
            <ActionPopoverItem
              icon="cart"
              disabled={selectedIds.size === 0}
              onClick={() => {
                // PROTOTYPE: wire to a bulk generate-purchase-order flow for the selected items
              }}
            >
              Generate purchase order for selected
            </ActionPopoverItem>
            <ActionPopoverItem
              icon="download"
              onClick={() => {
                // PROTOTYPE: wire to an export flow when available
              }}
            >
              Export list
            </ActionPopoverItem>
          </ActionPopover>
        </Box>
      </Box>

      <Box className="dashboardShortages__toolbar">
        <Checkbox
          label="Select all"
          checked={allSelected}
          onChange={(event) => handleSelectAll(event.target.checked)}
        />
      </Box>

      <Box className={`dashboardShortages__list dashboardShortages__list--${view}`}>
        {shortageListItems.map((item) => (
          <Box key={item.id} className="dashboardShortages__row">
            <Checkbox
              label=""
              aria-label={`Select ${item.name}`}
              checked={selectedIds.has(item.id)}
              onChange={(event) => handleToggleItem(item.id, event.target.checked)}
            />

            <Link
              to={ROUTES.productsAndServices.catalogDetail(item.id)}
              className="dashboardShortages__rowLink"
            >
              <span className="dashboardShortages__thumbnail">
                <Portrait
                  shape="square"
                  size="M"
                  src={getProductImage(item.code)}
                  initials={getInitialsFromName(item.name)}
                  alt=""
                />
              </span>

              <Box className="dashboardShortages__info">
                <Typography variant="strong" as="p" className="dashboardShortages__name">
                  {item.name}
                </Typography>
                <Typography variant="p" as="p" className="dashboardShortages__variant">
                  {item.variant}
                </Typography>
              </Box>

              <Box className="dashboardShortages__stats">
                <Pill pillRole="status" colorVariant="negative" fill>
                  Alert
                </Pill>
                <Typography variant="strong" as="p" className="dashboardShortages__quantity">
                  {item.shortageQuantity}
                </Typography>
              </Box>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
