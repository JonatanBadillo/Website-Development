"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const https_1 = require("https");
const fs_1 = require("fs");
const handler_1 = require("./handler");
const app = (0, express_1.default)();
const port = 5000;
const https_port = 5500;
// Manejo de redirección para HTTP  
app.get("*", handler_1.redirectionHandler); // Redirigir todas las solicitudes a HTTPS
// Configuración para el servidor HTTPS  
// Lee los archivos de clave y certificado para HTTPS
const httpsConfig = {
    key: (0, fs_1.readFileSync)("key.pem"),
    cert: (0, fs_1.readFileSync)("cert.pem")
};
// Crear servidor HTTPS utilizando Express
const httpsApp = (0, express_1.default)();
// Manejar el error 404 en el servidor HTTPS
httpsApp.get("/error", handler_1.notFoundHandler);
// Manejar todas las rutas en el servidor HTTPS
httpsApp.get("/:name?", handler_1.defaultHandler); // Maneja rutas con un parámetro opcional
// Iniciar el servidor HTTP  
app.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
// Iniciar el servidor HTTPS
const httpsServer = (0, https_1.createServer)(httpsConfig, httpsApp);
httpsServer.listen(https_port, () => console.log(`HTTPS Server listening on port ${https_port}`));
;
