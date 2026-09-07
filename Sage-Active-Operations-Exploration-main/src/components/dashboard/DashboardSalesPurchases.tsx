import Box from "carbon-react/lib/components/box";
import Icon from "carbon-react/lib/components/icon";
import Typography from "carbon-react/lib/components/typography";
import type { IconType } from "carbon-react/lib/components/icon";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/useLanguage";
import { formatDashboardEuro } from "../../data/dashboard";

type PaymentCardProps = {
  title: string;
  amount: number;
  icon: IconType;
  isFrench: boolean;
};

const overdueInvoices = [
  ["01/09/2026", "151", "AMAZON", "AMAZON", "600,00 €"],
  ["10/08/2026", "148", "ABC PORTAGE", "ABCPORTAGE", "21,48 €"],
  ["23/07/2026", "149", "Treinta y ocho", "3456", "-842,40 €"],
];

const pendingQuotes = [
  ["29/04/2026", "0001", "ALLIANCE HIGH TECH", "ALLIANCEHI", "49,37 €"],
  ["22/07/2025", "0012", "AMAZON", "AMAZON", "10,52 €"],
  ["22/07/2025", "0011", "AMAZON", "AMAZON", "11,70 €"],
];

function PaymentCard({ title, amount, icon, isFrench }: PaymentCardProps) {
  return (
    <Box className="dashboardSalesPurchases__paymentCard">
      <Box className="dashboardSalesPurchases__cardTitle" display="flex" alignItems="center">
        <Icon type={icon} aria-hidden />
        <Typography variant="h3" as="h3">{title}</Typography>
      </Box>
      <Typography variant="p" as="p" className="dashboardSalesPurchases__overdueAmount">
        {formatDashboardEuro(amount)} {isFrench ? "en retard" : "Overdue"}
      </Typography>
      <Box className="dashboardSalesPurchases__paymentBar" aria-hidden="true" />
      <Typography variant="strong" as="p" className="dashboardSalesPurchases__total">
        {formatDashboardEuro(amount)} {isFrench ? "Total" : "Total"}
      </Typography>
      <Box className="dashboardSalesPurchases__cardActions" display="flex">
        <Link to="/sales/invoices">{isFrench ? "Voir les éléments ouverts" : "View open items"}</Link>
        <Link to="/sales/invoices">{isFrench ? "Voir l’ancienneté du solde" : "View aging balance"}</Link>
      </Box>
    </Box>
  );
}

function DashboardTable({
  rows,
  quotes = false,
  isFrench,
}: {
  rows: string[][];
  quotes?: boolean;
  isFrench: boolean;
}) {
  const headers = quotes
    ? (isFrench ? ["Date du devis", "Numéro du devis", "Client", "Code client", "Total", "Actions"] : ["Quote date", "Quote number", "Customer", "Customer code", "Total", "Actions"])
    : (isFrench ? ["Statut", "Date de facture", "Numéro de facture", "Client", "Code client", "Total", "Actions"] : ["Status", "Invoice date", "Invoice number", "Customer", "Customer code", "Total", "Actions"]);
  return (
    <Box className="dashboardSalesPurchases__tableWrap">
      <table className="dashboardSalesPurchases__table">
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[1]}>
              {!quotes && <td><span className="dashboardSalesPurchases__status">{isFrench ? "En retard" : "Overdue"}</span></td>}
              {row.map((cell, index) => (
                <td key={`${row[1]}-${index}`} className={index === row.length - 1 ? "dashboardSalesPurchases__amount" : undefined}>
                  {index === 1 ? <Link to={quotes ? "/sales/quotes" : "/sales/invoices"}>{cell} ↗</Link> : cell}
                </td>
              ))}
              <td className="dashboardSalesPurchases__menu" aria-label={isFrench ? "Actions" : "Actions"}>⋮</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box className="dashboardSalesPurchases__tableFooter">{isFrench ? `Éléments : ${quotes ? 17 : 72}` : `Items: ${quotes ? 17 : 72}`}</Box>
    </Box>
  );
}

