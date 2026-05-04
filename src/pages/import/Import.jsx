import { useState } from "react";
import { importFileToInternalJson } from "../../utils/file-import";
import "./Import.css";

export default function ImportPage() {
  // Estado que guarda los datos del archivo importado (o null si no hay ninguno)
  const [importedData, setImportedData] = useState(null);

  // Estado para guardar mensajes de error
  const [error, setError] = useState("");

  // Estado para mostrar el nombre del archivo importado
  const [fileName, setFileName] = useState("");

  // Maneja el clic del botón "Importar archivo"
  // Abre el selector de archivos y procesa el resultado
  const handleImport = async () => {
    try {
      setError(""); // Limpiamos el error anterior

      // Llamamos a la utilidad que abre el selector y parsea el archivo
      const result = await importFileToInternalJson();

      // Guardamos los datos en el estado para mostrarlos
      setImportedData(result.data);
      setFileName(result.fileName);
    } catch (err) {
      // Si el usuario cancela el selector, no mostramos error
      if (err?.name === "AbortError") return;

      setError(err.message || "Error al importar el archivo");
    }
  };

  // Renderiza una tabla HTML si los datos son un array de objetos
  const renderTable = (data) => {
    // Comprobamos que sea un array con al menos un elemento
    if (!Array.isArray(data) || data.length === 0) return null;

    const headers = Object.keys(data[0]); // Las columnas son las claves del primer objeto

    return (
      <table className="import-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {headers.map((h) => (
                <td key={h}>{row[h]}</td>
              ))}
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
        <button className="btn-primary" onClick={handleImport}>
          ↑ Seleccionar archivo
        </button>
      </div>

   
      {error && <p className="import-error">{error}</p>}

      {importedData && (
        <div className="import-results">
          <div className="import-info">
            <span className="import-filename"> {fileName}</span>
            {Array.isArray(importedData) && (
              <span className="import-count">{importedData.length} filas</span>
            )}
          </div>

          {Array.isArray(importedData) ? (
            renderTable(importedData)
          ) : (
            // Si no es array (por ejemplo XML), mostramos el JSON crudo
            <pre className="import-json">
              {JSON.stringify(importedData, null, 2)}
            </pre>
          )}
        </div>
      )}
      {!importedData && !error && (
        <div className="import-empty">
          <p>No hay ningún archivo importado todavía.</p>
        </div>
      )}
    </div>
  );
}