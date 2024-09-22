"use strict";
// import { IncomingMessage, ServerResponse } from "http";
// export const readHandler = (req: IncomingMessage, resp: ServerResponse) => {
// // TODO - read request body
// resp.end();
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const stream_1 = require("stream");
// Exportamos la función readHandler que manejará la conducción de datos
const readHandler = async (req, resp) => {
    // Utilizamos el método pipe para conducir los datos de la solicitud al flujo de respuesta
    req.pipe(createLowerTransform()).pipe(resp);
};
exports.readHandler = readHandler;
// Creamos un transformador que convierte los datos a minúsculas
const createLowerTransform = () => new stream_1.Transform({
    // La función transform recibe los datos, la codificación y una función de devolución de llamada
    transform(data, encoding, callback) {
        // Convertimos los datos a minúsculas y los pasamos a través de la función de devolución de llamada
        callback(null, data.toString().toLowerCase());
    }
});
