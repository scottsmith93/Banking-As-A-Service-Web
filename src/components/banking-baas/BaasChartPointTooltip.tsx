import Tooltip from "carbon-react/lib/components/tooltip";
import Typography from "carbon-react/lib/components/typography";

// Carbon's installed tooltip owns positioning, flipping, portal and arrow.
// Its documented colour props create a white chart-specific presentation.
type Props = { id: string; x: number; y: number; date: string; values: { label: string; value: string; kind: "in" | "out" | "balance" }[]; onEnter: () => void; onLeave: () => void };
export default function BaasChartPointTooltip({ id, x, y, date, values, onEnter, onLeave }: Props) {
  // A tiny native SVG anchor follows the exact data coordinates. Tooltip's
  // HTML content is portalled by Carbon and is never clipped by this SVG.
  return <foreignObject x={x} y={y} width={1} height={1} className="baasCashFlow__popupAnchor">
  <Tooltip id={id} isVisible position="top" bgColor="var(--colorsUtilityYang100)" fontColor="var(--colorsUtilityYin090)" message={
    <div className="baasCashFlowTooltip" onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <Typography variant="strong" as="p">{date}</Typography>
      <dl>{values.map(item => <div key={item.kind}>
        <dt><i className={`baasCashFlow__${item.kind === "balance" ? "balanceKey" : item.kind}`} aria-hidden="true" />{item.label}</dt>
        <dd>{item.value}</dd>
      </div>)}</dl>
    </div>
  }><span aria-hidden="true" /></Tooltip>
  </foreignObject>;
}
