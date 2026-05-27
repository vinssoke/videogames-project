import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { importFileToInternalJson } from "../../utils/file-import";
import "./Import.css";

export default function ImportPage() {
  const [importedData, setImportedData] = useState(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const handleImport = async () => {
    try {
      setError("");
      const result = await importFileToInternalJson();
      setImportedData(result.data);
      setFileName(result.fileName);
    } catch (err) {
      if (err?.name === "AbortError") return;
      setError(err.message || "Error al importar el archivo");
    }
  };

  const renderTable = (data) => {
    if (!Array.isArray(data) || data.length === 0) return null;
    const headers = Object.keys(data[0]);
    return (
      <table className="import-table">
        <thead>
          <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {headers.map((h) => <td key={h}>{row[h]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="import-page">
      <h1>Importar archivo</h1>
      <p className="import-subtitle">
        Selecciona un archivo CSV, JSON o XML para importarlo y visualizarlo.
      </p>

      <div className="import-actions">
        <button className="btn-primary" onClick={handleImport}>↑ Seleccionar archivo</button>
      </div>

      {error && <p className="import-error">{error}</p>}

      {importedData && (
        <div className="import-results">
          <div className="import-info">
            <span className="import-filename">{fileName}</span>
            {Array.isArray(importedData) && (
              <span className="import-count">{importedData.length} filas</span>
            )}
          </div>
          {Array.isArray(importedData) ? (
            renderTable(importedData)
          ) : (
            <pre className="import-json">{JSON.stringify(importedData, null, 2)}</pre>
          )}
        </div>
      )}

      {!importedData && !error && (
        <div className="import-empty">
          <p>No hay ningún archivo importado todavía.</p>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button className="btn-primary" onClick={() => navigate("/")}>← Volver a inicio</button>
      </div>
    </div>
  );
}