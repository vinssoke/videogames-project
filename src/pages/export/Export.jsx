import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ref, onValue } from "firebase/database";
import { db } from "../../service/firebase";
import { saveFileInFormat } from "../../utils/file-export";
import "./Export.css";

const generateCSV = (data) => {
  if (!data.length) return "";
  const headers = ["usuario", "videojuego", "puntuacion", "comentario", "fecha"];
  const rows = data.map((row) => {
    const fecha = row.fecha ? `${row.fecha.dia}/${row.fecha.mes}/${row.fecha.anio}` : "";
    return [row.usuario, row.videojuego, row.puntuacion, row.comentario, fecha].join(",");
  });
  return [headers.join(","), ...rows].join("\n");
};

const generateXML = (data) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<resenas>\n';
  data.forEach((row) => {
    xml += `  <resena>\n`;
    xml += `    <usuario>${row.usuario}</usuario>\n`;
    xml += `    <videojuego>${row.videojuego}</videojuego>\n`;
    xml += `    <puntuacion>${row.puntuacion}</puntuacion>\n`;
    xml += `    <comentario>${row.comentario}</comentario>\n`;
    xml += `    <fecha>${row.fecha.dia}/${row.fecha.mes}/${row.fecha.anio}</fecha>\n`;
    xml += `  </resena>\n`;
  });
  xml += "</resenas>";
  return xml;
};

export default function ExportPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const dataRef = ref(db, "resenas");
    onValue(dataRef, (snapshot) => {
      const raw = snapshot.val();
      if (raw) {
        const list = Object.keys(raw).map((key) => ({ id: key, ...raw[key] }));
        setData(list);
      } else {
        setData([]);
      }
      setLoading(false);
    });
  }, []);

  const handleExportCSV = () => {
    const csv = generateCSV(data);
    saveFileInFormat("csv", csv, "resenas.csv");
  };

  const handleExportJSON = () => {
    saveFileInFormat("json", data, "resenas.json");
  };

  const handleExportXML = () => {
    const xml = generateXML(data);
    saveFileInFormat("xml", xml, "resenas.xml");
  };

  if (loading) {
    return <div className="export-page"><h2>Cargando datos...</h2></div>;
  }

  return (
    <div className="export-page">
      <h1>Exportar datos</h1>
      <p className="export-subtitle">Descarga los datos en el formato que necesites.</p>

      <div className="export-cards">
        <div className="export-card">
          <div className="export-card-header"><h2>CSV</h2></div>
          <p className="export-description">Compatible con Excel y hojas de cálculo.</p>
          <button className="btn-export" onClick={handleExportCSV}>↓ Descargar CSV</button>
        </div>
        <div className="export-card">
          <div className="export-card-header"><h2>JSON</h2></div>
          <p className="export-description">Formato para APIs y apps web.</p>
          <button className="btn-export" onClick={handleExportJSON}>↓ Descargar JSON</button>
        </div>
        <div className="export-card">
          <div className="export-card-header"><h2>XML</h2></div>
          <p className="export-description">Intercambio de datos entre sistemas.</p>
          <button className="btn-export" onClick={handleExportXML}>↓ Descargar XML</button>
        </div>
      </div>

      <div className="export-preview">
        <h3>Vista previa de datos ({data.length} reseñas)</h3>
        <pre className="export-preview-box">
          {data.length ? JSON.stringify(data, null, 2) : "No hay datos en Firebase"}
        </pre>
      </div>

      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button className="btn-export" onClick={() => navigate("/")}>← Volver a inicio</button>
      </div>
    </div>
  );
}