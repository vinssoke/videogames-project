import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../service/firebase";
import { saveFileInFormat } from "../../utils/file-export";
import "./Export.css";

const generateCSV = (data) => {
  if (!data.length) return "";

  const headers = Object.keys(data[0]).filter((h) => h !== "id");
  const rows = data.map((row) =>
    headers.map((h) => row[h]).join(",")
  );

  return [headers.join(","), ...rows].join("\n");
};

const generateXML = (data) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<municipios>\n';

  data.forEach((row) => {
    xml += "  <municipio>\n";
    Object.entries(row).forEach(([key, val]) => {
      if (key !== "id") {
        xml += `    <${key}>${val}</${key}>\n`;
      }
    });
    xml += "  </municipio>\n";
  });

  xml += "</municipios>";
  return xml;
};

export default function ExportPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const dataRef = ref(db, "municipios");

  onValue(dataRef, (snapshot) => {
    const raw = snapshot.val();

    console.log("🔥 RAW:", raw); 
    const firebaseData = raw?.municipios || raw;

    if (firebaseData) {
      const list = Object.keys(firebaseData).map((key) => ({
        id: key,
        ...firebaseData[key],
      }));
      setData(list);
    } else {
      setData([]);
    }

    setLoading(false);
  });
}, []);

  const handleExportCSV = () => {
    const csv = generateCSV(data);
    saveFileInFormat("csv", csv, "datos.csv");
  };

  const handleExportJSON = () => {
    saveFileInFormat("json", data, "datos.json");
  };

  const handleExportXML = () => {
    const xml = generateXML(data);
    saveFileInFormat("xml", xml, "datos.xml");
  };

  if (loading) {
    return (
      <div className="export-page">
        <h2>Cargando datos...</h2>
      </div>
    );
  }

  return (
    <div className="export-page">
      <h1>Exportar datos</h1>
      <p className="export-subtitle">
        Descarga los datos en el formato que necesites.
      </p>

      <div className="export-cards">
        <div className="export-card">
          <div className="export-card-header">
            <h2>CSV</h2>
          </div>
          <p className="export-description">
            Compatible con Excel y hojas de cálculo.
          </p>
          <button className="btn-export" onClick={handleExportCSV}>
            ↓ Descargar CSV
          </button>
        </div>

        <div className="export-card">
          <div className="export-card-header">
            <h2>JSON</h2>
          </div>
          <p className="export-description">
            Formato para APIs y apps web.
          </p>
          <button className="btn-export" onClick={handleExportJSON}>
            ↓ Descargar JSON
          </button>
        </div>

        <div className="export-card">
          <div className="export-card-header">
            <h2>XML</h2>
          </div>
          <p className="export-description">
            Intercambio de datos entre sistemas.
          </p>
          <button className="btn-export" onClick={handleExportXML}>
            ↓ Descargar XML
          </button>
        </div>
      </div>

      <div className="export-preview">
        <h3>Vista previa de datos</h3>
        <pre className="export-preview-box">
          {data.length
            ? JSON.stringify(data, null, 2)
            : "No hay datos en Firebase"}
        </pre>
      </div>
    </div>
  );
}