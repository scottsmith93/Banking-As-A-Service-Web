import { useNavigate } from "react-router-dom";
import Box from "carbon-react/lib/components/box";
import Button from "carbon-react/lib/components/button";
import Typography from "carbon-react/lib/components/typography";
import { useLanguage } from "../context/useLanguage";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isFrench = language === "French";

  return (
    <Box className="pageContent">
      <Typography variant="h1" as="h1">
        {isFrench ? "Page introuvable" : "Page not found"}
      </Typography>
      <Typography variant="p" as="p">
        {isFrench ? "Cette adresse ne correspond à aucun écran de cette application." : "That address does not match a screen in this playground."}
      </Typography>
      <Box mt="16px">
        <Button onClick={() => navigate("/")} buttonType="primary">
          {isFrench ? "Retour à l’accueil" : "Back to home"}
        </Button>
      </Box>
    </Box>
  );
}
