"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Count = void 0;
// Importamos la clase Worker de worker_threads
const worker_threads_1 = require("worker_threads");
// Definimos la función Count que realiza el conteo
const Count = (request, // Valor de inicio del conteo
iterations, // Número de iteraciones del conteo
total, // Valor máximo del conteo
callback // Función de callback para manejar los resultados del conteo
) => {
    // Creamos una instancia de Worker y le pasamos el archivo count_worker.js como workerData
    const worker = new worker_threads_1.Worker(__dirname + "/count_worker.js", {
        workerData: {
            iterations,
            total,
            request,
        },
    });
    // Escuchamos el evento "message" para recibir actualizaciones del conteo
    worker.on("message", async (iter) => {
        callback(null, iter);
    });
    // Escuchamos el evento "exit" para manejar la finalización del conteo
    worker.on("exit", async (code) => {
        callback(code === 0 ? null : new Error(), true);
    });
    // Escuchamos el evento "error" para manejar errores en el conteo
    worker.on("error", async (err) => {
        callback(err, true);
    });
};
exports.Count = Count;