export default function DashboardSalesPurchases() {
  const { language } = useLanguage();
  const isFrench = language === "French";
  const summary = [
    ["sales", isFrench ? "Factures de vente" : "Sales invoices", "166 815,93 €", isFrench ? "Valeur totale des factures de vente comptabilisées depuis le début de l’exercice." : "The total of all posted invoices created in Sales invoices (fiscal year to date)."],
    ["purchases", isFrench ? "Factures d’achat" : "Purchase invoices", "145,53 €", isFrench ? "Valeur totale des factures d’achat comptabilisées depuis le début de l’exercice." : "The total of all posted invoices created in Purchase invoices (fiscal year to date)."],
    ["customers", isFrench ? "Clients actifs" : "Active customers", "83", isFrench ? "Le nombre total de clients actifs." : "The total number of active customers."],
  ];
  const quickLinks = isFrench
    ? ["Créer un client", "Créer un fournisseur", "Créer une facture de vente", "Importer une facture d’achat"]
    : ["Create a customer", "Create a supplier", "Create a sales invoice", "Upload a purchase invoice"];

  return (
    <Box className="dashboardSalesPurchases" display="flex" flexDirection="column">
      <Typography variant="h2" as="h2">{isFrench ? "Paiements en attente" : "Outstanding payments"}</Typography>
      <Box className="dashboardSalesPurchases__paymentGrid">
        <PaymentCard title={isFrench ? "Paiements clients en attente" : "Outstanding customer payments"} amount={1802526.86} icon="cash" isFrench={isFrench} />
        <PaymentCard title={isFrench ? "Paiements fournisseurs en attente" : "Outstanding supplier payments"} amount={635775.27} icon="business" isFrench={isFrench} />
      </Box>

      <Box className="dashboardSalesPurchases__summaryGrid">
        {summary.map(([id, title, value, description]) => (
          <Box className="dashboardSalesPurchases__summaryCard" key={id}>
            <Icon type={id === "customers" ? "people" : "cash"} aria-hidden />
            <Box><Typography variant="strong" as="p">{value}</Typography><Typography variant="p" as="p">{title}</Typography><small>{description}</small></Box>
          </Box>
        ))}
        <Box className="dashboardSalesPurchases__quickLinks">
          <Typography variant="h3" as="h3">{isFrench ? "Liens rapides" : "Quick links"}</Typography>
          {quickLinks.map((label) => <Link to="/sales/invoices" key={label}>{label}</Link>)}
        </Box>
      </Box>

      <Box className="dashboardSalesPurchases__tableCard">
        <Typography variant="h2" as="h2">{isFrench ? "Factures de vente en retard" : "Overdue sales invoices"}</Typography>
        <Typography variant="p" as="p">{isFrench ? "Voir toutes vos factures de vente en retard." : "View all of your overdue sales invoices."}</Typography>
        <DashboardTable rows={overdueInvoices} isFrench={isFrench} />
        <Box className="dashboardSalesPurchases__tableActions"><Link to="/sales/invoices">{isFrench ? "Voir toutes les factures" : "View all invoices"}</Link><Link to="/sales/invoices">{isFrench ? "Préparer les relances" : "Prepare reminders"}</Link></Box>
      </Box>

      <Box className="dashboardSalesPurchases__quotesGrid">
        <Box className="dashboardSalesPurchases__quoteSummary"><Typography variant="h3" as="h3">{isFrench ? "Devis en attente" : "Pending quotes"}</Typography><Typography variant="strong" as="p">325 576,27 €</Typography><Typography variant="p" as="p">{isFrench ? "Valeur totale des devis existants en attente." : "The total value of all existing pending quotes."}</Typography></Box>
        <Box className="dashboardSalesPurchases__tableCard"><Typography variant="h2" as="h2">{isFrench ? "Devis en attente" : "Pending quotes"}</Typography><Typography variant="p" as="p">{isFrench ? "Voir tous vos devis en attente." : "View all of your pending quotes."}</Typography><DashboardTable rows={pendingQuotes} quotes isFrench={isFrench} /><Box className="dashboardSalesPurchases__tableActions"><Link to="/sales/quotes">{isFrench ? "Voir tous les devis" : "View all quotes"}</Link><Link to="/sales/quotes">{isFrench ? "Préparer les relances" : "Prepare reminders"}</Link></Box></Box>
      </Box>
    </Box>
  );
}
