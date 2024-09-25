"use strict";
// // crea un servidor HTTP y escucha en el puerto especificado.
// import { handler } from "./handler"; // se importa manejador de solicitudes
// import { createServer } from "http"; // se importa la funcion para crear servidor
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // puerto en el que se va a ejecutar el servidor
// const port = 5000;
// // crear el servidor HTTP, con el manejador importado para crear servidor http
// const server = createServer(handler);
// // inicia el servidor : escuchando en el puerto especificado y muestre mensaje en consola
// server.listen(port, function(){
//     console.log(`Servidor escuchando en el puerto ${port}`);
// });
// import { createServer } from "http";
// import { handler } from "./handler";
// // Define el puerto en el que se va a ejecutar el servidor
// const port = 5000;
// // Crea el servidor HTTP
// const server = createServer();
// // Maneja las solicitudes entrantes
// server.on("request", (req, res) => {
//     // Verifica si la solicitud es para el archivo favicon.ico
//     if (req.url?.endsWith("favicon.ico")) {
//         // Si es así, responde con un código de estado 404 y finaliza la respuesta
//         res.statusCode = 404;
//         res.end();
//     } else {
//         // Si no es para el archivo favicon.ico, pasa la solicitud al manejador
//         handler(req, res);
//     }
// });
// // Inicia el servidor y lo pone a escuchar en el puerto especificado
// server.listen(port);
// // Muestra un mensaje en la consola cuando el servidor comienza a escuchar
// server.on("listening", () => {
//     console.log(`(Event) Server listening on port ${port}`);
// });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { createServer } from "http";
// import { handler } from "./handler";
// const port = 5000;
// const server = createServer();
// server.on("request", handler);
// server.listen(port);
// server.on("listening", () => {
// console.log(`(Event) Server listening on port ${port}`);
// });
// import { createServer } from "http";
// import { handler } from "./handler";
// // Define el puerto en el que se va a ejecutar el servidor
// const port = 5000;
// // Crea el servidor HTTP
// const server = createServer(handler);
// //server.on("request", handler);
// // Inicia el servidor y lo pone a escuchar en el puerto especificado
// server.listen(port, () => console.log(`(Event) Server listening on port: ${port}`));
// //server.on("listening", () => {
// // console.log(`(Event) Server listening on port ${port}`);
// //});
// // Manejo de solicitudes HTTPS en el archivo server.ts en la carpeta src.
// import { createServer } from "http";
// import { handler } from "./handler";
// import { createServer as createHttpsServer } from "https";
// import { readFileSync } from "fs";
// // Define el puerto en el que se va a ejecutar el servidor HTTP
// const port = 5000;
// // Define el puerto en el que se va a ejecutar el servidor HTTPS
// const https_port = 5500;
// // Crea el servidor HTTP y asigna el manejador de solicitudes
// const server = createServer(handler);
// server.listen(port, () =>
//     console.log(`(Event) Server listening on port ${port}`)
// );
// // Configuración para el servidor HTTPS
// const httpsConfig = {
//     key: readFileSync("key.pem"), // Lee el archivo de clave privada
//     cert: readFileSync("cert.pem"), // Lee el archivo de certificado
// };
// // Crea el servidor HTTPS y asigna el manejador de solicitudes y la configuración
// const httpsServer = createHttpsServer(httpsConfig, handler);
// httpsServer.listen(https_port, () =>
//     console.log(`HTTPS Server listening on port ${https_port}`)
// );
// // Aplicación de un controlador en el archivo server.ts en la carpeta src.
// import { createServer } from "http";
// import { handler, redirectionHandler } from "./handler";
// import { createServer as createHttpsServer } from "https";
// import { readFileSync } from "fs";
// // Define el puerto en el que se va a ejecutar el servidor HTTP
// const port = 5000;
// // Define el puerto en el que se va a ejecutar el servidor HTTPS
// const https_port = 5500;
// // Crea el servidor HTTP y asigna el manejador de redirección de solicitudes
// const server = createServer(redirectionHandler);
// server.listen(port, () =>
//     console.log(`(Event) Server listening on port ${port}`)
// );
// // Configuración para el servidor HTTPS
// const httpsConfig = {
//     key: readFileSync("key.pem"), // Lee el archivo de clave privada
//     cert: readFileSync("cert.pem"), // Lee el archivo de certificado
// };
// // Crea el servidor HTTPS y asigna el manejador de solicitudes y la configuración
// const httpsServer = createHttpsServer(httpsConfig, handler);
// httpsServer.listen(https_port, () =>
//     console.log(`HTTPS Server listening on port ${https_port}`)
// );
// import { createServer } from "http";
// import {
//   redirectionHandler,
//   newUrlHandler,
//   defaultHandler,
//   notFoundHandler,
// } from "./handler";
// import { createServer as createHttpsServer } from "https";
// import { readFileSync } from "fs";
// import express, { Express } from "express";
// const port = 5000;
// const https_port = 5500;
// const server = createServer(redirectionHandler);
// // Inicia el servidor HTTP y lo pone a escuchar en el puerto especificado
// server.listen(port, () =>
//     console.log(`(Event) Server listening on port ${port}`)
// );
// // Configuración para el servidor HTTPS
// const httpsConfig = {
//     key: readFileSync("key.pem"), // Lee el archivo de clave privada
//     cert: readFileSync("cert.pem"), // Lee el archivo de certificado
// };
// // Crea una instancia de Express
// const expressApp: Express = express();
// // Configura las rutas y los manejadores de las solicitudes
// expressApp.get("/favicon.ico", notFoundHandler);
// expressApp.get("/newurl", newUrlHandler);
// expressApp.get("*", defaultHandler);
// // Crea el servidor HTTPS y asigna el manejador de solicitudes y la configuración
// const httpsServer = createHttpsServer(httpsConfig, expressApp);
// httpsServer.listen(https_port, () =>
//     console.log(`HTTPS Server listening on port ${https_port}`)
// );
// import { createServer } from "http";
// import express, { Express } from "express";
// import { basicHandler } from "./handler";
// // Define el puerto en el que se va a ejecutar el servidor
// const port = 5000;
// // Crea una instancia de Express
// const expressApp: Express = express();
// // Configura las rutas y los manejadores de las solicitudes
// expressApp.get("/favicon.ico", (req, resp) => {
//   resp.statusCode = 404;
//   resp.end();
// });
// // Configura el manejador de solicitudes predeterminado
// expressApp.get("*", basicHandler);
// // Crea el servidor HTTP y asigna la instancia de Express
// const server = createServer(expressApp);
// server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
// // Cómo agregar una ruta en el archivo server.ts de la carpeta src.
// import { createServer } from "http";
// import express, { Express } from "express";
// import { basicHandler } from "./handler";
// import { readHandler } from "./readHandler";
// const port = 5000;
// const expressApp: Express = express();
// // Configura la ruta para el archivo favicon.ico
// expressApp.get("/favicon.ico", (req, resp) => {
//   resp.statusCode = 404;
//   resp.end();
// });
// // Configura el manejador de solicitudes predeterminado
// expressApp.get("*", basicHandler);
// // Agrega una nueva ruta para la solicitud POST "/read"
// expressApp.post("/read", readHandler);
// // Crea el servidor HTTP y asigna la instancia de Express
// const server = createServer(expressApp);
// server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
// import { createServer } from "http";
// import express, {Express } from "express";
// //import { basicHandler } from "./handler";
// import { readHandler } from "./readHandler";
// const port = 5000;
// const expressApp: Express = express();
// //expressApp.get("/favicon.ico", (req, resp) => {
// // resp.statusCode = 404;
// // resp.end();
// //});
// //expressApp.get("*", basicHandler);
// expressApp.post("/read", readHandler);
// expressApp.use(express.static("static"));
// const server = createServer(expressApp);
// server.listen(port,
//  () => console.log(`HTTP Server listening on port ${port}`));
// import { createServer } from "http";
// import express, { Express } from "express";
// import { readHandler } from "./readHandler";
// const port = 5000;
// const expressApp: Express = express();
// expressApp.post("/read", readHandler);
// expressApp.use(express.static("static"));
// expressApp.use(express.static("node_modules/bootstrap/dist"));
// const server = createServer(expressApp);
// server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const readHandler_1 = require("./readHandler");
const port = 5000;
const expressApp = (0, express_1.default)();
// Middleware para analizar el cuerpo de la solicitud como JSON
expressApp.use(express_1.default.json());
// Ruta para la solicitud POST "/read"
expressApp.post("/read", readHandler_1.readHandler);
// Ruta para enviar el archivo "city.png"
expressApp.get("/sendcity", (req, resp) => {
    resp.sendFile("city.png", { root: "static" });
});
// Ruta para descargar el archivo "city.png"
expressApp.get("/downloadcity", (req, resp) => {
    resp.download("static/city.png");
});
// Ruta para devolver una respuesta JSON
expressApp.get("/json", (req, resp) => {
    resp.json("{name: Bancho}");
});
// Middleware para servir archivos estáticos desde la carpeta "static"
expressApp.use(express_1.default.static("static"));
// Middleware para servir archivos estáticos desde la carpeta "node_modules/bootstrap/dist"
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
// Crea el servidor HTTP y asigna la instancia de Express
const server = (0, http_1.createServer)(expressApp);
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
