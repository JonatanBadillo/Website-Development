"use strict";
// import { IncomingMessage, ServerResponse } from "http";
// export const readHandler = (req: IncomingMessage, resp: ServerResponse) => {
// // TODO - read request body
// resp.end();
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
// Definimos la función readHandler que manejará la lectura de datos
const readHandler = async (req, resp) => {
    // Verificamos si el tipo de contenido es JSON
    if (req.headers["content-type"] == "application/json") {
        const payload = req.body;
        // Verificamos si el payload es un array
        if (payload instanceof Array) {
            //resp.write(`Received an array with ${payload.length} items`)
            resp.json({ arraySize: payload.length });
        }
        else {
            resp.write("Did not receive an array");
        }
        resp.end();
    }
    else {
        req.pipe(resp);
    }
};
exports.readHandler = readHandler;
//const createFromJsonTransform = () => new Transform({
// readableObjectMode: true,
// transform(data, encoding, callback) {
// callback(null, JSON.parse(data));
// }
//});
