"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partial = exports.style = void 0;
const fs_1 = require("fs");
// La función 'style' toma el nombre de una hoja de estilos y devuelve una cadena de HTML
// que incluye un enlace a esa hoja de estilos.
const style = (stylesheet) => {
    return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
};
exports.style = style;
// La función 'partial' toma el nombre de un archivo y un contexto, y devuelve el contenido
// del archivo leído como una cadena. El archivo se busca en el directorio de vistas definido
// en el contexto, con la extensión '.custom'.
const partial = (file, context) => {
    const path = `./${context.settings.views}/${file}.custom`;
    return (0, fs_1.readFileSync)(path, "utf-8");
};
exports.partial = partial;
