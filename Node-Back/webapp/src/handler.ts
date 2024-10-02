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

  const dataPath = path.join(__dirname, '..', '..', 'data', 'videojuegos.json');

  console.log(`Leyendo el archivo JSON desde: ${dataPath}`);

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de datos:', err);
      return res.status(500).send('Error al leer el archivo de datos');
    }

    try {
      // Parsear el archivo JSON y convertirlo en un array de objetos
      const videojuegos = JSON.parse(data);
      // Calcular el siguiente ID
      const nextId = videojuegos.length > 0 ? Math.max(...videojuegos.map((v: any) => v.id)) + 1 : 1;

      // Crear el nuevo videojuego
      const newVideojuego = {
        id: nextId, // ID numérico y consecutivo
        nombre,
        descripcion,
        precio: parseFloat(precio),
        consola: JSON.parse(consolas),
        imagen,
      };

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

// Función para editar un videojuego
export const editVideojuego = (req: Request, res: Response) => {
    const { id, nombre, descripcion, precio, consolas } = req.body;
    const imagen = req.file ? `/images/${req.file.originalname}` : '';

    console.log(`Intentando editar el videojuego con ID: ${id}`);

    if (!id || !nombre || !descripcion || !precio || !consolas) {
        console.error('Validación fallida: Todos los campos son obligatorios.');
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    const dataPath = path.join(__dirname, '..', '..', 'data', 'videojuegos.json');

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de datos:', err);
            return res.status(500).send('Error al leer el archivo de datos');
        }

        try {
            const videojuegos = JSON.parse(data);
            const index = videojuegos.findIndex((videojuego: any) => videojuego.id === Number(id));

            if (index === -1) {
                console.error(`Videojuego con ID ${id} no encontrado.`);
                return res.status(404).send('Videojuego no encontrado.');
            }

            // Actualizar los datos del videojuego
            videojuegos[index] = {
                id: videojuegos[index].id, // Mantener el ID existente
                nombre,
                descripcion,
                precio: parseFloat(precio),
                consola: JSON.parse(consolas),
                imagen: imagen || videojuegos[index].imagen, // Mantener la imagen existente si no se proporciona una nueva
            };

            console.log(`Videojuego con ID ${id} actualizado.`);

            fs.writeFile(dataPath, JSON.stringify(videojuegos, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error al guardar los cambios del videojuego:', writeErr);
                    return res.status(500).send('Error al guardar los cambios del videojuego.');
                }

                console.log('Videojuego editado exitosamente en el archivo JSON.');
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

// Función para eliminar un videojuego
export const deleteVideojuego = (req: Request, res: Response) => {
    const { id } = req.params;

    console.log(`Intentando eliminar el videojuego con ID: ${id}`);

    const dataPath = path.join(__dirname, '..', '..', 'data', 'videojuegos.json');

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de datos:', err);
            return res.status(500).send('Error al leer el archivo de datos');
        }

        try {
            const videojuegos = JSON.parse(data);
            const index = videojuegos.findIndex((videojuego: any) => videojuego.id === Number(id));

            if (index === -1) {
                console.error(`Videojuego con ID ${id} no encontrado.`);
                return res.status(404).send('Videojuego no encontrado.');
            }

            // Eliminar el videojuego del array
            videojuegos.splice(index, 1);

            console.log(`Videojuego con ID ${id} eliminado.`);

            fs.writeFile(dataPath, JSON.stringify(videojuegos, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error al guardar los cambios después de la eliminación:', writeErr);
                    return res.status(500).send('Error al guardar los cambios después de la eliminación.');
                }

                console.log('Videojuego eliminado exitosamente del archivo JSON.');
                res.json(videojuegos); // Devolver la lista actualizada de videojuegos
            });
        } catch (parseError) {
            console.error('Error al parsear el JSON:', parseError);
            return res.status(500).send('Error al parsear el archivo de datos');
        }
    });
};
