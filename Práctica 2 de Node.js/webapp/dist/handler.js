"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.isHttps = void 0;
const tls_1 = require("tls");
const url_1 = require("url");
// Función para verificar si la solicitud es HTTPS
const isHttps = (req) => {
    return req.socket instanceof tls_1.TLSSocket && req.socket.encrypted;
};
exports.isHttps = isHttps;
// Función de controlador para manejar la solicitud
const handler = (req, resp) => {
    // Verificar el protocolo de la solicitud (HTTP o HTTPS)
    const protocol = (0, exports.isHttps)(req) ? "https" : "http";
    // Parsear la URL de la solicitud
    const parsedURL = new url_1.URL(req.url ?? "", `${protocol}://${req.headers.host}`);
    // Verificar si la solicitud no es GET o si la ruta es "/favicon.ico"
    if (req.method !== "GET" || parsedURL.pathname == "/favicon.ico") {
        // Responder con un código 404 y terminar la respuesta
        resp.writeHead(404, "Not Found");
        resp.end();
        return;
    }
    else {
        // Responder con un código 200 y continuar con la generación de la respuesta
        resp.writeHead(200, "OK");
        // Verificar si la URL de la solicitud tiene el parámetro "keyword"
        if (!parsedURL.searchParams.has("keyword")) {
            // Si no tiene el parámetro "keyword", escribir "Hello, HTTP" en la respuesta
            resp.write(`Hello, ${protocol.toUpperCase()}`);
        }
        else {
            // Si tiene el parámetro "keyword", escribir "Hello, " seguido del valor del parámetro en la respuesta
            resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
        }
        // Terminar la respuesta
        resp.end();
        return;
    }
};
exports.handler = handler;
