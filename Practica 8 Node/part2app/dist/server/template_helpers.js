"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOdd = exports.increment = exports.valueOrZero = exports.style = void 0;
// Función que genera una etiqueta de enlace a una hoja de estilos
const style = (stylesheet) => {
    return `<link href="/css/${stylesheet}" rel="stylesheet" />`;
};
exports.style = style;
// Función que retorna el valor dado o cero si es undefined
const valueOrZero = (value) => {
    return value !== undefined ? value : 0;
};
exports.valueOrZero = valueOrZero;
// Función que incrementa el valor dado en 1
const increment = (value) => {
    return Number((0, exports.valueOrZero)(value)) + 1;
};
exports.increment = increment;
// Función que verifica si el valor dado es impar
const isOdd = (value) => {
    return Number((0, exports.valueOrZero)(value)) % 2;
};
exports.isOdd = isOdd;
