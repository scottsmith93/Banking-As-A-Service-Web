import { useMemo, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import Icon from "carbon-react/lib/components/icon";

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
    addedBy: "Anna Marti",
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
    dateAdded: new Intl.DateTimeFormat("en-GB").format(new Date()),
    addedBy: "You",
    status: "File uploaded",
  };
}

export default function FileUploadPage() {
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
          <h1>File management</h1>
          <p>Upload and manage files for your business. You can upload files up to 20 MB.</p>
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
          Select file
        </button>
        <span>or drag and drop your file</span>
      </div>

      <div className="fileUploadPage__toolbar">
        <label className="fileUploadPage__search">
          <Icon type="search" aria-hidden />
          <span className="fileUploadPage__srOnly">Search files</span>
          <input
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <button type="button" className="fileUploadPage__filter">
          <Icon type="filter" aria-hidden />
          Filter
        </button>
      </div>

      <div className="fileUploadPage__tableWrap">
        <table className="fileUploadPage__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>File size</th>
              <th>Date added</th>
              <th>Added by</th>
              <th>Upload status</th>
              <th>View</th>
              <th>Comments</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {visibleFiles.map((file) => (
              <tr key={`${file.name}-${file.dateAdded}`}>
                <td>{file.name}</td>
                <td>{file.size}</td>
                <td>{file.dateAdded}</td>
                <td>{file.addedBy}</td>
                <td><span className="fileUploadPage__status">{file.status}</span></td>
                <td><button type="button" className="fileUploadPage__iconButton" aria-label={`View ${file.name}`}><Icon type="view" aria-hidden /></button></td>
                <td><button type="button" className="fileUploadPage__iconButton" aria-label={`Comment on ${file.name}`}><Icon type="chat" aria-hidden /></button></td>
                <td><button type="button" className="fileUploadPage__iconButton fileUploadPage__iconButton--delete" aria-label={`Delete ${file.name}`} onClick={() => setFiles((current) => current.filter((item) => item !== file))}><Icon type="bin" aria-hidden /></button></td>
              </tr>
            ))}
            {!visibleFiles.length && (
              <tr><td colSpan={8} className="fileUploadPage__empty">No files found.</td></tr>
            )}
          </tbody>
          <tfoot>
            <tr><td colSpan={8}>Items: {visibleFiles.length}</td></tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}
