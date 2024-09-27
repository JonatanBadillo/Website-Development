"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const expressApp = (0, express_1.default)();
const server = (0, http_1.createServer)(expressApp);
const port = 5000;
// Middleware para servir archivos estáticos desde la carpeta "static"
expressApp.use(express_1.default.static(path_1.default.join(__dirname, '..', 'static')));
expressApp.use(express_1.default.static("node_modules/bootstrap/dist"));
// Ruta para la raíz que redirige al index.html
expressApp.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'static', 'index.html'));
});
// Nueva ruta para obtener los datos del JSON
expressApp.get('/api/videojuegos', (req, res) => {
    const dataPath = path_1.default.join(__dirname, '..', '..', 'data', 'videojuegos.json');
    fs_1.default.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el json');
        }
        else {
            res.json(JSON.parse(data));
        }
    });
});
// Inicio del servidor
server.listen(port, () => console.log(`Servidor HTTP escuchando en el puerto ${port}`));
