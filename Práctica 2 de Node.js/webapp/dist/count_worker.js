"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
console.log(`Worker thread ${worker_threads_1.workerData.request} started`);
// Itera sobre el número de iteraciones especificadas en workerData.iterations
for (let iter = 0; iter < worker_threads_1.workerData.iterations; iter++) {
    // Itera sobre el número total especificado en workerData.total
    for (let count = 0; count < worker_threads_1.workerData.total; count++) {
        count++;
    }
    // Envía un mensaje al hilo principal indicando el número de iteración actual
    worker_threads_1.parentPort?.postMessage(iter); // se encarga de transferir el valor del argumento desde el subproceso de trabajo al  subproceso principal.
}
console.log(`Worker thread ${worker_threads_1.workerData.request} finished`);
