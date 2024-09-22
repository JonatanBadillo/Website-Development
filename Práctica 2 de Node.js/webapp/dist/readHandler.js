"use strict";
// import { IncomingMessage, ServerResponse } from "http";
// export const readHandler = (req: IncomingMessage, resp: ServerResponse) => {
// // TODO - read request body
// resp.end();
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const stream_1 = require("stream");
// Definimos la función readHandler que manejará la lectura de datos
const readHandler = async (req, resp) => {
    // Verificamos si el tipo de contenido es JSON
    if (req.headers["content-type"] == "application/json") {
        // Conducimos los datos de la solicitud a través de un transformador que analiza el JSON
        req.pipe(createFromJsonTransform()).on("data", (payload) => {
            // Verificamos si el payload es un array
            if (payload instanceof Array) {
                resp.write(`Recibido un array con ${payload.length} elementos`);
            }
            else {
                resp.write("No se recibió un array");
            }
            resp.end(); // Finalizamos la respuesta
        });
    }
    else {
        // Si el tipo de contenido no es JSON, simplemente conducimos los datos de la solicitud a la respuesta
        req.pipe(resp);
    }
};
exports.readHandler = readHandler;
// Creamos un transformador que convierte los datos JSON en objetos JavaScript
const createFromJsonTransform = () => new stream_1.Transform({
    readableObjectMode: true,
    transform(data, encoding, callback) {
        // Analizamos los datos JSON y los pasamos a través de la función de devolución de llamada
        callback(null, JSON.parse(data));
    }
});
