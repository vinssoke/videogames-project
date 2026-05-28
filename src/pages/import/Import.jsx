import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { importFileToInternalJson } from "../../utils/file-import";
import { ref, push, get } from "firebase/database";
import { db } from "../../service/firebase";
import "./Import.css";

// Convierte los datos parseados de cualquier formato a un array
// normalizado de reseñas listo para subir a Firebase
function normalizeToReseñas(data, format) {
  if (format === "xml") {
    // El XML llega como { resenas: { resena: [...] } }
    const resena = data?.resenas?.resena;
    if (!resena) return [];
    // Si solo hay una reseña, xmlNodeToObject devuelve un objeto, no un array
    const lista = Array.isArray(resena) ? resena : [resena];
    return lista.map((r) => ({
      usuario:    String(r.usuario    ?? ""),
      videojuego: String(r.videojuego ?? ""),
      puntuacion: Number(r.puntuacion ?? 0),
      comentario: String(r.comentario ?? ""),
      // La fecha viene como string "dia/mes/anio"
      fecha: parseFecha(String(r.fecha ?? "")),
    }));
  }

  if (format === "csv") {
    // El CSV llega como array de objetos con campos string
    return data.map((r) => ({
      usuario:    String(r.usuario    ?? ""),
      videojuego: String(r.videojuego ?? ""),
      puntuacion: Number(r.puntuacion ?? 0),
      comentario: String(r.comentario ?? ""),
      fecha: parseFecha(String(r.fecha ?? "")),
    }));
  }

  if (format === "json") {
    // El JSON llega como array con la estructura exacta de Firebase
    return data.map((r) => ({
      usuario:    String(r.usuario    ?? ""),
      videojuego: String(r.videojuego ?? ""),
      puntuacion: Number(r.puntuacion ?? 0),
      comentario: String(r.comentario ?? ""),
      fecha: r.fecha && typeof r.fecha === "object"
        ? { dia: Number(r.fecha.dia), mes: Number(r.fecha.mes), anio: Number(r.fecha.anio) }
        : parseFecha(String(r.fecha ?? "")),
    }));
  }

  return [];
}

// Convierte un string "dia/mes/anio" al objeto { dia, mes, anio }
function parseFecha(str) {
  const [dia, mes, anio] = str.split("/").map(Number);
  return { dia: dia || 0, mes: mes || 0, anio: anio || 0 };
}

export default function ImportPage() {
  const [importedData, setImportedData] = useState(null);
  const [format, setFormat] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const navigate = useNavigate();

  const handleImport = async () => {
    try {
      setError("");
      setUploadMsg("");
      const result = await importFileToInternalJson();
      setImportedData(result.data);
      setFileName(result.fileName);
      setFormat(result.format);
    } catch (err) {
      if (err?.name === "AbortError") return;
      setError(err.message || "Error al importar el archivo");
    }
  };

  // Genera una clave única por reseña para detectar duplicados
  const claveResena = (r) => `${r.usuario}|${r.videojuego}|${r.comentario}`;

  // Sube solo las reseñas que no existen ya en Firebase
  const handleUploadToFirebase = async () => {
    try {
      setUploading(true);
      setUploadMsg("");
      const resenas = normalizeToReseñas(importedData, format);
      if (!resenas.length) {
        setUploadMsg("No se encontraron reseñas válidas para importar.");
        return;
      }

      // Leemos las reseñas actuales de Firebase para comparar
      const resenaRef = ref(db, "resenas");
      const snapshot = await get(resenaRef);
      const existentes = snapshot.val() ? Object.values(snapshot.val()) : [];
      const clavesExistentes = new Set(existentes.map(claveResena));

      // Filtramos las que ya están
      const nuevas = resenas.filter((r) => !clavesExistentes.has(claveResena(r)));

      if (!nuevas.length) {
        setUploadMsg("⚠️ Todas las reseñas ya existen en Firebase, no se subió nada.");
        return;
      }

      for (const resena of nuevas) {
        await push(resenaRef, resena);
      }

      const omitidas = resenas.length - nuevas.length;
      setUploadMsg(
        `✅ ${nuevas.length} reseña(s) subidas correctamente.` +
        (omitidas > 0 ? ` (${omitidas} omitida(s) por duplicado)` : "")
      );
    } catch (err) {
      setUploadMsg("❌ Error al subir a Firebase: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Convierte cualquier valor de celda a string legible
  const cellValue = (val) => {
    if (val === null || val === undefined) return "";
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
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
              {headers.map((h) => <td key={h}>{cellValue(row[h])}</td>)}
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
        Selecciona un archivo CSV, JSON o XML para importarlo y subirlo a Firebase.
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

          {/* Botón para subir a Firebase */}
          <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
            <button className="btn-primary" onClick={handleUploadToFirebase} disabled={uploading}>
              {uploading ? "Subiendo..." : "☁ Subir a Firebase"}
            </button>
          </div>
          {uploadMsg && <p className="import-error" style={{ color: uploadMsg.startsWith("✅") ? "green" : "red" }}>{uploadMsg}</p>}
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