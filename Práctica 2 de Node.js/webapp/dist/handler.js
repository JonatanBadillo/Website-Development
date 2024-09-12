"use strict";
// import { handler } from './handler';
// import { IncomingMessage, ServerResponse } from "http";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("./promises");
const worker_threads_1 = require("worker_threads");
const total = 2000000000;
const iterations = 5;
let shared_counter = 0;
// Definición de la función handler
const handler = async (req, res) => {
    const request = shared_counter++;
    // Crear un nuevo worker para ejecutar el código en un hilo separado de trabajo
    // se crean subprocesos de trabajo
    const worker = new worker_threads_1.Worker(__dirname + "/count_worker.js", {
        workerData: {
            iterations,
            total,
            request
        }
    });
    // Manejar el evento "message" del worker
    worker.on("message", async (iter) => {
        const msg = `Request: ${request}, Iteration: ${(iter)}`;
        console.log(msg);
        await promises_1.writePromise.bind(res)(msg + "\n");
    });
    // Manejar el evento "exit" del worker
    worker.on("exit", async (code) => {
        if (code == 0) {
            await promises_1.endPromise.bind(res)("Done");
        }
        else {
            // En caso de error, establecer el código de estado 500 y finalizar la respuesta
            res.statusCode = 500;
            await res.end();
        }
    });
    // Manejar el evento "error" del worker
    worker.on("error", async (err) => {
        console.log(err);
        // En caso de error, establecer el código de estado 500 y finalizar la respuesta
        res.statusCode = 500;
        await res.end();
    });
};
exports.handler = handler;
