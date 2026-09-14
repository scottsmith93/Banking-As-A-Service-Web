import { useMemo, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import Icon from "carbon-react/lib/components/icon";
import Pill from "carbon-react/lib/components/pill";
import { useLanguage } from "../../context/useLanguage";
import { getLocale } from "../../locales";

type FileRow = {
  name: string;
  nameKey?: string;
  size: string;
  dateAdded: string;
  addedBy: string;
  status: string;
};

const initialFiles: FileRow[] = [
  {
    name: "Query (5).xlsx",
    nameKey: "query5",
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
  const copy = getLocale(language).fileUpload;
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileRow[]>(initialFiles);
  const [query, setQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const getFileName = (file: FileRow) => file.nameKey
    ? copy.fileNames[file.nameKey as keyof typeof copy.fileNames]
    : file.name;

  const visibleFiles = useMemo(
    () => files.filter((file) => getFileName(file).toLowerCase().includes(query.toLowerCase())),
    [files, query, copy.fileNames],
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
        <table className="fileUploadPage__table fileUploadPage__table--upload">
          <thead>
            <tr>
              {copy.headers.map((header) => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {visibleFiles.map((file) => (
              <tr key={`${file.name}-${file.dateAdded}`}>
                <td>{getFileName(file)}</td>
                <td>{file.size}</td>
                <td>{file.dateAdded}</td>
                <td>{file.addedBy}</td>
                <td><Pill pillRole="status" colorVariant="positive" size="S">{copy.uploaded}</Pill></td>
                <td><button type="button" className="fileUploadPage__iconButton" aria-label={`${copy.view} ${getFileName(file)}`}><Icon type="view" aria-hidden /></button></td>
                <td><button type="button" className="fileUploadPage__iconButton" aria-label={`${copy.comment} ${getFileName(file)}`}><Icon type="chat" aria-hidden /></button></td>
                <td><button type="button" className="fileUploadPage__iconButton fileUploadPage__iconButton--delete" aria-label={`${copy.delete} ${getFileName(file)}`} onClick={() => setFiles((current) => current.filter((item) => item !== file))}><Icon type="bin" aria-hidden /></button></td>
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
