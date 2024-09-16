"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (req, resp) => {
    // Imprime los detalles de la solicitud en la consola
    console.log(`---- Método HTTP: ${req.method}, URL: ${req.url}`);
    console.log(`host: ${req.headers.host}`);
    console.log(`accept: ${req.headers.accept}`);
    console.log(`user-agent: ${req.headers["user-agent"]}`);
    // Envía la respuesta "Hello, World"
    resp.end("Hello, World");
};
exports.handler = handler;
