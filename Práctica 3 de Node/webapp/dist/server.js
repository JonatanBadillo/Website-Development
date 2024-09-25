"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const readHandler_1 = require("./readHandler");
const port = 5000;
const expressApp = (0, express_1.default)();
// Middleware para servir archivos estáticos desde la carpeta "static"
expressApp.use(express_1.default.static("static"));
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
// Manejo de solicitudes POST a la ruta "/read"
expressApp.post("/read", readHandler_1.readHandler);
// Creación del servidor HTTP
const server = (0, http_1.createServer)(expressApp);
// Inicio del servidor
server.listen(port, () => console.log(`Servidor HTTP escuchando en el puerto ${port}`));
