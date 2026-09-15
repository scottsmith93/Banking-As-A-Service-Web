import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import { useLanguage } from "../context/useLanguage";

type PlaceholderPageProps = {
  title: string;
  section?: string;
};

export default function PlaceholderPage({ title, section }: PlaceholderPageProps) {
  const { language } = useLanguage();
  const isFrench = language === "French";
  return (
    <Box className="pageContent placeholderPage">
      <Box className="placeholderPage__intro">
        {section && (
          <Typography variant="small" as="p" className="placeholderPage__eyebrow">
            {isFrench ? ({ Business: "Entreprise", Sales: "Ventes", Purchases: "Achats", Inventory: "Stock", Manufacturing: "Fabrication", Accounting: "Comptabilité", Compliance: "Conformité" }[section] ?? section) : section}
          </Typography>
        )}
        <Typography variant="h1" as="h1" className="placeholderPage__title">
          {title}
        </Typography>
      </Box>

      <Box className="placeholderPage__panel">
        <Box className="placeholderPage__icon">
          <Icon type="placeholder" />
        </Box>
        <Typography variant="p" as="p" className="placeholderPage__panelTitle">
          {isFrench ? "Écran en cours de création" : "Screen not built yet"}
        </Typography>
        <Typography variant="p" as="p" className="placeholderPage__panelMessage">
          {isFrench ? `Ceci est un espace réservé pour l’écran « ${title} » de la navigation.` : `This is a placeholder for the "${title}" screen in the Operations navigation.`}
        </Typography>
      </Box>
    </Box>
  );
}
