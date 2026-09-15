import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";

type FooterKpiTileProps = {
  amount: string;
  label: string;
};

export default function FooterKpiTile({ amount, label }: FooterKpiTileProps) {
  return (
    <Box className="footerKpiTile" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="p" as="p" className="footerKpiTile__amount">
        {amount}
      </Typography>
      <Typography variant="p" as="p" className="footerKpiTile__label">
        {label}
      </Typography>
    </Box>
  );
}
