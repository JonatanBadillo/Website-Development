"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("fs/promises");
// Definición de la función handler
const handler = async (req, res) => {
    // Lee el archivo "data.json" usando fs/promises
    // promesa que producirá un objeto Buffer cuando se complete su operación asíncrona.
    const data = await (0, promises_1.readFile)("data.json");
    // Envía los datos del archivo como respuesta
    res.end(data, () => console.log("Archivo enviado"));
};
exports.handler = handler;
