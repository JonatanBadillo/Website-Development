"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.greetHandler = exports.redirectionHandler = void 0;
const redirectionHandler = (req, res) => {
    res.redirect(302, "https://localhost:5500");
};
exports.redirectionHandler = redirectionHandler;
const greetHandler = (req, res) => {
    const name = req.params.name; // Obtiene el parámetro de ruta  
    const greeting = name ? `Hello, ${name}!` : "Hello, stranger!";
    res.status(200).send(greeting);
};
exports.greetHandler = greetHandler;
