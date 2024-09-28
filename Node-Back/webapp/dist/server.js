"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const expressApp = (0, express_1.default)();
const server = (0, http_1.createServer)(expressApp);
const port = 5000;
// Configuración de multer para manejar la subida de archivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '..', 'static', 'images')); // Directorio de destino para guardar las imágenes subidas
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Nombre de archivo original para guardar la imagen
    }
});
const upload = (0, multer_1.default)({ storage: storage });
// Middleware para servir archivos estáticos
expressApp.use(express_1.default.static(path_1.default.join(__dirname, '..', 'static'))); // Servir archivos estáticos desde la carpeta "static"
expressApp.use(express_1.default.static("node_modules/bootstrap/dist")); // Servir archivos estáticos de Bootstrap desde la carpeta "node_modules"
// Ruta para la raíz
expressApp.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', 'static', 'index.html')); // Enviar el archivo "index.html" como respuesta
});
// Ruta para obtener los videojuegos
expressApp.get('/api/videojuegos', (req, res) => {
    const dataPath = path_1.default.join(__dirname, '..', '..', 'data', 'videojuegos.json'); // Ruta del archivo JSON de videojuegos
    // Mensaje de depuración
    console.log(`Leyendo el archivo JSON`);
    fs_1.default.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de datos:', err);
            return res.status(500).send('Error al leer el archivo de datos'); // Enviar respuesta de error si hay un problema al leer el archivo
        }
        try {
            const videojuegos = JSON.parse(data);
            res.json(videojuegos); // Enviar los videojuegos como respuesta en formato JSON
        }
        catch (parseError) {
            console.error('Error al parsear el JSON:', parseError);
            return res.status(500).send('Error al parsear el archivo de datos'); // Enviar respuesta de error si hay un problema al parsear el archivo JSON
        }
    });
});
// Ruta para agregar un nuevo videojuego
expressApp.post('/api/videojuegos', upload.single('imagen'), (req, res) => {
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
        imagen, // Ruta de la imagen subida
    };
    const dataPath = path_1.default.join(__dirname, '..', '..', 'data', 'videojuegos.json'); // Ruta del archivo JSON de videojuegos
    // Mensaje de depuración
    console.log(`Escribiendo en el archivo JSON `);
    fs_1.default.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo de datos:', err);
            return res.status(500).send('Error al leer el archivo de datos'); // Enviar respuesta de error si hay un problema al leer el archivo
        }
        try {
            const videojuegos = JSON.parse(data);
            videojuegos.push(newVideojuego);
            fs_1.default.writeFile(dataPath, JSON.stringify(videojuegos, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error al guardar el videojuego:', writeErr);
                    return res.status(500).send('Error al guardar el videojuego.'); // Enviar respuesta de error si hay un problema al guardar el videojuego
                }
                res.json(videojuegos); // Devolver la lista actualizada de videojuegos como respuesta
            });
        }
        catch (parseError) {
            console.error('Error al parsear el JSON:', parseError);
            return res.status(500).send('Error al parsear el archivo de datos'); // Enviar respuesta de error si hay un problema al parsear el archivo JSON
        }
    });
});
// Inicio del servidor
server.listen(port, () => console.log(`Servidor HTTP escuchando en el puerto ${port}`));
