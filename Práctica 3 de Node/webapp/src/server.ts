import { createServer } from "http";
import express, { Express } from "express";
import { readHandler } from "./readHandler";

const port = 5000;

const expressApp: Express = express();

// Middleware para servir archivos estáticos desde la carpeta "static"
expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));

// Manejo de solicitudes POST a la ruta "/read"
expressApp.post("/read", readHandler);

// Creación del servidor HTTP
const server = createServer(expressApp);

// Inicio del servidor
server.listen(port, () => console.log(`Servidor HTTP escuchando en el puerto ${port}`));
