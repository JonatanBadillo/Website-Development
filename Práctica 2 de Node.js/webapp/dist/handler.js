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
    // Parsea la URL de la solicitud y muestra sus componentes en la consola
    const parsedURL = new URL(req.url ?? "", `http://${req.headers.host}`); // URL es una clase global que se puede utilizar para analizar y construir URL
    console.log(`protocolo: ${parsedURL.protocol}`);
    console.log(`hostname: ${parsedURL.hostname}`);
    console.log(`puerto: ${parsedURL.port}`);
    console.log(`ruta: ${parsedURL.pathname}`);
    parsedURL.searchParams.forEach((val, key) => {
        console.log(`Parámetro de búsqueda: ${key}: ${val}`);
    });
    // Envía la respuesta "Hello, World"
    resp.end("Hello, World");
};
exports.handler = handler;
