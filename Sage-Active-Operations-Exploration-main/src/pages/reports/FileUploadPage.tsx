import { useMemo, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import Icon from "carbon-react/lib/components/icon";
import { useLanguage } from "../../context/useLanguage";

type FileRow = {
  name: string;
  size: string;
  dateAdded: string;
  addedBy: string;
  status: string;
};

const initialFiles: FileRow[] = [
  {
    name: "Query (5).xlsx",
    size: "19.4 KB",
    dateAdded: "16/12/2025",
    addedBy: "Nadia Benhamed",
    status: "File uploaded",
  },
];

function describeFile(file: File): FileRow {
  const size = file.size < 1024 * 1024
    ? `${Math.max(0.1, file.size / 1024).toFixed(1)} KB`
    : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

  return {
    name: file.name,
    size,
    dateAdded: new Intl.DateTimeFormat("fr-FR").format(new Date()),
    addedBy: "Nadia Benhamed",
    status: "File uploaded",
  };
}

export default function FileUploadPage() {
  const { language } = useLanguage();
  const isFrench = language === "French";
  const copy = isFrench
    ? {
      title: "Gestion des fichiers",
      intro: "Téléversez et gérez les fichiers de votre entreprise. Vous pouvez téléverser des fichiers jusqu’à 20 Mo.",
      select: "Sélectionner un fichier",
      drop: "ou glissez-déposez votre fichier",
      searchLabel: "Rechercher des fichiers",
      searchPlaceholder: "Rechercher…",
      filter: "Filtrer",
      headers: ["Nom", "Taille du fichier", "Date d’ajout", "Ajouté par", "Statut du téléversement", "Voir", "Commentaires", "Supprimer"],
      uploaded: "Fichier téléversé",
      empty: "Aucun fichier trouvé.",
      items: "Articles",
      view: "Voir",
      comment: "Commenter",
      delete: "Supprimer",
    }
    : {
      title: "File management",
      intro: "Upload and manage files for your business. You can upload files up to 20 MB.",
      select: "Select file",
      drop: "or drag and drop your file",
      searchLabel: "Search files",
      searchPlaceholder: "Search…",
      filter: "Filter",
      headers: ["Name", "File size", "Date added", "Added by", "Upload status", "View", "Comments", "Delete"],
      uploaded: "File uploaded",
      empty: "No files found.",
      items: "Items",
      view: "View",
      comment: "Comment",
      delete: "Delete",
    };
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileRow[]>(initialFiles);
  const [query, setQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const visibleFiles = useMemo(
    () => files.filter((file) => file.name.toLowerCase().includes(query.toLowerCase())),
    [files, query],
  );

  const addFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles?.length) return;
    setFiles((current) => [...Array.from(selectedFiles).map(describeFile), ...current]);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    addFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  };

  return (
    <main className="fileUploadPage">
      <header className="fileUploadPage__header">
        <div>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>
      </header>

      <input ref={inputRef} type="file" hidden multiple onChange={handleInputChange} />
      <div
        className={`fileUploadPage__dropzone${isDragging ? " fileUploadPage__dropzone--dragging" : ""}`}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDragLeave={(event) => {
          if (event.currentTarget === event.target) setIsDragging(false);
        }}
        onDrop={handleDrop}
      >
        <button type="button" className="fileUploadPage__select" onClick={() => inputRef.current?.click()}>
          {copy.select}
        </button>
        <span>{copy.drop}</span>
      </div>

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
            {visibleFiles.map((file) => (
              <tr key={`${file.name}-${file.dateAdded}`}>
                <td>{file.name}</td>
                <td>{file.size}</td>
                <td>{file.dateAdded}</td>
                <td>{file.addedBy}</td>
                <td><span className="fileUploadPage__status">{isFrench ? copy.uploaded : file.status}</span></td>
                <td><button type="button" className="fileUploadPage__iconButton" aria-label={`${copy.view} ${file.name}`}><Icon type="view" aria-hidden /></button></td>
                <td><button type="button" className="fileUploadPage__iconButton" aria-label={`${copy.comment} ${file.name}`}><Icon type="chat" aria-hidden /></button></td>
                <td><button type="button" className="fileUploadPage__iconButton fileUploadPage__iconButton--delete" aria-label={`${copy.delete} ${file.name}`} onClick={() => setFiles((current) => current.filter((item) => item !== file))}><Icon type="bin" aria-hidden /></button></td>
              </tr>
            ))}
            {!visibleFiles.length && (
              <tr><td colSpan={8} className="fileUploadPage__empty">{copy.empty}</td></tr>
            )}
          </tbody>
          <tfoot>
            <tr><td colSpan={8}>{copy.items}: {visibleFiles.length}</td></tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}
