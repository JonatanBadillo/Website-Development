import { createServer } from "http";
import express, { Express, Request, Response } from "express";
import path from 'path';
import fs from 'fs';
import multer from 'multer';

const expressApp: Express = express();
const server = createServer(expressApp);
const port = 5000;

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, path.join(__dirname, '..', 'static', 'images')); // Directorio de destino para guardar las imágenes subidas
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, file.originalname); // Nombre de archivo original para guardar la imagen
  }
});
const upload = multer({ storage: storage });

// Middleware para servir archivos estáticos
expressApp.use(express.static(path.join(__dirname, '..', 'static'))); // Servir archivos estáticos desde la carpeta "static"
expressApp.use(express.static("node_modules/bootstrap/dist")); // Servir archivos estáticos de Bootstrap desde la carpeta "node_modules"

// Ruta para la raíz
expressApp.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'static', 'index.html')); // Enviar el archivo "index.html" como respuesta
});

// Ruta para obtener los videojuegos
expressApp.get('/api/videojuegos', (req: Request, res: Response) => {
  const dataPath = path.join(__dirname, '..', '..', 'data', 'videojuegos.json'); // Ruta del archivo JSON de videojuegos

  // Mensaje de depuración
  console.log(`Intentando leer el archivo JSON en: ${dataPath}`);

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de datos:', err);
      return res.status(500).send('Error al leer el archivo de datos'); // Enviar respuesta de error si hay un problema al leer el archivo
    }

    try {
      const videojuegos = JSON.parse(data);
      res.json(videojuegos); // Enviar los videojuegos como respuesta en formato JSON
    } catch (parseError) {
      console.error('Error al parsear el JSON:', parseError);
      return res.status(500).send('Error al parsear el archivo de datos'); // Enviar respuesta de error si hay un problema al parsear el archivo JSON
    }
  });
});

// Ruta para agregar un nuevo videojuego
expressApp.post('/api/videojuegos', upload.single('imagen'), (req: Request, res: Response) => {
  const { nombre, descripcion, precio, consolas } = req.body;
  const imagen = req.file ? `/images/${req.file.originalname}` : '';

  if (!nombre || !descripcion || !precio || !consolas || !imagen) {
    return res.status(400).send('Todos los campos son obligatorios.'); // Enviar respuesta de error si falta algún campo obligatorio
  }

  const newVideojuego = {
    nombre,
    descripcion,
    precio: parseFloat(precio),
    consola: JSON.parse(consolas),
    imagen,
  };

  const dataPath = path.join(__dirname, '..', '..', 'data', 'videojuegos.json'); // Ruta del archivo JSON de videojuegos

  // Mensaje de depuración
  console.log(`Intentando escribir en el archivo JSON en: ${dataPath}`);

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de datos:', err);
      return res.status(500).send('Error al leer el archivo de datos'); // Enviar respuesta de error si hay un problema al leer el archivo
    }

    try {
      const videojuegos = JSON.parse(data);
      videojuegos.push(newVideojuego);

      fs.writeFile(dataPath, JSON.stringify(videojuegos, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error al guardar el videojuego:', writeErr);
          return res.status(500).send('Error al guardar el videojuego.'); // Enviar respuesta de error si hay un problema al guardar el videojuego
        }

        res.json(videojuegos); // Devolver la lista actualizada de videojuegos como respuesta
      });
    } catch (parseError) {
      console.error('Error al parsear el JSON:', parseError);
      return res.status(500).send('Error al parsear el archivo de datos'); // Enviar respuesta de error si hay un problema al parsear el archivo JSON
    }
  });
});

// Inicio del servidor
server.listen(port, () => console.log(`Servidor HTTP escuchando en el puerto ${port}`));
