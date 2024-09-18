"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.defaultHandler = exports.redirectionHandler = void 0;
const redirectionHandler = (req, res) => {
    const fullUrl = `https://localhost:5500${req.originalUrl}`; // Redirigir a la misma ruta en HTTPS
    res.redirect(302, fullUrl); // Redirigir con un código de estado 302 (Found)
};
exports.redirectionHandler = redirectionHandler;
const defaultHandler = (req, res) => {
    // Obtiene el parámetro de ruta "name" si se proporciona
    const name = req.params.name;
    // Construye el saludo en base a si proporcionaron un nombre o no
    const greeting = name ? `Hello, ${name}!` : "Hello, stranger!";
    // Obtiene el puerto y el protocolo de la solicitud
    const port = req.socket.localPort;
    const protocol = req.protocol;
    // Construye el saludo completo con información adicional
    const fullGreeting = `${greeting} 
    You are connected via: ${protocol} on port: ${port}.`;
    res.status(200).send(fullGreeting); // Enviar una respuesta con un código de estado 200 (OK)
};
exports.defaultHandler = defaultHandler;
// Función de controlador para manejar solicitudes no encontradas
const notFoundHandler = (req, resp) => {
    resp.sendStatus(404); // Envía un código de estado 404 (Not Found)
};
exports.notFoundHandler = notFoundHandler;
