"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHandler = exports.newUrlHandler = exports.notFoundHandler = exports.redirectionHandler = void 0;
//export const isHttps = (req: IncomingMessage) : boolean => {
// return req.socket instanceof TLSSocket && req.socket.encrypted;
//}
// Función de redireccionamiento para redirigir las solicitudes HTTP a HTTPS
const redirectionHandler = (req, resp) => {
    resp.writeHead(302, {
        Location: "https://localhost:5500", // Redirige a la URL HTTPS
    });
    resp.end();
};
exports.redirectionHandler = redirectionHandler;
// Función de controlador para manejar solicitudes no encontradas
const notFoundHandler = (req, resp) => {
    resp.sendStatus(404); // Envía un código de estado 404 (Not Found)
};
exports.notFoundHandler = notFoundHandler;
// Función de controlador para manejar la solicitud de una nueva URL
const newUrlHandler = (req, resp) => {
    resp.send("Hello, New URL"); // Envía la respuesta "Hello, New URL"
};
exports.newUrlHandler = newUrlHandler;
// Función de controlador predeterminada para manejar otras solicitudes
const defaultHandler = (req, resp) => {
    if (req.query.keyword) {
        resp.send(`Hello, ${req.query.keyword}`); // Si hay un parámetro "keyword" en la solicitud, envía la respuesta "Hello, {keyword}"
    }
    else {
        resp.send(`Hello, ${req.protocol.toUpperCase()}`); // Si no hay un parámetro "keyword" en la solicitud, envía la respuesta "Hello, {protocol}"
    }
};
exports.defaultHandler = defaultHandler;
