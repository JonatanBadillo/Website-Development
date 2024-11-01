import { Request, Response } from "express";
import { Videojuego } from './models';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'; // Importar el generador de UUID


// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
  // Definir la carpeta de destino y el nombre del archivo
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, '..', 'static', 'images');
    console.log(`Configurando destino de archivo en: ${destinationPath}`); // Mostrar la ruta de destino
    // Crear la carpeta si no existe
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    console.log(`Guardando archivo con nombre: ${file.originalname}`);
    cb(null, file.originalname);
  }
});
// Configurar multer con la configuración de storage
const upload = multer({ storage: storage }); 



// Obtener todos los videojuegos
export const getVideojuegos = async (req: Request, res: Response) => {
    try {
        const videojuegos = await Videojuego.findAll();
        res.json(videojuegos);
    } catch (error) {
        res.status(500).send('Error al obtener los videojuegos');
    }
};

// Agregar un nuevo videojuego
export const postVideojuego = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, precio, consolas } = req.body;
        const imagen = req.file ? `/images/${req.file.originalname}` : '';
        const nuevoVideojuego = await Videojuego.create({
            nombre,
            descripcion,
            precio: parseFloat(precio),
            consola: JSON.parse(consolas),
            imagen
        });
        res.json(nuevoVideojuego);
    } catch (error) {
        res.status(500).send('Error al agregar el videojuego');
    }
};

// Editar un videojuego
export const editVideojuego = async (req: Request, res: Response) => {
    try {
        const { id, nombre, descripcion, precio, consolas } = req.body;
        const imagen = req.file ? `/images/${req.file.originalname}` : '';
        const videojuego = await Videojuego.findByPk(id);

        if (videojuego) {
            videojuego.nombre = nombre;
            videojuego.descripcion = descripcion;
            videojuego.precio = parseFloat(precio);
            videojuego.consola = JSON.parse(consolas);
            videojuego.imagen = imagen || videojuego.imagen;
            await videojuego.save();
            res.json(videojuego);
        } else {
            res.status(404).send('Videojuego no encontrado.');
        }
    } catch (error) {
        res.status(500).send('Error al editar el videojuego');
    }
};

// Eliminar un videojuego
export const deleteVideojuego = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const videojuego = await Videojuego.findByPk(id);
        if (videojuego) {
            await videojuego.destroy();
            res.json({ message: 'Videojuego eliminado correctamente' });
        } else {
            res.status(404).send('Videojuego no encontrado.');
        }
    } catch (error) {
        res.status(500).send('Error al eliminar el videojuego');
    }
};


// Desinfección de datos
const sanitizeValue = (value: string) => {
  const matchPattern = /[&<>="'`]/g;
  const characterMappings: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "=": "&#x3D;",
      "'": "&#x27;",
      "`": "&#x60;"
  };
  return value?.replace(matchPattern, match => characterMappings[match]);
};


// Validar campos de un videojuego
const validateVideojuego = (nombre: string, descripcion: string, precio: string, consolas: string): { isValid: boolean, message: string } => {
  if (!nombre || !descripcion || !precio || !consolas) {
      return { isValid: false, message: "Todos los campos son obligatorios." };
  }
  if (nombre.length < 3) {
      return { isValid: false, message: "El nombre debe tener al menos 3 caracteres." };
  }
  if (isNaN(parseFloat(precio))) {
      return { isValid: false, message: "El precio debe ser un número válido." };
  }
  return { isValid: true, message: "" };
};




// Exportar la configuración de multer
export const uploadHandler = upload.single('imagen');



