import { createServer } from "http";
import express, { Express } from "express";
import { readHandler } from "./readHandler";

const port = 5000;

const expressApp: Express = express();

// Middleware para servir archivos estáticos
expressApp.use(express.static("static"));

// Manejo de solicitudes POST a la ruta "/read"
expressApp.post("/read", readHandler);

const server = createServer(expressApp);

server.listen(port, () => console.log(`Servidor HTTP escuchando en el puerto ${port}`));
