"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicHandler = void 0;
// Definición de la función handler básica
const basicHandler = (req, resp) => {
    // Establecer el encabezado de la respuesta como texto plano
    resp.setHeader("Content-Type", "text/plain");
    // Iterar 10,000 veces para escribir mensajes en la respuesta
    for (let i = 0; i < 10000; i++) {
        // Verificar si el buffer de transmisión está lleno antes de escribir el mensaje
        if (resp.write(`Message: ${i}\n`)) {
            console.log("Stream buffer is at capacity");
        }
    }
    // Finalizar la respuesta
    resp.end("End");
};
exports.basicHandler = basicHandler;
