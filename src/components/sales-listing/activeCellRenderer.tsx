import type { ICellRendererParams } from "ag-grid-community";
import Icon from "carbon-react/lib/components/icon";

export function ActiveCellRenderer(params: ICellRendererParams<{ active: boolean }, boolean>) {
  if (!params.value) {
    return null;
  }

  return (
    <span className="salesGrid__activeCell">
      <Icon type="tick" color="--colorsActionMajor500" />
    </span>
  );
}
