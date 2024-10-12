import { readFile } from "fs";
import { Express } from "express";

// Función para renderizar una plantilla
const renderTemplate = (
  path: string, // Ruta del archivo de plantilla
  context: any, // Contexto con datos para la plantilla
  callback: (err: any, response: string | undefined) => void // Callback para manejar el resultado
) => {
  // Leer el archivo de plantilla
  readFile(path, (err, data) => {
    if (err != undefined) {
      // Si hay un error al leer el archivo, llamar al callback con un mensaje de error
      callback("Cannot generate content", undefined);
    } else {
      // Si se lee el archivo correctamente, procesar la plantilla y llamar al callback con el resultado
      callback(undefined, parseTemplate(data.toString(), context));
    }
  });
};

// Función para procesar la plantilla
const parseTemplate = (template: string, context: any) => {
  // Crear un contexto con las variables del contexto
  const ctx = Object.keys(context)
    .map((k) => `const ${k} = context.${k}`)
    .join(";");
  // Expresión regular para encontrar las variables en la plantilla
  const expr = /{{(.*)}}/gm;
  // Reemplazar las variables en la plantilla con los valores del contexto
  return template.toString().replaceAll(expr, (match, group) => {
    return eval(`${ctx};${group}`);
  });
};

// Función para registrar el motor de plantillas personalizado en una aplicación de Express
export const registerCustomTemplateEngine = (expressApp: Express) =>
  expressApp.engine("custom", renderTemplate);
