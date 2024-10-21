import { Request, Response } from "express";
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

// Función para obtener los videojuegos
export const getVideojuegos = (req: Request, res: Response) => {
  // Ruta del archivo JSON
  const dataPath = path.join(__dirname, '..', '..', 'data', 'videojuegos.json');

  console.log(`Leyendo el archivo JSON desde: ${dataPath}`);

  // Leer el archivo JSON
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de datos:', err);
      return res.status(500).send('Error al leer el archivo de datos');
    }

    // Parsear el archivo JSON como un array de objetos y devolverlo como respuesta
    try {
      const videojuegos = JSON.parse(data);
      // Mostrar la cantidad de videojuegos encontrados
      console.log(`Se encontraron ${videojuegos.length} videojuegos en el archivo JSON.`); 
      res.json(videojuegos);
    } catch (parseError) {
      console.error('Error al parsear el JSON:', parseError);
      return res.status(500).send('Error al parsear el archivo de datos');
    }
  });
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


// Función para agregar un nuevo videojuego
export const postVideojuego = (req: Request, res: Response) => {
  const { nombre, descripcion, precio, consolas } = req.body;
  const imagen = req.file ? `/images/${req.file.originalname}` : '';

  // Validar los campos
  const validation = validateVideojuego(nombre, descripcion, precio, consolas);
  if (!validation.isValid) {
      return res.status(400).send(validation.message);
  }

  // Continuar con el flujo si la validación es exitosa
  const dataPath = path.join(__dirname, '..', '..', 'data', 'videojuegos.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error al leer el archivo de datos');
      
      try {
          const videojuegos = JSON.parse(data);
          const nextId = videojuegos.length > 0 ? Math.max(...videojuegos.map((v: any) => v.id)) + 1 : 1;
          const newVideojuego = {
              id: nextId,
              nombre: sanitizeValue(nombre),
              descripcion: sanitizeValue(descripcion),
              precio: parseFloat(precio),
              consola: JSON.parse(consolas),
              imagen,
          };
          videojuegos.push(newVideojuego);
          fs.writeFile(dataPath, JSON.stringify(videojuegos, null, 2), (writeErr) => {
              if (writeErr) return res.status(500).send('Error al guardar el videojuego');
              res.json(videojuegos);
          });
      } catch (parseError) {
          return res.status(500).send('Error al parsear el archivo de datos');
      }
  });
};



// Función para editar un videojuego
export const editVideojuego = (req: Request, res: Response) => {
  const { id, nombre, descripcion, precio, consolas } = req.body;
  const imagen = req.file ? `/images/${req.file.originalname}` : '';

  // Validar los campos
  const validation = validateVideojuego(nombre, descripcion, precio, consolas);
  if (!validation.isValid) {
      return res.status(400).send(validation.message);
  }

  const dataPath = path.join(__dirname, '..', '..', 'data', 'videojuegos.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error al leer el archivo de datos');

      try {
          const videojuegos = JSON.parse(data);
          const index = videojuegos.findIndex((videojuego: any) => videojuego.id === Number(id));

          if (index === -1) {
              return res.status(404).send('Videojuego no encontrado.');
          }

          // Actualizar el videojuego
          videojuegos[index] = {
              id: videojuegos[index].id,
              nombre: sanitizeValue(nombre),
              descripcion: sanitizeValue(descripcion),
              precio: parseFloat(precio),
              consola: JSON.parse(consolas),
              imagen: imagen || videojuegos[index].imagen,
          };

          fs.writeFile(dataPath, JSON.stringify(videojuegos, null, 2), (writeErr) => {
              if (writeErr) return res.status(500).send('Error al guardar los cambios.');
              res.json(videojuegos);
          });
      } catch (parseError) {
          return res.status(500).send('Error al parsear el archivo de datos');
      }
  });
};


// Exportar la configuración de multer
export const uploadHandler = upload.single('imagen');

// Función para eliminar un videojuego
export const deleteVideojuego = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
      return res.status(400).send('ID de videojuego no válido.');
  }

  const dataPath = path.join(__dirname, '..', '..', 'data', 'videojuegos.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) return res.status(500).send('Error al leer el archivo de datos');

      try {
          const videojuegos = JSON.parse(data);
          const index = videojuegos.findIndex((videojuego: any) => videojuego.id === Number(id));

          if (index === -1) {
              return res.status(404).send('Videojuego no encontrado.');
          }

          videojuegos.splice(index, 1);  // Eliminar el videojuego

          fs.writeFile(dataPath, JSON.stringify(videojuegos, null, 2), (writeErr) => {
              if (writeErr) return res.status(500).send('Error al guardar los cambios.');
              res.json(videojuegos);
          });
      } catch (parseError) {
          return res.status(500).send('Error al parsear el archivo de datos');
      }
  });
};

