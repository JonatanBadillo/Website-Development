"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicHandler = void 0;
const basicHandler = (req, resp) => {
    // Establecer el encabezado de la respuesta como texto plano
    resp.setHeader("Content-Type", "text/plain");
    let i = 0;
    let canWrite = true;
    const writeData = () => {
        console.log("Comenzando a escribir datos");
        // Iterar hasta que se hayan escrito 10,000 mensajes o el buffer esté lleno
        do {
            canWrite = resp.write(`Mensaje: ${i++}\n`);
        } while (i < 10000 && canWrite);
        console.log("El buffer está lleno");
        // Verificar si se han escrito todos los mensajes
        if (i < 10000) {
            // Esperar al evento "drain" para continuar escribiendo
            resp.once("drain", () => {
                console.log("El buffer se ha vaciado");
                writeData();
            });
        }
        else {
            // Finalizar la respuesta
            resp.end("Fin");
        }
    };
    // Iniciar la escritura de datos
    writeData();
};
exports.basicHandler = basicHandler;
