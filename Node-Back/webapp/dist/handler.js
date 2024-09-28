"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadHandler = exports.postVideojuego = exports.getVideojuegos = void 0;
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
// Función para agregar un nuevo videojuego
const postVideojuego = (req, res) => {
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
    const dataPath = path_1.default.join(__dirname, '..', '..', 'data', 'videojuegos.json');
    console.log(`Escribiendo nuevo videojuego en el archivo JSON`);
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
// Exportar la configuración de multer
exports.uploadHandler = upload.single('imagen');
