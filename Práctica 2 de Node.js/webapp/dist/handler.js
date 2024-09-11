"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("fs/promises");
const promises_2 = require("./promises");
// Definición de la función handler
const handler = async (req, res) => {
    try {
        // Lee el archivo "data.json" usando fs/promises
        const data = await (0, promises_1.readFile)("data.json");
        // Utiliza la función endPromise para enviar los datos del archivo como respuesta
        await promises_2.endPromise.bind(res)(data);
        console.log("Archivo enviado");
    }
    catch (err) {
        // En caso de error, muestra el mensaje de error y establece el código de estado 500
        console.log(`Error: ${err?.message ?? err}`);
        res.statusCode = 500;
        res.end();
    }
};
exports.handler = handler;
