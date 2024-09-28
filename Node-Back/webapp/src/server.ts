import { createServer } from "http";
import express, { Express } from "express";
import path from 'path';
import { getVideojuegos, postVideojuego, uploadHandler , editVideojuego ,deleteVideojuego } from './handler'; // Importar las funciones de handler.ts

const expressApp: Express = express();
const server = createServer(expressApp);
const port = 5000;

// Middleware para servir archivos estáticos
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


// Inicio del servidor
server.listen(port, () => console.log(`Servidor HTTP escuchando en el puerto ${port}`));
