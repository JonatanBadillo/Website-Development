import { Request, Response } from "express";
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, '..', 'static', 'images');
    console.log(`Configurando destino de archivo en: ${destinationPath}`);
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    console.log(`Guardando archivo con nombre: ${file.originalname}`);
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Función para obtener los videojuegos
export const getVideojuegos = (req: Request, res: Response) => {
  const dataPath = path.join(__dirname, '..', '..', 'data', 'videojuegos.json');

  console.log(`Leyendo el archivo JSON desde: ${dataPath}`);

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de datos:', err);
      return res.status(500).send('Error al leer el archivo de datos');
    }

    try {
      const videojuegos = JSON.parse(data);
      console.log(`Se encontraron ${videojuegos.length} videojuegos en el archivo JSON.`);
      res.json(videojuegos);
    } catch (parseError) {
      console.error('Error al parsear el JSON:', parseError);
      return res.status(500).send('Error al parsear el archivo de datos');
    }
  });
};

// Función para agregar un nuevo videojuego
export const postVideojuego = (req: Request, res: Response) => {
  const { nombre, descripcion, precio, consolas } = req.body;
  const imagen = req.file ? `/images/${req.file.originalname}` : '';

  console.log(`Intentando agregar un nuevo videojuego: ${nombre}`);

  if (!nombre || !descripcion || !precio || !consolas || !imagen) {
    console.error('Validación fallida: Todos los campos son obligatorios.');
    return res.status(400).send('Todos los campos son obligatorios.');
  }

  const newVideojuego = {
    nombre,
    descripcion,
    precio: parseFloat(precio),
    consola: JSON.parse(consolas),
    imagen,
  };

  const dataPath = path.join(__dirname, '..', '..', 'data', 'videojuegos.json');

  console.log(`Escribiendo nuevo videojuego en el archivo JSON`);

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de datos:', err);
      return res.status(500).send('Error al leer el archivo de datos');
    }

    try {
      const videojuegos = JSON.parse(data);
      videojuegos.push(newVideojuego);

      console.log(`Nuevo videojuego agregado. Total de videojuegos: ${videojuegos.length}`);

      fs.writeFile(dataPath, JSON.stringify(videojuegos, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error al guardar el videojuego:', writeErr);
          return res.status(500).send('Error al guardar el videojuego.');
        }

        console.log('Nuevo videojuego guardado exitosamente en el archivo JSON.');
        res.json(videojuegos);
      });
    } catch (parseError) {
      console.error('Error al parsear el JSON:', parseError);
      return res.status(500).send('Error al parsear el archivo de datos');
    }
  });
};

// Exportar la configuración de multer
export const uploadHandler = upload.single('imagen');
