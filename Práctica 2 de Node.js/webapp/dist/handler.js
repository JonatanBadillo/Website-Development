"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("./promises");
//import { Worker } from "worker_threads";
const counter_cb_1 = require("./counter_cb");
// Declaración de variables
const total = 2000000000;
const iterations = 5;
let shared_counter = 0;
// Definición de la función handler
const handler = async (req, res) => {
    // Incrementa el contador compartido
    const request = shared_counter++;
    // Llama a la función Count para realizar el trabajo de las solicitudes
    (0, counter_cb_1.Count)(request, iterations, total, async (err, update) => {
        if (err !== null) {
            // En caso de error, muestra el mensaje de error, establece el código de estado 500 y finaliza la respuesta
            console.log(err);
            res.statusCode = 500;
            await res.end();
        }
        else if (update !== true) {
            // Si no hay error y no es la última iteración, muestra el mensaje en la consola y escribe el mensaje en la respuesta
            const msg = `Request: ${request}, Iteration: ${(update)}`;
            console.log(msg);
            await promises_1.writePromise.bind(res)(msg + "\n");
        }
        else {
            // Si no hay error y es la última iteración, finaliza la respuesta
            await promises_1.endPromise.bind(res)("Done");
        }
    });
};
exports.handler = handler;
