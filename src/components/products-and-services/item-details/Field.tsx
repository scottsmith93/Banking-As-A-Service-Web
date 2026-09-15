import type { ReactNode } from "react";
import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import IconButton from "carbon-react/lib/components/icon-button";
import Typography from "carbon-react/lib/components/typography";

type FieldProps = {
  label: string;
  value: ReactNode;
  fullWidth?: boolean;
  onEdit?: () => void;
};

/** Read-only label + value pair with a hover-revealed edit affordance. */
export default function Field({ label, value, fullWidth = false, onEdit }: FieldProps) {
  return (
    <Box className={`itemDetailsField ${fullWidth ? "itemDetailsField--fullWidth" : ""}`.trim()}>
      <Typography variant="span" className="itemDetailsField__label">
        {label}
      </Typography>
      <Box className="itemDetailsField__valueBox" display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="span" className="itemDetailsField__value">
          {value}
        </Typography>
        {onEdit && (
          <Box className="itemDetailsField__editButton">
            <IconButton aria-label={`Edit ${label.toLowerCase()}`} onClick={onEdit}>
              <Icon type="edit" />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
