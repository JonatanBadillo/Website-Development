import { workerData, parentPort } from "worker_threads";
console.log(`Worker thread ${workerData.request} started`);
// Itera sobre el número de iteraciones especificadas en workerData.iterations
for (let iter = 0; iter < workerData.iterations; iter++) {
    // Itera sobre el número total especificado en workerData.total
    for (let count = 0; count < workerData.total; count++) {
        count++;
    }
    // Envía un mensaje al hilo principal indicando el número de iteración actual
    parentPort?.postMessage(iter);
}
console.log(`Worker thread ${workerData.request} finished`);
