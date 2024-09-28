import { createServer } from "http";
import express, { Express } from "express";
import path from 'path';
import fs from 'fs';

const expressApp: Express = express();
const server = createServer(expressApp);
const port = 5000;

// Middleware para servir archivos estáticos desde la carpeta "static"
expressApp.use(express.static(path.join(__dirname, '..', 'static')));
expressApp.use(express.static("node_modules/bootstrap/dist"));

// Ruta para la raíz que redirige al index.html
expressApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'static', 'index.html'));
  console.log('Página de inicio enviada');
});

// Nueva ruta para obtener los datos del JSON
expressApp.get('/api/videojuegos', (req, res) => {
  const dataPath = path.join(__dirname, '..', '..', 'data', 'videojuegos.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer el json');
      console.error(err);
    } else {
      res.json(JSON.parse(data));
      console.log('Datos enviados');
    }
  });
});

// Inicio del servidor
server.listen(port, () => console.log(`Servidor HTTP escuchando en el puerto ${port}`));
