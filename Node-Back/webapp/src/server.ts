import { createServer } from "http";
import { createServer as createHttpsServer } from "https";
import express, { Express } from "express";
import path from 'path';
import fs from 'fs';
import { getVideojuegos, postVideojuego, uploadHandler, editVideojuego, deleteVideojuego } from './handler'; // Importar las funciones de handler.ts

const expressApp: Express = express();
const httpPort = 5000; // Puerto para HTTP
const httpsPort = 5050; // Puerto para HTTPS

// Cargar certificados
const privateKey = fs.readFileSync(path.join(__dirname, '..', 'key.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, '..', 'cert.pem'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

// para servir archivos estáticos
expressApp.use(express.static(path.join(__dirname, '..', 'static')));
expressApp.use(express.static("node_modules/bootstrap/dist"));

// Ruta para la raíz
expressApp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'static', 'index.html'));
});

// Ruta para obtener los videojuegos
expressApp.get('/api/videojuegos', getVideojuegos);

// Ruta para agregar un nuevo videojuego
expressApp.post('/api/videojuegos', uploadHandler, postVideojuego);

// Ruta para editar un videojuego
expressApp.put('/api/videojuegos', uploadHandler, editVideojuego);

// Ruta para eliminar un videojuego
expressApp.delete('/api/videojuegos/:id', deleteVideojuego);

// Crear servidor HTTPS
const httpsServer = createHttpsServer(credentials, expressApp);
httpsServer.listen(httpsPort, () => {
  console.log(`Servidor HTTPS escuchando en el puerto ${httpsPort}`);
});

// Crear servidor HTTP y redirigir a HTTPS
const httpServer = createServer(expressApp);
httpServer.listen(httpPort, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${httpPort}`);
});

// Redirigir HTTP a HTTPS
httpServer.on('request', (req, res) => {
  const host = req.headers.host; // Obtener el host
  if (host) { // Verificar que host no sea undefined
    res.writeHead(301, { Location: `https://${host.replace(httpPort.toString(), httpsPort.toString())}${req.url}` });
    res.end(); // Aquí cerramos la respuesta inmediatamente después de enviar la redirección
  } else {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Error: Host no definido');
  }
});

