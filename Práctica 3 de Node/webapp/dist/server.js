"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handler_1 = require("./handler");
const https_1 = require("https");
const fs_1 = require("fs");
const app = (0, express_1.default)();
const port = 5000;
const https_port = 5500;
// Manejo de redirección para HTTP  
app.get("*", handler_1.redirectionHandler);
// Crear servidor HTTPS  
const httpsConfig = {
    key: (0, fs_1.readFileSync)("key.pem"),
    cert: (0, fs_1.readFileSync)("cert.pem")
};
const httpsApp = (0, express_1.default)();
httpsApp.get("/", (req, res) => {
    res.send("Welcome to the secure server!");
});
httpsApp.get("/greet/:name?", handler_1.greetHandler); // Ruta con parámetro opcional
// Ruta con parámetro opcional  
const httpsServer = (0, https_1.createServer)(httpsConfig, httpsApp);
httpsServer.listen(https_port, () => console.log(`HTTPS Server listening on port ${https_port}`));
// Iniciar el servidor HTTP  
app.listen(port, () => console.log(`(Event) Server listening on port ${port}`));
