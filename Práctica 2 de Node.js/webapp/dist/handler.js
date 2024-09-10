"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// Definición de la función handler
const handler = (req, res) => {
    // Envía la respuesta "Hello World"
    res.end("Hello World");
};
exports.handler = handler;
