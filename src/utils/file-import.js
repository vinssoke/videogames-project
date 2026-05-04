// Abre el selector de archivos del navegador y convierte
// el archivo elegido al formato JSON interno de la app
import { showOpenFilePicker } from "show-open-file-picker";
import Papa from "papaparse";

// Convierte un nodo XML a un objeto JS de forma recursiva
// Si el nodo no tiene hijos → devuelve su texto
// Si tiene hijos → devuelve un objeto con cada hijo como propiedad
function xmlNodeToObject(node) {
  const children = Array.from(node.children);

  // Nodo hoja: devolvemos el texto directamente
  if (children.length === 0) {
    return node.textContent?.trim() ?? "";
  }

  const result = {};

  for (const child of children) {
    const value = xmlNodeToObject(child); // Llamada recursiva

    // Si ya existe esa clave → la convertimos en array
    if (result[child.nodeName] !== undefined) {
      if (!Array.isArray(result[child.nodeName])) {
        result[child.nodeName] = [result[child.nodeName]];
      }
      result[child.nodeName].push(value);
    } else {
      result[child.nodeName] = value;
    }
  }

  return result;
}

// Convierte texto XML a un objeto JS
function xmlToJson(text) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "application/xml");

  // DOMParser no lanza error, pero añade un nodo <parsererror>
  const errorNode = xmlDoc.querySelector("parsererror");
  if (errorNode) throw new Error("XML inválido");

  const root = xmlDoc.documentElement;
  return { [root.nodeName]: xmlNodeToObject(root) };
}

// Convierte texto CSV a un array de objetos JS
// Usa PapaParse para manejar casos especiales
function csvToJson(text) {
  const result = Papa.parse(text, {
    header: true,        // Primera fila = cabeceras
    skipEmptyLines: true,
  });

  if (result.errors.length) throw new Error("CSV inválido");

  return result.data; // Array de objetos
}

// Devuelve la extensión de un nombre de archivo en minúsculas
function getExtension(fileName) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

// Elige el parser correcto según la extensión del archivo
function parseFileContent(extension, text) {
  switch (extension) {
    case "json":
      return JSON.parse(text);
    case "xml":
      return xmlToJson(text);
    case "csv":
      return csvToJson(text);
    default:
      throw new Error(`Formato no soportado: ${extension}`);
  }
}


// abre el selector de archivos nativo
// del navegador y devuelve el archivo parseado como JSON
//
// Devuelve un objeto con:
//   - fileName: nombre del archivo elegido
//   - format: extensión ("csv", "json" o "xml")
//   - data: contenido parseado como objeto/array JS

export async function importFileToInternalJson() {
  // Abre el selector de archivos (solo acepta csv, json, xml)
  const [fileHandle] = await showOpenFilePicker({
    multiple: false,
    types: [
      {
        description: "Archivos compatibles",
        accept: {
          "application/json": [".json"],
          "application/xml": [".xml"],
          "text/xml": [".xml"],
          "text/csv": [".csv"],
        },
      },
    ],
  });

  const file = await fileHandle.getFile();     // Objeto File del navegador
  const text = await file.text();              // Contenido como string
  const extension = getExtension(file.name);  // Extensión del archivo

  const data = parseFileContent(extension, text); // Parseamos según el tipo

  return {
    fileName: file.name,
    format: extension,
    data,
  };
}