import Box from "carbon-react/lib/components/box";
import Typography from "carbon-react/lib/components/typography";

export default function TaxReturnsPage() {
  return (
    <Box className="pageContent">
      <Typography variant="h1" as="h1">
        Tax returns
      </Typography>
      <Typography variant="p" as="p">
        View and manage tax returns. This page is ready for you to build out with
        a listing table and submission flows.
      </Typography>
    </Box>
  );
}
