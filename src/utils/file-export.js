// Guarda un contenido en un archivo con el formato indicado
// Usa el selector nativo "Guardar como" del navegador
import { showSaveFilePicker } from "show-open-file-picker";
// guarda datos en un archivo
//   - format: "json" | "xml" | "csv"
//   - data: contenido a guardar
//       · Para JSON → objeto/array JS 
//       · Para XML  → string XML ya formateado
//       · Para CSV  → string CSV ya formateado
//   - fileName: nombre sugerido para el archivo guardado
export const saveFileInFormat = async (format, data, fileName = "datos") => {

  let description = "";   // Texto que aparece en el selector de archivos
  let acceptedType = {};  // Tipos MIME aceptados
  let content = "";       // Contenido final que se escribirá en el archivo

  // Configuramos todo según el formato elegido
  switch (format) {

    case "json":
      description = "JSON";
      acceptedType = { "application/json": [".json"] };
      // JSON.stringify convierte el objeto JS a texto con formato legible
      content = JSON.stringify(data, null, 2);
      break;

    case "xml":
      description = "XML";
      acceptedType = {
        "application/xml": [".xml"],
        "text/xml": [".xml"],
      };
      // El XML ya llega como string, lo pasamos tal cual
      content = data;
      break;

    case "csv":
      description = "CSV";
      acceptedType = { "text/csv": [".csv"] };
      // El CSV ya llega como string, lo pasamos tal cual
      content = data;
      break;

    default:
      throw new Error(`Formato no soportado: ${format}`);
  }

  // Abre el selector "Guardar como" del navegador
  const handle = await showSaveFilePicker({
    suggestedName: fileName,
    types: [
      {
        description: description,
        accept: acceptedType,
      },
    ],
  });

  // Creamos un stream de escritura y volcamos el contenido
  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close(); // ¡Importante! Sin close() el archivo queda corrupto
};