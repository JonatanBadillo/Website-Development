"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // Importamos los módulos necesarios
// import { createServer } from "http";
// import express, { Express } from "express";
// import { testHandler } from "./testHandler";
// import httpProxy from "http-proxy";
// import helmet from "helmet";
// import { registerCustomTemplateEngine } from "./custom_engine";
// // Definimos el puerto en el que el servidor escuchará
// const port = 5000;
// // Creamos una instancia de la aplicación Express
// const expressApp: Express = express();
// // Configuramos el proxy para redirigir las solicitudes a otro servidor
// const proxy = httpProxy.createProxyServer({
//   target: "http://localhost:5100",
//   ws: true,
// });
// // Registramos un motor de plantillas personalizado
// registerCustomTemplateEngine(expressApp);
// // Establecemos el directorio de vistas para las plantillas
// expressApp.set("views", "templates/server");
// // Usamos Helmet para mejorar la seguridad de la aplicación
// expressApp.use(helmet());
// // Configuramos la aplicación para que pueda manejar JSON en las solicitudes
// expressApp.use(express.json());
// // Definimos una ruta dinámica que renderiza una plantilla personalizada
// expressApp.get("/dynamic/:file", (req, resp) => {
//   resp.render(`${req.params.file}.custom`, {
//     message: "Hello template",
//     req,
//   });
// });
// // Definimos una ruta POST para manejar pruebas
// expressApp.post("/test", testHandler);
// // Servimos archivos estáticos desde el directorio "static"
// expressApp.use(express.static("static"));
// // Servimos archivos estáticos desde el directorio de Bootstrap
// expressApp.use(express.static("node_modules/bootstrap/dist"));
// // Usamos el proxy para redirigir cualquier otra solicitud
// expressApp.use((req, resp) => proxy.web(req, resp));
// // Creamos el servidor HTTP utilizando la aplicación Express
// const server = createServer(expressApp);
// // Configuramos el servidor para manejar actualizaciones de WebSocket
// server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));
// // Hacemos que el servidor escuche en el puerto definido
// server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
// import { createServer } from "http";
// import express, {Express } from "express";
// import { testHandler } from "./testHandler";
// import httpProxy from "http-proxy";
// import helmet from "helmet";
// //import { registerCustomTemplateEngine } from "./custom_engine";
// import { engine } from "express-handlebars";
// import * as helpers from "./template_helpers";
// const port = 5000;
// const expressApp: Express = express();
// const proxy = httpProxy.createProxyServer({
// target: "http://localhost:5100", ws: true
// });
// //registerCustomTemplateEngine(expressApp);
// expressApp.set("views", "templates/server");
// expressApp.engine("handlebars", engine());
// expressApp.set("view engine", "handlebars");
// expressApp.use(helmet());
// expressApp.use(express.json());
// expressApp.get("/dynamic/:file", (req, resp) => {
// resp.render(`${req.params.file}.handlebars`,
// { message: "Hello template", req,
// helpers: { ...helpers }
// });
// });
// expressApp.post("/test", testHandler);
// expressApp.use(express.static("static"));
// expressApp.use(express.static("node_modules/bootstrap/dist"));
// expressApp.use((req, resp) => proxy.web(req, resp));
// const server = createServer(expressApp);
// server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head));
// server.listen(port,
// () => console.log(`HTTP Server listening on port ${port}`));
// import { createServer } from "http";
// import express, { Express } from "express";
// import { testHandler } from "./testHandler";
// import httpProxy from "http-proxy";
// import helmet from "helmet";
// import { engine } from "express-handlebars";
// import * as helpers from "./template_helpers";
// import { registerFormMiddleware, registerFormRoutes } from "./forms";
// const port = 5000;
// const expressApp: Express = express();
// const proxy = httpProxy.createProxyServer({
//   target: "http://localhost:5100",
//   ws: true,
// });
// expressApp.set("views", "templates/server");
// expressApp.engine("handlebars", engine());
// expressApp.set("view engine", "handlebars");
// expressApp.use(helmet());
// expressApp.use(express.json());
// registerFormMiddleware(expressApp);
// registerFormRoutes(expressApp);
// expressApp.get("/dynamic/:file", (req, resp) => {
//   resp.render(`${req.params.file}.handlebars`, {
//     message: "Hello template",
//     req,
//     helpers: { ...helpers },
//   });
// });
// expressApp.post("/test", testHandler);
// expressApp.use(express.static("static"));
// expressApp.use(express.static("node_modules/bootstrap/dist"));
// expressApp.use((req, resp) => proxy.web(req, resp));
// const server = createServer(expressApp);
// server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));
// server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
//////////////////////////////////////////////////////////////////////////////////////////////////
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const http_proxy_1 = __importDefault(require("http-proxy"));
const helmet_1 = __importDefault(require("helmet"));
const express_handlebars_1 = require("express-handlebars");
const forms_1 = require("./forms");
const port = 5000;
const expressApp = (0, express_1.default)();
const proxy = http_proxy_1.default.createProxyServer({
    target: "http://localhost:5100",
    ws: true,
});
expressApp.set("views", "templates/server");
expressApp.engine("handlebars", (0, express_handlebars_1.engine)());
expressApp.set("view engine", "handlebars");
expressApp.use((0, helmet_1.default)());
expressApp.use(express_1.default.json());
(0, forms_1.registerFormMiddleware)(expressApp);
(0, forms_1.registerFormRoutes)(expressApp);
expressApp.use("^/$", (req, resp) => resp.redirect("/form"));
expressApp.use(express_1.default.static("static"));
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
expressApp.use((req, resp) => proxy.web(req, resp));
const server = (0, http_1.createServer)(expressApp);
server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
