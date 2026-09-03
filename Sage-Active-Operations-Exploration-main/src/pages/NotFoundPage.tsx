import { useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button";
import Typography from "carbon-react/lib/components/typography";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box className="pageContent">
      <Typography variant="h1" as="h1">
        Page not found
      </Typography>
      <Typography variant="p" as="p">
        That address does not match a screen in this playground.
      </Typography>
      <Box mt="16px">
        <Button onClick={() => navigate("/")} buttonType="primary">
          Back to home
        </Button>
      </Box>
    </Box>
  );
}
