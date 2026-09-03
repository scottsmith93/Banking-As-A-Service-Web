import Icon from "carbon-react/lib/components/icon";
import { useNavMode } from "../context/useNavMode";

const MODE_LABEL = {
  essentials: "Essentials",
  portal: "Portal",
} as const;

export default function NavModeToggle() {
  const { mode, toggleMode } = useNavMode();
  const nextMode = mode === "essentials" ? "portal" : "essentials";

  return (
    <button
      type="button"
      className="navModeToggle"
      onClick={toggleMode}
      aria-label={`Menu mode: ${MODE_LABEL[mode]}. Switch to ${MODE_LABEL[nextMode]}.`}
    >
      <Icon type="arrows_left_right" className="navModeToggle__icon" aria-hidden />
      <span className="navModeToggle__label">{MODE_LABEL[mode]}</span>
    </button>
  );
}
