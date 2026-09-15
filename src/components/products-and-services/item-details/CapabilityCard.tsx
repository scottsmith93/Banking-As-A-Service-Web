import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import type { Capability } from "./capabilityMeta";
import { CAPABILITY_META } from "./capabilityMeta";

type CapabilityCardProps = {
  capability: Capability;
  selected: boolean;
  onToggle: (capability: Capability) => void;
};

export default function CapabilityCard({ capability, selected, onToggle }: CapabilityCardProps) {
  const meta = CAPABILITY_META[capability];

  return (
    <button
      type="button"
      className={
        selected
          ? "itemDetailsCapabilityCard itemDetailsCapabilityCard--selected"
          : "itemDetailsCapabilityCard"
      }
      aria-pressed={selected}
      onClick={() => onToggle(capability)}
    >
      <img className="itemDetailsCapabilityCard__icon" src={meta.image} alt="" />

      <Box className="itemDetailsCapabilityCard__text">
        <Typography variant="strong" as="p" className="itemDetailsCapabilityCard__title">
          {meta.label}
        </Typography>
        <Typography variant="p" as="p" className="itemDetailsCapabilityCard__description">
          {meta.description}
        </Typography>
      </Box>

      <Box className="itemDetailsCapabilityCard__checkbox" aria-hidden="true">
        {selected && <Icon type="tick" />}
      </Box>
    </button>
  );
}
