"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writePromise = exports.endPromise = void 0;
const http_1 = require("http");
const util_1 = require("util");
// Importamos la interfaz ServerResponse del módulo http
// Importamos la función promisify del módulo util
// Creamos una constante llamada endPromise que es igual a la función promisify
// aplicada al método end de la clase ServerResponse. También especificamos el tipo
// de dato que espera recibir como argumento (data) y el tipo de dato que devuelve (Promise<void>)
exports.endPromise = (0, util_1.promisify)(http_1.ServerResponse.prototype.end);
// Exportamos una constante llamada writePromise que es igual a la función promisify
// aplicada al método write de la clase ServerResponse. También especificamos el tipo
// de dato que espera recibir como argumento (data) y el tipo de dato que devuelve (Promise<void>)
exports.writePromise = (0, util_1.promisify)(http_1.ServerResponse.prototype.write);
