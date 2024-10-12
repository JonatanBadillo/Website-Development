"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { createServer } from "http";
// import express, { Express } from "express";
// import { testHandler } from "./testHandler";
// import httpProxy from "http-proxy";
// import helmet from "helmet";
// const port = 5000;
// const expressApp: Express = express();
// const proxy = httpProxy.createProxyServer({
//   target: "http://localhost:5100",
//   ws: true,
// });
// expressApp.use(helmet());
// expressApp.use(express.json());
// expressApp.post("/test", testHandler);
// expressApp.use(express.static("static"));
// expressApp.use(express.static("node_modules/bootstrap/dist"));
// expressApp.use((req, resp) => proxy.web(req, resp));
// const server = createServer(expressApp);
// server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));
// server.listen(
//   port,() => console.log(`HTTP Server listening on port ${port}`)
// );
// Importamos los módulos necesarios
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const testHandler_1 = require("./testHandler");
const http_proxy_1 = __importDefault(require("http-proxy"));
const helmet_1 = __importDefault(require("helmet"));
const custom_engine_1 = require("./custom_engine");
// Definimos el puerto en el que el servidor escuchará
const port = 5000;
// Creamos una instancia de la aplicación Express
const expressApp = (0, express_1.default)();
// Configuramos el proxy para redirigir las solicitudes a otro servidor
const proxy = http_proxy_1.default.createProxyServer({
    target: "http://localhost:5100",
    ws: true,
});
// Registramos un motor de plantillas personalizado
(0, custom_engine_1.registerCustomTemplateEngine)(expressApp);
// Establecemos el directorio de vistas para las plantillas
expressApp.set("views", "templates/server");
// Usamos Helmet para mejorar la seguridad de la aplicación
expressApp.use((0, helmet_1.default)());
// Configuramos la aplicación para que pueda manejar JSON en las solicitudes
expressApp.use(express_1.default.json());
// Definimos una ruta dinámica que renderiza una plantilla personalizada
expressApp.get("/dynamic/:file", (req, resp) => {
    resp.render(`${req.params.file}.custom`, { message: "Hello template" });
});
// Definimos una ruta POST para manejar pruebas
expressApp.post("/test", testHandler_1.testHandler);
// Servimos archivos estáticos desde el directorio "static"
expressApp.use(express_1.default.static("static"));
// Servimos archivos estáticos desde el directorio de Bootstrap
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
// Usamos el proxy para redirigir cualquier otra solicitud
expressApp.use((req, resp) => proxy.web(req, resp));
// Creamos el servidor HTTP utilizando la aplicación Express
const server = (0, http_1.createServer)(expressApp);
// Configuramos el servidor para manejar actualizaciones de WebSocket
server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));
// Hacemos que el servidor escuche en el puerto definido
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
