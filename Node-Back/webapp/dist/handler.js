"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadHandler = exports.deleteVideojuego = exports.editVideojuego = exports.postVideojuego = exports.getVideojuegos = void 0;
const models_1 = require("./models");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid"); // Importar el generador de UUID
// Configuración de multer para manejar la subida de archivos
const storage = multer_1.default.diskStorage({
    // Definir la carpeta de destino y el nombre del archivo
    destination: (req, file, cb) => {
        const destinationPath = path_1.default.join(__dirname, '..', 'static', 'images');
        console.log(`Configurando destino de archivo en: ${destinationPath}`);
        // Crear la carpeta si no existe
        if (!fs_1.default.existsSync(destinationPath)) {
            fs_1.default.mkdirSync(destinationPath, { recursive: true });
        }
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${(0, uuid_1.v4)()}-${file.originalname}`;
        console.log(`Guardando archivo con nombre: ${uniqueSuffix}`);
        cb(null, uniqueSuffix);
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
        console.error('Error al obtener los videojuegos:', error);
        res.status(500).send('Error al obtener los videojuegos');
    }
};
exports.getVideojuegos = getVideojuegos;
// Agregar un nuevo videojuego
const postVideojuego = async (req, res) => {
    try {
        const { nombre, descripcion, precio, consolas } = req.body;
        const imagen = req.file ? `/images/${req.file.filename}` : '';
        // Validación de campos
        const validation = validateVideojuego(nombre, descripcion, precio, consolas);
        if (!validation.isValid) {
            return res.status(400).send(validation.message);
        }
        const nuevoVideojuego = await models_1.Videojuego.create({
            nombre: sanitizeValue(nombre),
            descripcion: sanitizeValue(descripcion),
            precio: parseFloat(precio),
            consola: JSON.parse(consolas),
            imagen
        });
        res.json(nuevoVideojuego);
    }
    catch (error) {
        console.error('Error al agregar el videojuego:', error);
        res.status(500).send('Error al agregar el videojuego');
    }
};
exports.postVideojuego = postVideojuego;
// Editar un videojuego
const editVideojuego = async (req, res) => {
    try {
        const { id, nombre, descripcion, precio, consolas } = req.body;
        const imagen = req.file ? `/images/${req.file.filename}` : '';
        // Validación de campos
        const validation = validateVideojuego(nombre, descripcion, precio, consolas);
        if (!validation.isValid) {
            return res.status(400).send(validation.message);
        }
        const videojuego = await models_1.Videojuego.findByPk(id);
        if (videojuego) {
            videojuego.nombre = sanitizeValue(nombre);
            videojuego.descripcion = sanitizeValue(descripcion);
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
        console.error('Error al editar el videojuego:', error);
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
        console.error('Error al eliminar el videojuego:', error);
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
