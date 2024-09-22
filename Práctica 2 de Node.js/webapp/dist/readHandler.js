"use strict";
// import { IncomingMessage, ServerResponse } from "http";
// export const readHandler = (req: IncomingMessage, resp: ServerResponse) => {
// // TODO - read request body
// resp.end();
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
// Definimos la función readHandler como una función asíncrona que manejará la lectura de datos
const readHandler = async (req, resp) => {
    // Establecemos la codificación de la solicitud como "utf-8"
    req.setEncoding("utf-8");
    // Iteramos de forma asíncrona sobre los datos de la solicitud
    for await (const data of req) {
        console.log(data); // Imprimimos los datos en la consola
    }
    console.log("End: all data read"); // Imprimimos un mensaje indicando que se han leído todos los datos
    resp.end(); // Finalizamos la respuesta
};
exports.readHandler = readHandler;
