"use strict";
// import { IncomingMessage, ServerResponse } from "http";
// export const readHandler = (req: IncomingMessage, resp: ServerResponse) => {
// // TODO - read request body
// resp.end();
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
// Exportamos la función readHandler que manejará la conducción de datos
const readHandler = async (req, resp) => {
    req.pipe(resp); // Utilizamos el método pipe para conducir los datos de la solicitud al flujo de respuesta
};
exports.readHandler = readHandler;
