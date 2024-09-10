"use strict";
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const fs_1 = require("fs");
// Definición de la función handler
const handler = (req, res) => {
    // Lee el archivo "data.json"
    (0, fs_1.readFile)("data.json", (err, data) => {
        if (err == null) {
            // Envía los datos del archivo como respuesta
            res.end(data, () => console.log("Archivo enviado"));
        }
        else {
            // En caso de error, muestra el mensaje de error y establece el código de estado 500
            console.log(`Error: ${err.message}`);
            res.statusCode = 500;
            res.end();
        }
    });
};
exports.handler = handler;
