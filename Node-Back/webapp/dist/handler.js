"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideojuego = exports.uploadHandler = exports.editVideojuego = exports.postVideojuego = exports.getVideojuegos = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
// Configuración de multer para manejar la subida de archivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path_1.default.join(__dirname, '..', 'static', 'images');
        console.log(`Configurando destino de archivo en: ${destinationPath}`);
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        console.log(`Guardando archivo con nombre: ${file.originalname}`);
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
// Función para obtener los videojuegos
const getVideojuegos = (req, res) => {
    const dataPath = path_1.default.join(__dirname, '..', '..', 'data', 'videojuegos.json');
    console.log(`Leyendo el archivo JSON desde: ${dataPath}`);
    fs_1.default.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de datos:', err);
            return res.status(500).send('Error al leer el archivo de datos');
        }
        try {
            const videojuegos = JSON.parse(data);
            console.log(`Se encontraron ${videojuegos.length} videojuegos en el archivo JSON.`);
            res.json(videojuegos);
        }
        catch (parseError) {
            console.error('Error al parsear el JSON:', parseError);
            return res.status(500).send('Error al parsear el archivo de datos');
        }
    });
};
exports.getVideojuegos = getVideojuegos;
const uuid_1 = require("uuid"); // Importar el generador de UUID
// Función para agregar un nuevo videojuego
const postVideojuego = (req, res) => {
    const { nombre, descripcion, precio, consolas } = req.body;
    const imagen = req.file ? `/images/${req.file.originalname}` : '';
    console.log(`Intentando agregar un nuevo videojuego: ${nombre}`);
    if (!nombre || !descripcion || !precio || !consolas || !imagen) {
        console.error('Validación fallida: Todos los campos son obligatorios.');
        return res.status(400).send('Todos los campos son obligatorios.');
    }
    // Generar un ID único para el videojuego
    const newVideojuego = {
        id: (0, uuid_1.v4)(),
        nombre,
        descripcion,
        precio: parseFloat(precio),
        consola: JSON.parse(consolas),
        imagen,
    };
    const dataPath = path_1.default.join(__dirname, '..', '..', 'data', 'videojuegos.json');
    console.log(`Escribiendo nuevo videojuego en el archivo JSON: ${dataPath}`);
    fs_1.default.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de datos:', err);
            return res.status(500).send('Error al leer el archivo de datos');
        }
        try {
            const videojuegos = JSON.parse(data);
            videojuegos.push(newVideojuego);
            console.log(`Nuevo videojuego agregado. Total de videojuegos: ${videojuegos.length}`);
            fs_1.default.writeFile(dataPath, JSON.stringify(videojuegos, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error al guardar el videojuego:', writeErr);
                    return res.status(500).send('Error al guardar el videojuego.');
                }
                console.log('Nuevo videojuego guardado exitosamente en el archivo JSON.');
                res.json(videojuegos);
            });
        }
        catch (parseError) {
            console.error('Error al parsear el JSON:', parseError);
            return res.status(500).send('Error al parsear el archivo de datos');
        }
    });
};
exports.postVideojuego = postVideojuego;
// Función para editar un videojuego
const editVideojuego = (req, res) => {
    const { id, nombre, descripcion, precio, consolas } = req.body;
    const imagen = req.file ? `/images/${req.file.originalname}` : '';
    console.log(`Intentando editar el videojuego con ID: ${id}`);
    if (!id || !nombre || !descripcion || !precio || !consolas) {
        console.error('Validación fallida: Todos los campos son obligatorios.');
        return res.status(400).send('Todos los campos son obligatorios.');
    }
    const dataPath = path_1.default.join(__dirname, '..', '..', 'data', 'videojuegos.json');
    fs_1.default.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de datos:', err);
            return res.status(500).send('Error al leer el archivo de datos');
        }
        try {
            const videojuegos = JSON.parse(data);
            // Convertir el ID a número para asegurar que coincida con el ID en el archivo JSON
            const index = videojuegos.findIndex((videojuego) => videojuego.id === Number(id));
            if (index === -1) {
                console.error(`Videojuego con ID ${id} no encontrado.`);
                return res.status(404).send('Videojuego no encontrado.');
            }
            // Actualizar los datos del videojuego
            videojuegos[index] = {
                id: videojuegos[index].id,
                nombre,
                descripcion,
                precio: parseFloat(precio),
                consola: JSON.parse(consolas),
                imagen: imagen || videojuegos[index].imagen, // Mantener la imagen existente si no se proporciona una nueva
            };
            console.log(`Videojuego con ID ${id} actualizado.`);
            fs_1.default.writeFile(dataPath, JSON.stringify(videojuegos, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error al guardar los cambios del videojuego:', writeErr);
                    return res.status(500).send('Error al guardar los cambios del videojuego.');
                }
                console.log('Videojuego editado exitosamente en el archivo JSON.');
                res.json(videojuegos);
            });
        }
        catch (parseError) {
            console.error('Error al parsear el JSON:', parseError);
            return res.status(500).send('Error al parsear el archivo de datos');
        }
    });
};
exports.editVideojuego = editVideojuego;
// Exportar la configuración de multer
exports.uploadHandler = upload.single('imagen');
// Función para eliminar un videojuego
const deleteVideojuego = (req, res) => {
    const { id } = req.params;
    console.log(`Intentando eliminar el videojuego con ID: ${id}`);
    const dataPath = path_1.default.join(__dirname, '..', '..', 'data', 'videojuegos.json');
    fs_1.default.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de datos:', err);
            return res.status(500).send('Error al leer el archivo de datos');
        }
        try {
            const videojuegos = JSON.parse(data);
            const index = videojuegos.findIndex((videojuego) => videojuego.id === Number(id));
            if (index === -1) {
                console.error(`Videojuego con ID ${id} no encontrado.`);
                return res.status(404).send('Videojuego no encontrado.');
            }
            // Eliminar el videojuego del array
            videojuegos.splice(index, 1);
            console.log(`Videojuego con ID ${id} eliminado.`);
            fs_1.default.writeFile(dataPath, JSON.stringify(videojuegos, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error al guardar los cambios después de la eliminación:', writeErr);
                    return res.status(500).send('Error al guardar los cambios después de la eliminación.');
                }
                console.log('Videojuego eliminado exitosamente del archivo JSON.');
                res.json(videojuegos); // Devolver la lista actualizada de videojuegos
            });
        }
        catch (parseError) {
            console.error('Error al parsear el JSON:', parseError);
            return res.status(500).send('Error al parsear el archivo de datos');
        }
    });
};
exports.deleteVideojuego = deleteVideojuego;
