import { useMemo, useState } from "react";
import Icon from "carbon-react/lib/components/icon";
import Pill from "carbon-react/lib/components/pill";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";

type FinancialDocument = {
  nameKey: string;
  size: string;
  dateAdded: string;
  addedBy: string;
  status: string;
};

const documents: FinancialDocument[] = [
  {
    nameKey: "financialStatements2025",
    size: "2.4 MB",
    dateAdded: "16/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
  {
    nameKey: "taxReturnManuallyExported",
    size: "516 KB",
    dateAdded: "12/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
  {
    nameKey: "reportPackQ42025",
    size: "1.6 MB",
    dateAdded: "10/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
  {
    nameKey: "accountsReviewVideo",
    size: "18.6 MB",
    dateAdded: "09/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
  {
    nameKey: "commentsAndActionPlan",
    size: "764 KB",
    dateAdded: "08/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
  {
    nameKey: "linkedSupportingDocuments",
    size: "4.2 MB",
    dateAdded: "06/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
  {
    nameKey: "rawDataForInsight",
    size: "284 KB",
    dateAdded: "05/12/2025",
    addedBy: "Claire Dubois, Accountant",
    status: "Available to view",
  },
];

export default function FinancialDocumentsPage() {
  const { language } = useLanguage();
  const copy = getLocale(language).financialDocuments;
  const [query, setQuery] = useState("");
  const getDocumentName = (document: FinancialDocument) => copy.fileNames[document.nameKey as keyof typeof copy.fileNames];
  const visibleDocuments = useMemo(
    () => documents.filter((document) => getDocumentName(document).toLowerCase().includes(query.toLowerCase())),
    [query, copy.fileNames],
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
        <table className="fileUploadPage__table fileUploadPage__table--financial">
          <thead>
            <tr>
              {copy.headers.map((header) => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {visibleDocuments.map((document) => (
              <tr key={document.nameKey}>
                <td>{getDocumentName(document)}</td>
                <td>{document.size}</td>
                <td>{document.dateAdded}</td>
                <td>{document.addedBy}</td>
                <td><Pill pillRole="status" colorVariant="positive" size="S">{copy.status}</Pill></td>
                <td><button type="button" className="fileUploadPage__iconButton" aria-label={`${copy.view} ${getDocumentName(document)}`}><Icon type="view" aria-hidden /></button></td>
                <td><button type="button" className="fileUploadPage__iconButton" aria-label={`${copy.comment} ${getDocumentName(document)}`}><Icon type="chat" aria-hidden /></button></td>
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
