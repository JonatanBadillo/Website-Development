"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
//import { readFile } from "fs/promises";
const promises_1 = require("./promises");
// Declaración de variables
const total = 2000000000;
const iterations = 5;
let shared_counter = 0;
// Definición de la función handler
const handler = async (req, res) => {
    const request = shared_counter++;
    // Bucle externo para las iteraciones
    for (let iter = 0; iter < iterations; iter++) {
        // Bucle interno para contar hasta el total
        for (let count = 0; count < total; count++) {
            count++;
        }
        // Mensaje a imprimir en cada iteración
        const msg = `Request: ${request}, Iteration: ${(iter)}`;
        console.log(msg);
        // Escribir el mensaje en la respuesta
        await promises_1.writePromise.bind(res)(msg + "\n");
    }
    // Finalizar la respuesta
    await promises_1.endPromise.bind(res)("Done");
};
exports.handler = handler;
