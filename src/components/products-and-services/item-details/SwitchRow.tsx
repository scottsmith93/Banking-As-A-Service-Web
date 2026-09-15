import Box from "carbon-react/lib/components/box";
import Switch from "carbon-react/lib/components/switch";
import Typography from "carbon-react/lib/components/typography";

type SwitchRowProps = {
  id: string;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function SwitchRow({ id, label, hint, checked, onChange }: SwitchRowProps) {
  return (
    <Box className="itemDetailsSwitchRow" display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <Typography variant="span" className="itemDetailsSwitchRow__label">
          {label}
        </Typography>
        {hint && (
          <Typography variant="p" as="p" className="itemDetailsSwitchRow__hint">
            {hint}
          </Typography>
        )}
      </Box>
      <Switch
        id={id}
        aria-label={label}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
    </Box>
  );
}
