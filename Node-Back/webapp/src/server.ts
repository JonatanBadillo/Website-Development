import { createServer } from "http";
import express, { Express } from "express";
import path from 'path';

const expressApp: Express = express();

const server = createServer(expressApp);
const port = 5000;

// Middleware para servir archivos estáticos desde la carpeta "static"
expressApp.use(express.static(path.join(__dirname, '..', 'static')));  // ruta a ../static
expressApp.use(express.static("node_modules/bootstrap/dist"));

// Ruta para la raíz que redirige al index.html
expressApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'static', 'index.html')); 
});

// Inicio del servidor
server.listen(port, () => console.log(`Servidor HTTP escuchando en el puerto ${port}`));
