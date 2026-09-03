import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";

export default function BankMovementsEmptyState() {
  return (
    <Box className="bankMovementsEmptyState" display="flex" flexDirection="column" alignItems="center">
      <Box className="bankMovementsEmptyState__illustration" aria-hidden="true" />
      <Typography variant="strong" as="p" className="bankMovementsEmptyState__title">
        No items to display
      </Typography>
      <Typography variant="p" as="p" className="bankMovementsEmptyState__message">
        Your search did not bring back any results. Try again.
      </Typography>
    </Box>
  );
}
