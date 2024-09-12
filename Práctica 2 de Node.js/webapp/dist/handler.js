"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("./promises");
//import { Count } from "./counter_cb";
const count_promise_1 = require("./count_promise");
//import { Count } from "./counter_cb";
// Declaración de variables
const total = 2000000000;
const iterations = 5;
let shared_counter = 0;
// Definición de la función handler
const handler = async (req, res) => {
    // Incrementa el contador compartido
    const request = shared_counter++;
    try {
        // Llama a la función Count para realizar el trabajo de las solicitudes
        await (0, count_promise_1.Count)(request, iterations, total);
        // Mensaje a imprimir en cada iteración
        const msg = `Request: ${request}, Iterations: ${(iterations)}`;
        // Escribe el mensaje en la respuesta
        await promises_1.writePromise.bind(res)(msg + "\n");
        // Finaliza la respuesta
        await promises_1.endPromise.bind(res)("Done");
    }
    catch (err) {
        // En caso de error, muestra el mensaje de error, establece el código de estado 500 y finaliza la respuesta
        console.log(err);
        res.statusCode = 500;
        res.end();
    }
};
exports.handler = handler;
