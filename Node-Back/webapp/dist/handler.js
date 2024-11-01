"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadHandler = exports.deleteVideojuego = exports.editVideojuego = exports.postVideojuego = exports.getVideojuegos = void 0;
const models_1 = require("./models");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
// Configuración de multer para manejar la subida de archivos
const storage = multer_1.default.diskStorage({
    // Definir la carpeta de destino y el nombre del archivo
    destination: (req, file, cb) => {
        const destinationPath = path_1.default.join(__dirname, '..', 'static', 'images');
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
const upload = (0, multer_1.default)({ storage: storage });
// Obtener todos los videojuegos
const getVideojuegos = async (req, res) => {
    try {
        const videojuegos = await models_1.Videojuego.findAll();
        res.json(videojuegos);
    }
    catch (error) {
        res.status(500).send('Error al obtener los videojuegos');
    }
};
exports.getVideojuegos = getVideojuegos;
// Agregar un nuevo videojuego
const postVideojuego = async (req, res) => {
    try {
        const { nombre, descripcion, precio, consolas } = req.body;
        const imagen = req.file ? `/images/${req.file.originalname}` : '';
        const nuevoVideojuego = await models_1.Videojuego.create({
            nombre,
            descripcion,
            precio: parseFloat(precio),
            consola: JSON.parse(consolas),
            imagen
        });
        res.json(nuevoVideojuego);
    }
    catch (error) {
        res.status(500).send('Error al agregar el videojuego');
    }
};
exports.postVideojuego = postVideojuego;
// Editar un videojuego
const editVideojuego = async (req, res) => {
    try {
        const { id, nombre, descripcion, precio, consolas } = req.body;
        const imagen = req.file ? `/images/${req.file.originalname}` : '';
        const videojuego = await models_1.Videojuego.findByPk(id);
        if (videojuego) {
            videojuego.nombre = nombre;
            videojuego.descripcion = descripcion;
            videojuego.precio = parseFloat(precio);
            videojuego.consola = JSON.parse(consolas);
            videojuego.imagen = imagen || videojuego.imagen;
            await videojuego.save();
            res.json(videojuego);
        }
        else {
            res.status(404).send('Videojuego no encontrado.');
        }
    }
    catch (error) {
        res.status(500).send('Error al editar el videojuego');
    }
};
exports.editVideojuego = editVideojuego;
// Eliminar un videojuego
const deleteVideojuego = async (req, res) => {
    try {
        const { id } = req.params;
        const videojuego = await models_1.Videojuego.findByPk(id);
        if (videojuego) {
            await videojuego.destroy();
            res.json({ message: 'Videojuego eliminado correctamente' });
        }
        else {
            res.status(404).send('Videojuego no encontrado.');
        }
    }
    catch (error) {
        res.status(500).send('Error al eliminar el videojuego');
    }
};
exports.deleteVideojuego = deleteVideojuego;
// Desinfección de datos
const sanitizeValue = (value) => {
    const matchPattern = /[&<>="'`]/g;
    const characterMappings = {
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
const validateVideojuego = (nombre, descripcion, precio, consolas) => {
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
exports.uploadHandler = upload.single('imagen');
