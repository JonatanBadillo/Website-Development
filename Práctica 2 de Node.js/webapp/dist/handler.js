"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("fs/promises");
// Definición de la función handler
// Las API de promesa y devolución de llamada se pueden mezclar sin problemas, pero el
// resultado puede ser un código extraño.
const handler = async (req, res) => {
    try {
        // Lee el archivo "data.json" usando fs/promises
        const data = await (0, promises_1.readFile)("data.json"); // devuelve una promesa, por lo que se usa await
        // Envía los datos del archivo como respuesta
        res.end(data, () => console.log("File sent")); // utiliza callback para mostrar mensaje en consola
    }
    catch (err) {
        // En caso de error, muestra el mensaje de error y establece el código de estado 500
        console.log(`Error: ${err?.message ?? err}`);
        res.statusCode = 500;
        res.end();
    }
};
exports.handler = handler;
