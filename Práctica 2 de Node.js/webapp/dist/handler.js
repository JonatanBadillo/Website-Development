"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("./promises");
// Declaración de variables
const total = 2000000000;
const iterations = 5;
let shared_counter = 0;
// Definición de la función handler
const handler = async (req, res) => {
    // Incrementa el contador compartido
    const request = shared_counter++;
    // Función recursiva para iterar
    const iterate = async (iter = 0) => {
        // Bucle interno para contar hasta el total
        for (let count = 0; count < total; count++) {
            count++;
        }
        // Mensaje a imprimir en cada iteración
        const msg = `Request: ${request}, Iteration: ${(iter)}`;
        console.log(msg);
        // Escribir el mensaje en la respuesta, mientras se espera a que se complete la operación
        await promises_1.writePromise.bind(res)(msg + "\n");
        // Verificar si es la última iteración
        if (iter == iterations - 1) {
            await promises_1.endPromise.bind(res)("Done");
        }
        else {
            // Llamar a la función iterate de forma asíncrona en la siguiente iteración
            setImmediate(() => iterate(++iter));
        }
    };
    // Llamar a la función iterate para iniciar las iteraciones
    iterate();
};
exports.handler = handler;
