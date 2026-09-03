import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";

type KeyRowProps = {
  label: string;
  value: string;
};

export default function KeyRow({ label, value }: KeyRowProps) {
  return (
    <Box className="itemDetailsKeyRow" display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="span" className="itemDetailsKeyRow__label">
        {label}
      </Typography>
      <Typography variant="span" className="itemDetailsKeyRow__value">
        {value}
      </Typography>
    </Box>
  );
}
