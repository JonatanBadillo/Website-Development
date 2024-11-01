"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const https_1 = require("https");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const handler_1 = require("./handler"); // Importar las funciones de handler.ts
const database_1 = require("./database");
database_1.sequelize.sync().then(() => {
    console.log("Base de datos sincronizada.");
}).catch(err => {
    console.error("Error al sincronizar la base de datos:", err);
});
const expressApp = (0, express_1.default)();
const httpPort = 5000; // Puerto para HTTP
const httpsPort = 5050; // Puerto para HTTPS
// Cargar certificados
const privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'key.pem'), 'utf8');
const certificate = fs_1.default.readFileSync(path_1.default.join(__dirname, '..', 'cert.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };
// para servir archivos estáticos
expressApp.use(express_1.default.static(path_1.default.join(__dirname, '..', 'static')));
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
// Ruta para la raíz
expressApp.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'static', 'index.html'));
});
// Ruta para obtener los videojuegos
expressApp.get('/api/videojuegos', handler_1.getVideojuegos);
// Ruta para agregar un nuevo videojuego
expressApp.post('/api/videojuegos', handler_1.uploadHandler, handler_1.postVideojuego);
// Ruta para editar un videojuego
expressApp.put('/api/videojuegos', handler_1.uploadHandler, handler_1.editVideojuego);
// Ruta para eliminar un videojuego
expressApp.delete('/api/videojuegos/:id', handler_1.deleteVideojuego);
// Crear servidor HTTPS
const httpsServer = (0, https_1.createServer)(credentials, expressApp);
httpsServer.listen(httpsPort, () => {
    console.log(`Servidor HTTPS escuchando en el puerto ${httpsPort}`);
});
// Crear servidor HTTP y redirigir a HTTPS
const httpServer = (0, http_1.createServer)(expressApp);
httpServer.listen(httpPort, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${httpPort}`);
});
// Redirigir HTTP a HTTPS
httpServer.on('request', (req, res) => {
    const host = req.headers.host; // Obtener el host
    if (host) { // Verificar que host no sea undefined
        res.writeHead(301, { Location: `https://${host.replace(httpPort.toString(), httpsPort.toString())}${req.url}` });
        res.end(); // Aquí cerramos la respuesta inmediatamente después de enviar la redirección
    }
    else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error: Host no definido');
    }
});
