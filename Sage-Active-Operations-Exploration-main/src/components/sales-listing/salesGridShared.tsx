import { themeQuartz, type ICellRendererParams } from "ag-grid-community";
import Icon from "carbon-react/lib/components/icon";
import IconButton from "carbon-react/lib/components/icon-button";
import Pill from "carbon-react/lib/components/pill";
import Portrait from "carbon-react/lib/components/portrait";
import { getProductImage } from "../../data/productImages";

export const salesListingGridTheme = themeQuartz.withParams({
  headerBackgroundColor: "var(--colorsUtilityMajor025, #f2f2f2)",
  headerTextColor: "var(--colorsUtilityYin090, #333333)",
  backgroundColor: "var(--colorsUtilityYang100, #ffffff)",
  oddRowBackgroundColor: "var(--colorsUtilityMajor010, #fafafa)",
  borderColor: "var(--colorsUtilityMajor050, #cccccc)",
  wrapperBorder: true,
  rowBorder: false,
  columnBorder: false,
  headerColumnBorder: false,
  pinnedColumnBorder: false,
  spacing: 8,
  fontFamily: "inherit",
});

const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function formatCurrencyGbp(amount: number) {
  return gbpFormatter.format(amount);
}

export function formatListingDate(dateIso: string) {
  return dateFormatter.format(new Date(dateIso));
}

function getInitialsFromName(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const initials = words
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
  return initials.toUpperCase();
}

export function createThumbnailCellRenderer<T extends { name: string; code: string }>() {
  return function ThumbnailCellRenderer(params: ICellRendererParams<T>) {
    if (!params.data) return null;

    return (
      <span className="salesGrid__thumbnailCell">
        <Portrait
          shape="square"
          size="XL"
          src={getProductImage(params.data.code)}
          initials={getInitialsFromName(params.data.name)}
          alt=""
        />
      </span>
    );
  };
}

export function createEditCellRenderer(entityLabel: string) {
  return function EditCellRenderer(_params: ICellRendererParams) {
    return (
      <span className="salesGrid__actionCell">
        <IconButton
          aria-label={`Edit ${entityLabel}`}
          onClick={() => {
            // PROTOTYPE: wire to edit flow when available
          }}
        >
          <Icon type="edit" color="--colorsActionMajor500" />
        </IconButton>
      </span>
    );
  };
}

export function createDeleteCellRenderer(entityLabel: string) {
  return function DeleteCellRenderer(_params: ICellRendererParams) {
    return (
      <span className="salesGrid__actionCell">
        <IconButton
          aria-label={`Delete ${entityLabel}`}
          onClick={() => {
            // PROTOTYPE: wire to delete confirmation when available
          }}
        >
          <Icon type="delete" color="--colorsSemanticNegative500" />
        </IconButton>
      </span>
    );
  };
}

export function createActionsCellRenderer(entityLabel: string) {
  return function ActionsCellRenderer(_params: ICellRendererParams) {
    return (
      <span className="salesGrid__actionCell">
        <IconButton
          aria-label={`More actions for ${entityLabel}`}
          onClick={() => {
            // PROTOTYPE: wire to actions menu when available
          }}
        >
          <Icon type="ellipsis_vertical" />
        </IconButton>
      </span>
    );
  };
}

type PendingClosedStatus = "pending" | "closed";

export function PendingClosedStatusCellRenderer(
  params: ICellRendererParams<{ status: PendingClosedStatus }, PendingClosedStatus>,
) {
  const status = params.value;
  if (!status) return null;

  const label = status === "pending" ? "Pending" : "Closed";
  const variant = status === "closed" ? ("positive" as const) : undefined;

  return (
    <span
      className={
        status === "pending"
          ? "salesGrid__status salesGrid__status--pending"
          : "salesGrid__status"
      }
    >
      <Pill pillRole="status" colorVariant={variant}>
        {label}
      </Pill>
    </span>
  );
}
