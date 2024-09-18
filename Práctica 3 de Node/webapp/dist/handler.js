"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHandler = exports.redirectionHandler = void 0;
const redirectionHandler = (req, res) => {
    const fullUrl = `https://localhost:5500${req.originalUrl}`; // Redirigir a la misma ruta en HTTPS
    res.redirect(302, fullUrl);
};
exports.redirectionHandler = redirectionHandler;
const defaultHandler = (req, res) => {
    const name = req.params.name; // Obtiene el parámetro de ruta si existe  
    const greeting = name ? `Hello, ${name}!` : "Hello, stranger!";
    res.status(200).send(greeting);
};
exports.defaultHandler = defaultHandler;
