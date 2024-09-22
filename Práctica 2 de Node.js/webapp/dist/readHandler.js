"use strict";
// import { IncomingMessage, ServerResponse } from "http";
// export const readHandler = (req: IncomingMessage, resp: ServerResponse) => {
// // TODO - read request body
// resp.end();
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
// Exportamos la función readHandler que manejará la lectura de datos
const readHandler = (req, resp) => {
    // Establecemos la codificación de la solicitud como "utf-8"
    req.setEncoding("utf-8");
    // Escuchamos el evento "data" para leer los datos de la solicitud
    req.on("data", (data) => {
        console.log(data); // Imprimimos los datos en la consola
    });
    // Escuchamos el evento "end" para indicar que se han leído todos los datos
    req.on("end", () => {
        console.log("End: all data read"); // Imprimimos un mensaje indicando que se han leído todos los datos
        resp.end(); // Finalizamos la respuesta
    });
};
exports.readHandler = readHandler;
