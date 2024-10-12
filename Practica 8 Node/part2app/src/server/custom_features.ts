import { readFileSync } from "fs";

// La función 'style' toma el nombre de una hoja de estilos y devuelve una cadena de HTML
// que incluye un enlace a esa hoja de estilos.
export const style = (stylesheet: string) => {
 return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
}

// La función 'partial' toma el nombre de un archivo y un contexto, y devuelve el contenido
// del archivo leído como una cadena. El archivo se busca en el directorio de vistas definido
// en el contexto, con la extensión '.custom'.
export const partial = (file: string, context: any) => {
 const path = `./${context.settings.views}/${file}.custom`;
 return readFileSync(path, "utf-8");
}