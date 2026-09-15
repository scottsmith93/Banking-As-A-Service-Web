import { useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import { useStockAlert } from "../../context/useStockAlert";
import { lowStockItem } from "../../data/stockAlerts";
import { ROUTES } from "../../routes";

function AiSparkleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="dashboardCopilotCards__aiButtonIcon"
    >
      <path d="M12 1L15 9L23 12L15 15L12 23L9 15L1 12L9 9Z" fill="currentColor" />
      <circle cx="19.5" cy="4.5" r="2" fill="#00D639" />
    </svg>
  );
}

export default function DashboardLowStockAlert() {
  const navigate = useNavigate();
  const { currentStock, isLowStock } = useStockAlert();

  if (!isLowStock) {
    return null;
  }

  const handleGeneratePurchaseOrder = () => {
    navigate(ROUTES.purchases.orderCreate, {
      state: {
        supplier: lowStockItem.supplier,
        purchasingSite: lowStockItem.purchasingSite,
        itemName: lowStockItem.itemName,
        itemCode: lowStockItem.itemCode,
        quantity: lowStockItem.suggestedOrderQuantity,
        unitPriceGbp: lowStockItem.unitCostGbp,
      },
    });
  };

  return (
    <Box className="dashboardLowStockAlert" borderRadius="borderRadius100">
      <Box display="flex" alignItems="flex-start" className="dashboardLowStockAlert__content">
        <Box className="dashboardLowStockAlert__iconWrap" display="flex" alignItems="center" justifyContent="center">
          <Icon type="warning" className="dashboardLowStockAlert__warningIcon" aria-hidden />
        </Box>
        <Box display="flex" flexDirection="column" className="dashboardLowStockAlert__text">
          <Box display="flex" alignItems="center" className="dashboardLowStockAlert__titleRow">
            <Typography variant="strong" as="p" className="dashboardLowStockAlert__title">
              Low stock warning
            </Typography>
            <span className="dashboardLowStockAlert__aiBadge">
              <AiSparkleIcon />
              Copilot
            </span>
          </Box>
          <Typography variant="p" as="p" className="dashboardLowStockAlert__description">
            <strong>{lowStockItem.itemName}</strong> is running low at {lowStockItem.purchasingSite} —
            only {currentStock} left, below the reorder point of {lowStockItem.reorderThreshold}.
            Copilot suggests reordering {lowStockItem.suggestedOrderQuantity} units from{" "}
            {lowStockItem.supplier}.
          </Typography>
        </Box>
        <button
          type="button"
          className="dashboardLowStockAlert__aiButton"
          onClick={handleGeneratePurchaseOrder}
        >
          <AiSparkleIcon />
          Generate purchase order
        </button>
      </Box>
    </Box>
  );
}
