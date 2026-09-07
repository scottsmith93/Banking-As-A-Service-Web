import { useMemo, useState } from "react";
import Icon from "carbon-react/lib/components/icon";
import { useLanguage } from "../context/useLanguage";

type FinancialDocument = {
  name: string;
  size: string;
  dateAdded: string;
  addedBy: string;
  status: string;
};

const documents: FinancialDocument[] = [
  {
    name: "Financial statements 2025.pdf",
    size: "2.4 MB",
    dateAdded: "16/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
  {
    name: "Tax return - manually exported.pdf",
    size: "516 KB",
    dateAdded: "12/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
  {
    name: "Report pack - Q4 2025.pdf",
    size: "1.6 MB",
    dateAdded: "10/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
  {
    name: "Accounts review video.mp4",
    size: "18.6 MB",
    dateAdded: "09/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
  {
    name: "Comments and action plan.pdf",
    size: "764 KB",
    dateAdded: "08/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
  {
    name: "Linked supporting documents.zip",
    size: "4.2 MB",
    dateAdded: "06/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
  {
    name: "Raw data for insight.xlsx",
    size: "284 KB",
    dateAdded: "05/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
];

export default function FinancialDocumentsPage() {
  const { language } = useLanguage();
  const isFrench = language === "French";
  const copy = isFrench
    ? {
      title: "Documents financiers",
      intro: "Documents et vidéos téléversés par votre comptable. De nouveaux documents financiers apparaîtront lorsqu’ils seront prêts.",
      searchLabel: "Rechercher des documents financiers",
      searchPlaceholder: "Rechercher…",
      filter: "Filtrer",
      headers: ["Nom", "Taille du fichier", "Date d’ajout", "Ajouté par", "Disponibilité", "Voir", "Commentaires"],
      status: "Disponible à la consultation",
      empty: "Aucun document financier trouvé.",
      items: "Articles",
      view: "Voir",
      comment: "Commenter",
    }
    : {
      title: "Financial documents",
      intro: "Documents and videos uploaded by your accountant for you. New financial documents will appear when they are ready for you.",
      searchLabel: "Search financial documents",
      searchPlaceholder: "Search…",
      filter: "Filter",
      headers: ["Name", "File size", "Date added", "Added by", "Availability", "View", "Comments"],
      status: "Available to view",
      empty: "No financial documents found.",
      items: "Items",
      view: "View",
      comment: "Comment",
    };
  const [query, setQuery] = useState("");
  const visibleDocuments = useMemo(
    () => documents.filter((document) => document.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <main className="fileUploadPage financialDocumentsPage">
      <header className="fileUploadPage__header">
        <div>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>
      </header>

      <div className="fileUploadPage__toolbar">
        <label className="fileUploadPage__search">
          <Icon type="search" aria-hidden />
          <span className="fileUploadPage__srOnly">{copy.searchLabel}</span>
          <input
            type="search"
            placeholder={copy.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <button type="button" className="fileUploadPage__filter">
          <Icon type="filter" aria-hidden />
          {copy.filter}
        </button>
      </div>

      <div className="fileUploadPage__tableWrap">
        <table className="fileUploadPage__table">
          <thead>
            <tr>
              {copy.headers.map((header) => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {visibleDocuments.map((document) => (
              <tr key={document.name}>
                <td>{document.name}</td>
                <td>{document.size}</td>
                <td>{document.dateAdded}</td>
                <td>{document.addedBy}</td>
                <td><span className="fileUploadPage__status">{isFrench ? copy.status : document.status}</span></td>
                <td><button type="button" className="fileUploadPage__iconButton" aria-label={`${copy.view} ${document.name}`}><Icon type="view" aria-hidden /></button></td>
                <td><button type="button" className="fileUploadPage__iconButton" aria-label={`${copy.comment} ${document.name}`}><Icon type="chat" aria-hidden /></button></td>
              </tr>
            ))}
            {!visibleDocuments.length && (
              <tr><td colSpan={7} className="fileUploadPage__empty">{copy.empty}</td></tr>
            )}
          </tbody>
          <tfoot>
            <tr><td colSpan={7}>{copy.items}: {visibleDocuments.length}</td></tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}
