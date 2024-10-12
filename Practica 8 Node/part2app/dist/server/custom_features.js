"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditional = exports.partial = exports.style = void 0;
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
// La función 'conditional' toma una expresión, dos nombres de archivo y un contexto,
// y devuelve el contenido del archivo correspondiente según el resultado de la evaluación
// de la expresión. La evaluación de la expresión se realiza mediante la función 'evalFunc'.
const conditional = (expression, trueFile, falseFile, context, evalFunc) => {
    return (0, exports.partial)(evalFunc(expression) ? trueFile : falseFile, context);
};
exports.conditional = conditional;
