"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("fs/promises");
// Definición de la función handler
const handler = (req, res) => {
    // Lee el archivo "data.json" usando fs/promises
    // promesa que producirá un objeto Buffer cuando se complete su operación asíncrona.
    const p = (0, promises_1.readFile)("data.json");
    // Maneja la promesa para enviar los datos del archivo como respuesta
    // El método then se utiliza para registrar la función que se invocará si se resuelve la promesa
    p.then((data) => res.end(data, () => console.log("Archivo enviado")));
    // Maneja el error en caso de que ocurra
    // Una promesa rechazada es aquella en la que se ha producido un error. El método catch se
    // utiliza para registrar una función que maneja el error producido por una promesa rechazada
    p.catch((err) => {
        console.log(`Error: ${err.message}`);
        res.statusCode = 500;
        res.end();
    });
};
exports.handler = handler;
