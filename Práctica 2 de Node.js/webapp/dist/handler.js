"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const url_1 = require("url");
// Definición de la función handler
const handler = async (req, resp) => {
    // Parsea la URL de la solicitud y muestra sus componentes en la consola
    const parsedURL = new url_1.URL(req.url ?? "", `http://${req.headers.host}`);
    // Verifica si el método de la solicitud no es GET o si la ruta es "/favicon.ico"
    if (req.method !== "GET" || parsedURL.pathname == "/favicon.ico") {
        // Si no cumple las condiciones, responde con un código 404 y termina la respuesta
        resp.writeHead(404, "Not Found");
        resp.end();
        return;
    }
    else {
        // Si cumple las condiciones, responde con un código 200 y continúa con la generación de la respuesta
        resp.writeHead(200, "OK");
        // Verifica si la URL de la solicitud tiene el parámetro "keyword"
        if (!parsedURL.searchParams.has("keyword")) {
            // Si no tiene el parámetro "keyword", escribe "Hello, HTTP" en la respuesta
            resp.write("Hello, HTTP");
        }
        else {
            // Si tiene el parámetro "keyword", escribe "Hello, " seguido del valor del parámetro en la respuesta
            resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
        }
        // Termina la respuesta
        resp.end();
        return;
    }
};
exports.handler = handler;
